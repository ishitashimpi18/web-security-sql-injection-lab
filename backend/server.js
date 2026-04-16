const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = new sqlite3.Database('./ecommerce.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Initialize simple tables for our e-commerce lab
        db.serialize(() => {
            // Vulnerable Users Table
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT
            )`);

            // Products Table
            db.run(`CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                description TEXT,
                price REAL
            )`);
            
            // Insert dummy user if not exists
            const insertUser = db.prepare(`INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`);
            insertUser.run('admin', 'admin123');
            insertUser.run('customer', 'password');
            insertUser.finalize();
        });
    }
});

// Basic health check route
app.get('/', (req, res) => {
    res.json({ message: 'E-commerce API is running' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
