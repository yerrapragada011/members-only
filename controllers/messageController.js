const db = require('../db/queries')

exports.messageList = async (req, res) => {
  const messages = await db.getAllMessages()
  res.render('index', {
    title: 'Members-Only',
    messages: messages,
    user: req.user
  })
}

exports.addNewMessageGet = async (req, res) => {
  res.render('new-message-form', {
    title: 'New Message'
  })
}

exports.addNewMessagePost = async (req, res) => {
  const { title, message } = req.body
  const timestamp = new Date()
  const user_id = req.user.id

  try {
    await db.addMessage(title, timestamp, message, user_id)
    res.redirect('/')
  } catch (err) {
    console.error('Error adding message:', err)
    res.status(500).send('Error adding message')
  }
}

exports.adminMessageDelete = async (req, res) => {
  const isAdmin = req.user.admin
  const messageId = req.params.id

  if (isAdmin) {
    try {
      await db.deleteMessage(messageId)
      res.redirect('/')
    } catch (err) {
      console.error('Error deleting message:', err)
      res.status(500).send('Error deleting message')
    }
  }
}
