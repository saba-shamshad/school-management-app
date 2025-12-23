import mysql from 'mysql2/promise'

// Create a connection pool for better performance
const pool = mysql.createPool({
  host: 'localhost',     
  user: 'root',          
  password: '@Saba786',          
  database: 'school_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Test the connection
async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log('Connected to MySQL database successfully!')
    connection.release()
  } catch (error) {
    console.error('Error connecting to MySQL database:', error)
  }
}

testConnection()

export default pool
