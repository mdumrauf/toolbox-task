const axios = require('axios')
const csv = require('csvtojson')

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

/**
 * Returns the content of a file in the external service.
 */
async function getFileContent (fileName) {
  const { data } = await externalApi.get(`secret/file/${fileName}`)
  return data
}

/**
 * Returns a list of files in the external service.
 */
async function getFilesWithContent () {
  const files = await getFiles()
  const filesWithContent = []

  const csvParserOpts = {
    // Ignore empty attributes.
    ignoreEmpty: true,
    colParser: {
      file: 'omit',
      text: 'string',
      number: 'number',
      hex: 'string'
    },
    checkType: true
  }

  for (const file of files) {
    let csvContent
    try {
      csvContent = await getFileContent(file)
    } catch (error) {
      // API error. Ignore.
      continue
    }

    const content = await csv(csvParserOpts).fromString(csvContent)

    const fullFile = {
      file,
      lines: content
    }
    filesWithContent.push(fullFile)
  }

  return filesWithContent
}

module.exports = {
  getFiles,
  getFilesWithContent
}
