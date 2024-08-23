const express = require('express')
const app = express()
const path = require('node:path')
const passport = require('passport')
const session = require('express-session')
const indexRouter = require('./routes/index')
const PSQLStore = require('connect-pg-simple')(session)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

require('./config/passport')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const sessionStore = new PSQLStore({
  conString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PORT}/${process.env.PGDATABASE}`
})

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)

const port = process.env.PORT || 3000

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})
