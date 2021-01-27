const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const passport = require('passport')

const db = require('../../models')
const Todo = db.Todo
const User = db.User

// login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

// register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'All slot are required!' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: 'Password confirmation are not the same!' })
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ where: { email } }).then(user => {
    if (user) {
      errors.push({ message: 'This email is already been registered!' })

      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})


// logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You successfully logout!')
  res.redirect('/users/login')
})


module.exports = router