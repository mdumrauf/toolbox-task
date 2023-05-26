const express = require('express')
const app = express()

const Controller = require('../controllers/files')

app.get('/list', (req, res, next) => Controller.listFiles(req, res, next))

module.exports = app
