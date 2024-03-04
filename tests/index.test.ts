// index.test.js
import request from 'supertest'
import app from '../src/server'

describe('API Workflow', () => {
  let token: string

  beforeEach(async () => {
    token = await (await request(app).post('/session/morador').send({ username: 'Chapoca', password: '123456' }))
      .body.user.token
  })

  it('should try create user', async () => {
    const data = new FormData()
    data.set('name', 'Vinicius T.')

    const res = await request(app)
      .post('/moradores')
      .set({ authorization: token })
      .send(data)

    expect(res.status).toEqual(200)
  })
})

