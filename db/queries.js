const pool = require('./pool')
const bcrypt = require('bcryptjs')

async function addUser(
  fullname,
  username,
  password,
  membership_status = false,
  isAdmin = false
) {
  await pool.query(
    'INSERT INTO users (fullname, username, password, membership_status, admin) VALUES ($1, $2, $3, $4, $5)',
    [fullname, username, password, membership_status, isAdmin]
  )
}

async function getAllMessages() {
  const { rows } = await pool.query(
    `SELECT messages.id, messages.title, messages.timestamp, messages.message, users.fullname AS author
     FROM messages
     JOIN users ON messages.user_id = users.id`
  )
  return rows
}

async function addMessage(title, timestamp, message, user_id) {
  await pool.query(
    'INSERT INTO messages (title, timestamp, message, user_id) VALUES ($1, $2, $3, $4)',
    [title, timestamp, message, user_id]
  )
}

async function getUserByUsername(username) {
  const result = await pool.query(
    'SELECT id, username, password, membership_status, admin FROM users WHERE username = $1',
    [username]
  )
  return result.rows[0]
}

async function getUserById(id) {
  const result = await pool.query(
    'SELECT id, username, membership_status, admin FROM users WHERE id = $1',
    [id]
  )
  return result.rows[0]
}

async function updateMembership(username) {
  console.log(`Updating membership status for user: ${username}`)
  const result = await pool.query(
    'UPDATE users SET membership_status = true WHERE username = $1',
    [username]
  )
  console.log('Update result:', result.rows[0])
}

module.exports = {
  addUser,
  getAllMessages,
  addMessage,
  getUserByUsername,
  getUserById,
  updateMembership
}
