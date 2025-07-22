const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vikash@1',
  database: 'user_registration',
  port: 3306 // optional, since 3306 is default
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
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

// Endpoint to fetch user by phone
app.get('/user-by-phone/:phone', (req, res) => {
  const { phone } = req.params;
  const sql = 'SELECT * FROM users WHERE phone = ? LIMIT 1';
  db.query(sql, [phone], (err, results) => {
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

app.listen(5000, () => {
  console.log('Server running on port 5000');
}); 