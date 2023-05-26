const express = require('express')
const bodyParser = require('body-parser')

const { FilesRouter, HealthRouter } = require('./routes')

const app = express()

app.use(bodyParser.json())

const router = express.Router()

router.use('/files', FilesRouter)
router.use('/health', HealthRouter)

app.use('/', router)

module.exports = app
