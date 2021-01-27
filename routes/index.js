const express = require('express')
const router = express.Router()
const home = require('./modules/home')    // 從 home.js 引進
const todos = require('./modules/todos')  // 從 todos.js 引進
const users = require('./modules/users')  // 從 users.js 引進
// const auth = require('./modules/auth')

//使用 auth.js 確認是否認證
const { authenticator } = require('../middleware/auth')

// home 根目錄要放在最後面，避免 auth 檢查時不斷重複的重新引導 login page
router.use('/todos', authenticator, todos)
router.use('/users', users)
// router.use('/auth', auth)
router.use('/', authenticator, home)




module.exports = router
