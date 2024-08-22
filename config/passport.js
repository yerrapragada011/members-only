const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../db/queries')
const bcrypt = require('bcryptjs')

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username)
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }

      console.log('Login Password:', password)
      console.log('Stored Hash:', user.password)

      const isMatch = await bcrypt.compare(password, user.password)
      console.log('Password Match:', isMatch)

      if (!isMatch) {
        console.log('Password mismatch')
        return done(null, false, { message: 'Incorrect password.' })
      }

      console.log('Password match')
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id)
    if (!user) {
      return done(new Error('User not found'))
    }
    done(null, user)
  } catch (err) {
    done(err)
  }
})
