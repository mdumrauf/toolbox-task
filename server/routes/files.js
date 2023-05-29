const express = require('express')
const app = express()

const Controller = require('../controllers/files')

app.get('/list', (req, res, next) => Controller.listFiles(req, res, next))
app.get('/data', (req, res, next) => Controller.listFilesWithContent(req, res, next))

module.exports = app
