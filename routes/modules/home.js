const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

//home 路由
router.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

// 因為有 router 所以無須指定 exports 名稱
module.exports = router