require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { webSocket } = require('./src/helpers/websocket')

const handlebars = require('express-handlebars')
const handlebarsHelpers = require('./src/helpers/handlerbars-helpers')
const port = process.env.PORT || 3000
const session = require('express-session')
const { passport } = require('./src/config/passport')
const flash = require('connect-flash')
const { partialsFlash } = require('./src/middlewares/partials-flash')
const { generalErrorHandler } = require('./src/middlewares/error-handler')
const methodOverride = require('method-override')
const path = require('path')
const route = require('./src/routes')

webSocket(server)
app.engine('hbs', handlebars({ extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.set('views', './src/views')

app.use('/src/upload', express.static(path.join(__dirname, '/src/upload')))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true  // 未登入時就先創造個session
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(partialsFlash)

app.use(route)

app.use(generalErrorHandler)

server.listen(port, () => {
  console.info(`app listening on port ${port}`)
})