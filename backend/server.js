const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database'); // Imported from database.js file for Task 2

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic health check route
app.get('/', (req, res) => {
    res.json({ message: 'E-commerce API is running' });
});

// Task 3: Vulnerable Login API
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // VULNERABLE SQL QUERY (Directly concatenating user input)
    // Example Attack Input 
    // Username: ' OR '1'='1
    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    console.log("Executing Vulnerable Query:", sql); // Prints the executed query for demonstration

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Check if any user matched the query
        if (results.length > 0) {
            res.json({ message: 'Login successful!', user: results[0] });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// Task 4: Products API
// Returns list of all products
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
