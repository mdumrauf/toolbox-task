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

  describe('GET /files/data', () => {
    it('lists files with their content as lines', async () => {
      const mockApi = nock('https://echo-serv.tbxnet.com/v1/')
      mockApi.get('/secret/files')
        .reply(200, {
          files: ['file1.csv', 'file2.csv']
        })
      mockApi.get('/secret/file/file1.csv')
        .reply(200,
          'file,text,number,hex\n' +
          'file1.csv,FooBar,6512,c67a22\n' +
          'file1.csv,BazQux,42,a22ffffff'
        )
      mockApi.get('/secret/file/file2.csv')
        .reply(200,
          'file,text,number,hex\n' +
          'file2.csv,Lorem,43,AAdddasdsAAA'
        )

      const { body } = await request(app)
        .get('/files/data')
        .set('Accept', 'application/json')

      expect(body).to.have.lengthOf(2)
      expect(body[0].lines).to.have.lengthOf(2)
      expect(body[1].lines).to.have.lengthOf(1)
    })

    it('lists files with their content as lines ignoring external API errors', async () => {
      const mockApi = nock('https://echo-serv.tbxnet.com/v1/')
      mockApi.get('/secret/files')
        .reply(200, {
          files: ['file1.csv', 'file2.csv']
        })
      // file1.csv will fail.
      mockApi.get('/secret/file/file1.csv').reply(500)
      mockApi.get('/secret/file/file2.csv')
        .reply(200,
          'file,text,number,hex\n' +
          'file2.csv,Lorem,43,AAdddasdsAAA'
        )

      const { body } = await request(app)
        .get('/files/data')
        .set('Accept', 'application/json')

      expect(body).to.have.lengthOf(1)
      expect(body[0].lines).to.have.lengthOf(1)
    })

    it('lists files filtering invalid lines', async () => {
      const mockApi = nock('https://echo-serv.tbxnet.com/v1/')
      mockApi.get('/secret/files')
        .reply(200, {
          files: ['file1.csv', 'file2.csv', 'file3.csv', 'file4.csv']
        })
      mockApi.get('/secret/file/file1.csv')
        .reply(200,
          // Three invalid lines. Two valid lines.
          'file,text,number,hex\n' +
          'file1.csv,\n' +
          'file1.csv,,,,,\n' +
          'file1.csv,FooBar,c67a22\n' +
          'file1.csv,FooBar,99,c67a22\n' +
          'file1.csv,BazQux,42,a22ffffff'
        )
      mockApi.get('/secret/file/file2.csv')
        .reply(200,
          // One valid line.
          'file,text,number,hex\n' +
          'file2.csv,Lorem,43,AAdddasdsAAA'
        )
      mockApi.get('/secret/file/file3.csv')
        .reply(200,
          // No lines. Should parse as an empty file.
          'file,text,number,hex\n'
        )
      mockApi.get('/secret/file/file4.csv')
        .reply(200,
          // Invalid line. Should parse as an empty file.
          'file,text,number,hex\n' +
          'file2.csv,,FFFF,98,'
        )

      const { body } = await request(app)
        .get('/files/data')
        .set('Accept', 'application/json')

      expect(body).to.have.lengthOf(4)
      expect(body[0].lines).to.have.lengthOf(2)
      expect(body[1].lines).to.have.lengthOf(1)
      expect(body[2].lines).to.have.lengthOf(0)
      expect(body[3].lines).to.have.lengthOf(0)
    })

    it('fails when external API call is not authorized', (done) => {
      nock('https://echo-serv.tbxnet.com/v1/')
        .get('/secret/files')
        .reply(401)

      request(app)
        .get('/files/data')
        .set('Accept', 'application/json')
        .expect(500, done)
    })
  })
})
