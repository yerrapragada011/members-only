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

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' })
      }

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
