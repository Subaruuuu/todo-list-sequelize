const express = require('express')
const app = express()
const PORT = 3000

const exphbs = require('express-handlebars')
// const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const routes = require('./routes/index')

const session = require('express-session')
const usePassport = require('./config/passport')
const passport = require('passport')
const flash = require('connect-flash')


app.use(session({
  secret: 'sequelizeSecret',
  resave: false,
  saveUninitialized: true
}))


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use(flash())

app.use((req, res, next) => {
  // console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error')

  next()
})

app.use(routes)

//監聽
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})