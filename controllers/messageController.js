const db = require('../db/queries')

exports.messageList = async (req, res) => {
  const messages = await db.getAllMessages()
  res.render('index', {
    title: 'Members-Only',
    messages: messages
  })
}
