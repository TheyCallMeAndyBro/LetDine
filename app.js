const express = require('express')

const handlebars = require('express-handlebars')

const app = express()
const port = process.env.PORT || 3000
const route = require('./src/routes')
app.engine('hbs', handlebars({ extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './src/views')

app.use(route)

app.listen(port, () => {
  console.info(`app listening on port ${port}`)
})