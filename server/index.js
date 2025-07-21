const express = require("express");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL database!");
});

app.use(cors());
app.use(bodyParser.json());

// List all users
app.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).send("DB Error");
    res.send(results);
  });
});

// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    const {
      fullName, email, phone, gender, dob, address,
      password, latitude, longitude
    } = req.body;

    const password_hash = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users 
      (full_name, email, phone, gender, dob, address, password_hash, latitude, longitude)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(sql, [
      fullName, email, phone, gender, dob, address,
      password_hash, latitude, longitude
    ], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Database error');
      }
      res.send('Registration successful');
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Endpoint to fetch user by phone
app.get('/user-by-phone/:phone', (req, res) => {
  const { phone } = req.params;
  const sql = 'SELECT * FROM users WHERE phone = ? LIMIT 1';
  connection.query(sql, [phone], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    if (results.length === 0) return res.status(404).send('User not found');
    // Don't send password hash!
    const { password_hash, ...userData } = results[0];
    res.json(userData);
  });
});

app.listen(process.env.PORT || 10000, () => {
  console.log("🚀 Server running on port", process.env.PORT || 10000);
}); 