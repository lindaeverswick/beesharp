const request = require('supertest')
const app = require('../server/server')
describe('Post Endpoints', () => {
  
  it('should create a new post', async (done) => {
    const res = await request(app)
      .post('/api/instruments/new')
      .send({
        "category": "keyboards - stands",
        "make": "Yamaha",
        "model": "Henry Black",
        "color": "Black",
        "details": null,
        "lastcheckout": "",
        "ischeckedout": false,
        "needsrepair": false
      })
      .end(done)
    app.close()
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('payload')
  })
})
