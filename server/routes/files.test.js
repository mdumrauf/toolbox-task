const expect = require('chai').expect
const nock = require('nock')
const request = require('supertest')

const app = require('../server')

describe('Files', () => {
  describe('GET /files/list', () => {
    it('lists files exactly as external API does', async () => {
      nock('https://echo-serv.tbxnet.com/v1/')
        .get('/secret/files')
        .reply(200, {
          files: ['file1.csv', 'file2.csv', 'file42.csv']
        })

      const { body } = await request(app)
        .get('/files/list')
        .set('Accept', 'application/json')

      expect(body).to.have.property('files').with.lengthOf(3)
    })

    it('fails when external API call is not authorized', (done) => {
      nock('https://echo-serv.tbxnet.com/v1/')
        .get('/secret/files')
        .reply(401)

      request(app)
        .get('/files/list')
        .set('Accept', 'application/json')
        .expect(500, done)
    })
  })
})
