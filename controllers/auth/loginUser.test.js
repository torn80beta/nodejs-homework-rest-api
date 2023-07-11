const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const { DB_HOST } = process.env;
mongoose.set('strictQuery', true);

describe('loginUser', function () {
  let server;
  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST)
      .then(() => {
        server = app.listen(3000);
      })
      .catch(error => {
        console.log(error.message);
        process.exit(1);
      });
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_HOST).then(() => {
      server.close();
    });
  });

  test('status 200 on user login', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'kyle.reese@mail.com',
        password: 'qwerty123',
      })
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });
});
