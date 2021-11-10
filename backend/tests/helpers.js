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
  const res = await api.post('/users/login').send(body);

  return res.body.token;
}

async function getToken3() {
  const body = {
    name: 'Manu',
    lastName: 'Torres Torres',
    email: 'testEmail5@gmail.com',
    password: 'manuTorres1',
    bio: 'Empezando los tests con jest.',
    city: 'Barcelona',
    birthDate: '1996-07-14',
  };
  const resReg = await api.post('/users').send(body);
  const resVal = await api.get(
    `/users/validate/${resReg.body.registrationCode}`
  );

  const res = await api
    .post('/users/login')
    .send({ email: body.email, password: body.password });

  return { id: res.body.idUser, token: res.body.token };
}

async function createProperty(
  flat,
  province = 'Barcelona',
  city = 'Montornes del valles'
) {
  const token = await getToken();
  // Creación propiedad user1
  const bodyProp = {
    city: city,
    province: province,
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
    description: 'Piso en' + city + flat,
    price: '650',
    state: 'reservado',
  };
  const resProp = await api
    .post('/properties')
    .set({ authorization: token })
    .send(bodyProp);
  return resProp.body.property;
}

module.exports = { getToken, getToken2, createProperty, getToken3 };
