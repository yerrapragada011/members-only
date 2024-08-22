const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController')

router.get('/', messageController.messageList)

router.get('/register', messageController.addNewUserGet)

router.post('/register', messageController.addNewUserPost)

router.get('/login', messageController.loginUserGet)

router.post('/login', messageController.loginUserPost)

router.get('/membership', messageController.clubMembershipGet)

router.post('/membership', messageController.clubMembershipPost)

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

router.get('/logout', messageController.logoutUserGet)

module.exports = router
