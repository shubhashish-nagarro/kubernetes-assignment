const express = require('express');
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express();
const port = process.env.PORT || 3000;

// API Endpoint to fetch data
app.get('/', (req, res) => {
  res.status(200).send(`Application Running successfully`);
});

// API Endpoint to fetch data
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email FROM users;');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error",
    });
  }
});

// Liveness probe endpoint (Self-healing)
app.get('/health-check', (req, res) => {
  res.status(200).json({
    status: "Okay",
    timestamp: new Date()
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
