require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// MySQL connection setup
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Improved Registration Route
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    // Check if email already exists
    db.query('SELECT email FROM player WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database query error' });
        }
        if (results.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        // Proceed to insert new user
        db.query('INSERT INTO player SET ?', { email, password: hashedPassword }, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error registering new player' });
            } else {
                return res.status(201).json({ message: 'Player registered' });
            }
        });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM player WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, results[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password is incorrect' });
        }
        const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.status(200).json({ token });
    });
});

// Test JSON response route
app.get('/test-json', (req, res) => {
    res.json({ message: 'This is a JSON response' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
