const supertest = require('supertest');
const { app, server } = require('../app');
const api = supertest(app);

async function getToken() {
  const body = {
    email: 'testEmail@gmail.com',
    password: 'manuTorres1',
  };
  const res = await api.post('/users/login').send(body);
  return res.body.token;
}

module.exports = { getToken };
