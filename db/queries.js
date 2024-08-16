const pool = require('./pool')
const bcrypt = require('bcryptjs')

async function addUser(fullname, username, password, membership_status) {
  const hashedPassword = await bcrypt.hash(password, 10)

  await pool.query(
    'INSERT INTO users (fullname, username, password, membership_status) VALUES ($1, $2, $3, $4)',
    [fullname, username, hashedPassword, membership_status]
  )
}

async function getAllMessages() {
  const { rows } = await pool.query('SELECT * FROM messages')
  return rows
}

async function addMessage(title, timestamp, message) {
  await pool.query(
    'INSERT INTO messages (title, timestamp, message) VALUES ($1, $2, $3)',
    [title, timestamp, message]
  )
}

async function getUserByUsername(username) {
  const result = await pool.query(
    'SELECT id, username, password, membership_status FROM users WHERE username = $1',
    [username]
  )
  return result.rows[0]
}

async function getUserById(id) {
  const result = await pool.query(
    'SELECT id, username, membership_status FROM users WHERE id = $1',
    [id]
  )
  return result.rows[0]
}

module.exports = {
  addUser,
  getAllMessages,
  addMessage,
  getUserByUsername,
  getUserById
}
