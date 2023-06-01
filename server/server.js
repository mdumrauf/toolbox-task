const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { FilesRouter, HealthRouter } = require('./routes')

const app = express()

const corsOptions = {
  origin: ['http://localhost:3000', 'https://toolbox-task.vercel.app'],
  optionsSuccessStatus: 200
}

app.use(bodyParser.json())
app.use(cors(corsOptions))

const router = express.Router()

router.use('/files', FilesRouter)
router.use('/health', HealthRouter)

app.use('/', router)

module.exports = app
