const db = require('../db/queries')
const bcrypt = require('bcryptjs')
const passport = require('passport')

exports.messageList = async (req, res) => {
  const messages = await db.getAllMessages()
  res.render('index', {
    title: 'Members-Only',
    messages: messages,
    user: req.user
  })
}

exports.addNewUserGet = async (req, res) => {
  res.render('signup-form', {
    title: 'Sign-up Form'
  })
}

exports.addNewUserPost = async (req, res, next) => {
  const { fullname, username, password, admin } = req.body
  const membership_status = false

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err)
    }
    try {
      await db.addUser(
        fullname,
        username,
        hashedPassword,
        membership_status,
        admin
      )
      res.redirect('/')
    } catch (err) {
      return next(err)
    }
  })
}

exports.loginUserGet = async (req, res) => {
  res.render('login-form', {
    title: 'Login Form'
  })
}

exports.loginUserPost = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.redirect('/login-failure')
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }
      res.render('login-success', {
        title: 'Login Successful',
        username: user.username,
        message: 'You have successfully logged in'
      })
    })
  })(req, res, next)
}

exports.logoutUserGet = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
}

exports.clubMembershipGet = async (req, res) => {
  res.render('membership-sign-up', {
    title: 'Club Membership Sign Up'
  })
}

exports.clubMembershipPost = async (req, res) => {
  const { passcode } = req.body
  const username = req.user.username
  const correctPasscode = 'agasthya'

  if (passcode === correctPasscode) {
    await db.updateMembership(username)
    res.redirect('/membership-success')
  } else {
    res.render('/membership-failure')
  }
}
