const FilesService = require('../services/files')

/**
 * Returns the list of files.
 *
 * @param {Request} _req
 * @param {Response} res
 */
async function listFiles (_req, res) {
  const list = await FilesService.getFiles()
  res.json({ files: list })
}

module.exports = {
  listFiles
}
