const pool = require('./pool')

async function addUser(fullname, username, password, membership_status) {
  await pool.query(
    'INSERT INTO users (fullname, username, password, membership status) VALUES ($1, $2, $3, $4)',
    [fullname, username, password, membership_status]
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

module.exports = {
  addUser,
  getAllMessages,
  addMessage
}
