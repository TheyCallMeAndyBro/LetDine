require('dotenv').config()
const express = require('express')

const handlebars = require('express-handlebars')

const app = express()
const port = process.env.PORT || 3000
const session = require('express-session')
const passport = require('./src/config/passport')
const flash = require('connect-flash')
const { partialsFlash } = require('./src/middlewares/partials-flash')
const { generalErrorHandler } = require('./src/middlewares/error-handler')

const route = require('./src/routes')
app.engine('hbs', handlebars({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './src/views')

app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false  // 需要登入時後才會創建session
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(partialsFlash)

app.use(route)

app.use(generalErrorHandler)

app.listen(port, () => {
  console.info(`app listening on port ${port}`)
})