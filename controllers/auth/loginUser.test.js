const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const { DB_HOST } = process.env;
mongoose.set('strictQuery', true);

describe('loginUser', function () {
  let server;
  beforeAll(() => {
    mongoose
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

  test('Status 200 on user login', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'kyle.reese@mail.com',
        password: 'qwerty123',
      })
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });

  test('The presence of a token in the response', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'kyle.reese@mail.com',
        password: 'qwerty123',
      })
      .set('Accept', 'application/json');
    const { token } = response._body;
    // console.log(token);
    expect(typeof token).toBe('string');
  });

  test('Response has User object with "email" and "subscription" properties which are strings', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'kyle.reese@mail.com',
        password: 'qwerty123',
      })
      .set('Accept', 'application/json');
    const { user } = response._body;
    expect(typeof user).toBe('object');
    expect(typeof user.email).toBe('string');
    expect(typeof user.subscription).toBe('string');
  });
});
