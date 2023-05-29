const FilesService = require('../services/files')

/**
 * Returns the list of files as a string array.
 *
 * @param {Request} _req
 * @param {Response} res
 */
async function listFiles (_req, res) {
  let list
  try {
    list = await FilesService.getFiles()
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' }).end()
    return
  }
  res.json({ files: list })
}

/**
 * Returns the list of files with their content.
 *
 * @param {Request} _req
 * @param {Response} res
 */
async function listFilesWithContent (_req, res) {
  let list
  try {
    list = await FilesService.getFilesWithContent()
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' }).end()
    return
  }
  res.json(list)
}

module.exports = {
  listFiles,
  listFilesWithContent
}
