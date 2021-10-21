const supertest = require('supertest');
const getDB = require('../config/getDB');
const { app, server } = require('../app');
const api = supertest(app);
let connection;

beforeAll(async () => {
  connection = await getDB();
});

// test('Subir un alquiler a la base de datos.', async () => {
// await api
//     .post('/properties')
//     .expect(200)
//     .expect('Content-Type', /application\/json/);
// });

test('Obtener alquileres.', async () => {
  const response = await api.get('/properties');
  expect(response.body).toHaveLength(2);
  await api
    .get('/properties')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

afterAll(async () => {
  try {
    server.close();
    await connection.release();
  } catch (error) {
    console.log(error);
  }
});
