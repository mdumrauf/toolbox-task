const axios = require('axios')

const API_URL = 'https://echo-serv.tbxnet.com/v1/'

const externalApi = axios.create({
  baseURL: API_URL,
  timeout: 30 * 1000,
  headers: { Authorization: `Bearer ${process.env.SERVICE_AUTH_TOKEN}` }
})

/**
 * Returns a list of files in the external service.
 */
async function getFiles () {
  const response = await externalApi.get('secret/files')

  const {
    data: { files }
  } = response
  return files
}

module.exports = {
  getFiles
}
