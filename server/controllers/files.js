const FilesService = require('../services/files')

/**
 * Returns the list of files.
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

module.exports = {
  listFiles
}
