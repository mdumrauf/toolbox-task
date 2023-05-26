/**
 * Returns the service health. Always OK for now.
 *
 * @param {Request} _req
 * @param {Response} res
 */
async function getHealth (_req, res) {
  res.json({ status: 'OK' })
}

module.exports = {
  getHealth
}
