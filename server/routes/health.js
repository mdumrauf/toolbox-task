const express = require('express')
const app = express()

const Controller = require('../controllers/health')

app.get('/', (req, res, next) => Controller.getHealth(req, res, next))

module.exports = app
