-- Create the database
CREATE DATABASE IF NOT EXISTS school_management;

-- Use the database
USE school_management;

-- Create the schools table
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact BIGINT NOT NULL,
    image TEXT NOT NULL,
    email_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Insert some sample data for testing
-- INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES 
-- ('Sample School', '123 Main Street', 'New York', 'NY', 1234567890, '/schoolImages/sample.jpg', 'info@sampleschool.com');

-- Verify table creation
DESCRIBE schools;

-- Show all tables
SHOW TABLES;