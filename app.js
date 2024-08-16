const express = require('express')
const app = express()
const path = require('node:path')
const indexRouter = require('./routes/index')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', indexRouter)

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
