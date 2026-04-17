const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // update with your MySQL username
    password: 'root', // update with your MySQL password
    database: 'ecommerce_lab' // update with your database name if different
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database.');

    // Initialize tables
    const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user'
    )`;
    
    db.query(createUsersTable, (err, result) => {
        if (err) console.error('Error creating users table:', err);
    });

    const createProductsTable = `CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL
    )`;

    db.query(createProductsTable, (err, result) => {
        if (err) console.error('Error creating products table:', err);
    });
});

module.exports = db;
