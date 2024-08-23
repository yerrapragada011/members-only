const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController')
const userController = require('../controllers/userController')

router.get('/', messageController.messageList)

router.get('/newMessage', messageController.addNewMessageGet)

router.post('/newMessage', messageController.addNewMessagePost)

router.post('/deleteMessage/:id', messageController.adminMessageDelete)

router.get('/register', userController.addNewUserGet)

router.post('/register', userController.addNewUserPost)

router.get('/login', userController.loginUserGet)

router.post('/login', userController.loginUserPost)

router.get('/membership', userController.clubMembershipGet)

router.post('/membership', userController.clubMembershipPost)

router.get('/membership-failure', (req, res) => {
  res.render('membership-failure', { title: 'Incorrect Passcode' })
})

router.get('/membership-success', (req, res) => {
  res.render('membership-success', { title: 'Membership Success' })
})

router.get('/login-failure', (req, res) => {
  res.render('login-failure', { title: 'Login Failure' })
})

router.get('/login-success', (req, res) => {
  res.render('login-success', { title: 'Login Success' })
})

router.get('/logout', userController.logoutUserGet)

module.exports = router
