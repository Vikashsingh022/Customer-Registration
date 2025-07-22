require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set up MySQL connection using .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306, // default port for MySQL
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
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

    db.query(sql, [
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

// Get user by phone number
app.get('/user-by-phone/:phone', (req, res) => {
  const { phone } = req.params;
  const sql = 'SELECT * FROM users WHERE phone = ? LIMIT 1';

  db.query(sql, [phone], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    if (results.length === 0) return res.status(404).send('User not found');

    const { password_hash, ...userData } = results[0]; // exclude password
    res.json(userData);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
