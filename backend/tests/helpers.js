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

async function getToken2() {
  const body = {
    email: 'testEmail4@gmail.com',
    password: 'manuTorres1',
  };
  const resLog3 = await api.post('/users/login').send(body);

  const res = await api.post('/users/login').send(body);

  return res.body.token;
}

async function createProperty(flat) {
  const token = await getToken();
  // Creación propiedad user1
  const bodyProp = {
    city: 'Montornes del valles',
    province: 'Barcelona',
    address: 'carrer del riu mogent',
    zipCode: '08170',
    number: '9',
    type: 'piso',
    stair: '1',
    flat: flat,
    gate: '2',
    mts: '80',
    rooms: '3',
    garage: '0',
    terrace: '0',
    toilets: '1',
    energyCertificate: '0',
    //availabilityDate:2021-10-20
    price: '650',
    state: 'reservado',
  };
  const resProp = await api
    .post('/properties')
    .set({ authorization: token })
    .send(bodyProp);

  return resProp.body.property;
}

module.exports = { getToken, getToken2, createProperty };
