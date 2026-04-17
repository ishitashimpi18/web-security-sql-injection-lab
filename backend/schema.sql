-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS ecommerce_lab;
USE ecommerce_lab;

-- Drop tables if they exist to start fresh (useful for resetting the lab)
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;

-- Create Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);

-- Create Products Table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

-- Insert Dummy Users
-- In a real scenario passwords would be hashed. We're keeping them in plain text or simple hashes for the lab environment.
INSERT INTO users (username, password, role) VALUES 
('admin', 'admin123', 'admin'),
('alice', 'alice_pass', 'user'),
('bob', 'bob_pass', 'user');

-- Insert Dummy Products
INSERT INTO products (name, description, price) VALUES 
('Laptop', 'High-performance laptop for gaming and work.', 999.99),
('Smartphone', 'Latest model smartphone with a great camera.', 699.50),
('Headphones', 'Noise-cancelling over-ear headphones.', 199.00),
('Keyboard', 'Mechanical keyboard with RGB lighting.', 89.99);
