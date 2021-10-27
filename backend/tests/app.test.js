const supertest = require('supertest');
// const getDB = require('../config/getDB');
const { main } = require('../config/initDB');
const { app, server } = require('../app');
const api = supertest(app);
const { getToken } = require('./helpers');

// let connection;

beforeAll(async () => {
  // connection = await getDB();
  await main();
});

// testEmail@gmail.com ---- correo validado ---- USUARIO 13
// testEmail1@gmail.com ---- correo no validado ---- USUARIO 12

// Users
describe('User POST Endpoints', () => {
  test('Registro un usuario.', async () => {
    const body = {
      name: 'Manu',
      lastName: 'Torres Torres',
      email: 'testEmail1@gmail.com',
      password: 'manuTorres1',
      bio: 'Empezando los tests con jest.',
      city: 'Barcelona',
      birthDate: '1996-07-14',
    };
    const res = await api.post('/users').send(body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe(
      'Usuario registrado, comprueba tu email para activarlo'
    );
  });

  test('Registro un usuario sin email.', async () => {
    const body = {
      name: 'Manu',
      lastName: 'Torres Torres',
      email: '',
      password: 'manuTorres1',
      bio: 'Empezando los tests con jest.',
      city: 'Barcelona',
      birthDate: '1996-07-14',
    };
    const res = await api.post('/users').send(body);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Se requiere un email');
  });

  test('Registro un usuario sin contraseña.', async () => {
    const body = {
      name: 'Manu',
      lastName: 'Torres Torres',
      email: 'manutorres96@gmail.com',
      password: '',
      bio: 'Empezando los tests con jest.',
      city: 'Barcelona',
      birthDate: '1996-07-14',
    };
    const res = await api.post('/users').send(body);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Se requiere una contraseña');
  });

  test('Registro un usuario con un correo existente.', async () => {
    const body = {
      name: 'Manu',
      lastName: 'Torres Torres',
      email: 'testEmail1@gmail.com',
      password: 'manuTorres1',
      bio: 'Empezando los tests con jest.',
      city: 'Barcelona',
      birthDate: '1996-07-14',
    };
    const res = await api.post('/users').send(body);
    expect(res.statusCode).toEqual(409);
    expect(res.body.message).toBe(
      'Ya existe un usuario registrado con ese email'
    );
  });

  test('Registro un usuario sin nombre.', async () => {
    const body = {
      name: '',
      lastName: 'Torres Torres',
      email: 'manutorres96@gmail.com',
      password: 'manuTorres1',
      bio: 'Empezando los tests con jest.',
      city: 'Barcelona',
      birthDate: '1996-07-14',
    };
    const res = await api.post('/users').send(body);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Se requiere un nombre para el usuario');
  });

  test('Registro un usuario sin algun campo obligatorio.', async () => {
    const body = {
      name: 'Manu',
      lastName: 'Torres Torres',
      email: 'manutorres96@gmail.com',
      password: 'manuTorres1',
      bio: 'Empezando los tests con jest.',
      city: '',
      birthDate: '1996-07-14',
    };
    const res = await api.post('/users').send(body);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Debes escribir una ciudad.');
  });

  test('Registro un usuario sin datos.', async () => {
    const body = {};
    const res = await api.post('/users').send(body);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Se requiere un email');
  });

  test('Registro un usuario y se valida.', async () => {
    const body = {
      name: 'Manu',
      lastName: 'Torres Torres',
      email: 'testEmail@gmail.com',
      password: 'manuTorres1',
      bio: 'Empezando los tests con jest.',
      city: 'Barcelona',
      birthDate: '1996-07-14',
    };
    const res = await api.post('/users').send(body);
    const resVal = await api.get(
      `/users/validate/${res.body.registrationCode}`
    );
    expect(resVal.statusCode).toEqual(200);
    expect(resVal.body.message).toBe('Verificación completada');
  });

  test('Login de un usuario.', async () => {
    const body = {
      email: 'testEmail@gmail.com',
      password: 'manuTorres1',
    };
    const res = await api.post('/users/login').send(body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe(
      'Sesión iniciada con éxito, se te redirigirá a la pantalla principal.'
    );
  });

  test('Login de un usuario sin validar.', async () => {
    const body = {
      email: 'testEmail1@gmail.com',
      password: 'manuTorres1',
    };
    const res = await api.post('/users/login').send(body);
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('Usuario pendiente de validar');
  });

  test('Login de un usuario sin algun campo obligatorio.', async () => {
    const body = {
      email: 'testEmail@gmail.com',
      password: '',
    };
    const res = await api.post('/users/login').send(body);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Faltan campos');
  });

  test('Contactar a un usuario.', async () => {
    const token = await getToken();

    const body = {
      email: 'testEmail@gmail.com',
      name: 'Manu',
      lastName: 'Torres',
      comentarios:
        'Hola, veo que vives por A Coruña, te interesaría ver un piso de estas propiedades: etc etc etc',
    };

    const resContact = await api
      .post(`/users/12/contact`)
      .set({ Authorization: token })
      .send(body);
    expect(resContact.statusCode).toEqual(200);
    expect(resContact.body.message).toBe(
      'Correo electrónico enviado con éxito.'
    );
  });

  test('Contactar a un usuario con el mismo id del que solicita.', async () => {
    const token = await getToken();
    const body = {
      email: 'testEmail@gmail.com',
      name: 'Manu',
      lastName: 'Torres',
      comentarios:
        'Hola, veo que vives por A Coruña, te interesaría ver un piso de estas propiedades: etc etc etc',
    };
    const resContact = await api
      .post(`/users/13/contact`)
      .set({ Authorization: token })
      .send(body);
    expect(resContact.statusCode).toEqual(403);
    expect(resContact.body.message).toBe('No puedes contactar contigo mismo.');
  });

  test('Contactar a un usuario sin algun campo obligatorio.', async () => {
    const token = await getToken();

    const body = {
      email: '',
      name: 'Manu',
      lastName: 'Torres',
      comentarios:
        'Hola, veo que vives por A Coruña, te interesaría ver un piso de estas propiedades: etc etc etc',
    };

    const resContact = await api
      .post(`/users/12/contact`)
      .set({ Authorization: token })
      .send(body);
    expect(resContact.statusCode).toEqual(400);
    expect(resContact.body.message).toBe('Faltan campos obligatorios.');
  });

  // FALTA EL DE VOTAR
});

describe('User GET endpoints', () => {
  test('Obtener una lista de usuarios.', async () => {
    const token = await getToken();
    const resList = await api.get('/users').set({ Authorization: token });
    expect(resList.statusCode).toEqual(200);
    expect(resList.body).toHaveProperty('users');
    expect(resList.body.users).toHaveLength(13);
  });

  test('Obtener una lista de usuarios sin autorización.', async () => {
    const resList = await api.get('/users').set({ Authorization: '' });
    expect(resList.statusCode).toEqual(401);
    expect(resList.body.message).toBe('Falta la cabecera de autorización');
  });

  test('Obtener un usuario en concreto.', async () => {
    const token = await getToken();

    const resGetUser = await api.get('/users/3').set({ Authorization: token });
    expect(resGetUser.statusCode).toEqual(200);
    expect(resGetUser.body).toHaveProperty('userInfo');
    expect(resGetUser.body.userInfo).toHaveProperty('idUser');
    expect(resGetUser.body.userInfo.idUser).toBe(3);
  });

  test('Obtener un usuario inexistente.', async () => {
    const token = await getToken();

    const resGetUser = await api.get('/users/14').set({ Authorization: token });
    expect(resGetUser.statusCode).toEqual(404);
    expect(resGetUser.body.message).toBe('El usuario no existe');
  });

  test('Obtener un usuario sin autorización.', async () => {
    const resList = await api.get('/users/3').set({ Authorization: '' });
    expect(resList.statusCode).toEqual(401);
    expect(resList.body.message).toBe('Falta la cabecera de autorización');
  });

  test('Obtener un usuario en concreto, el mismo que el token.', async () => {
    const token = await getToken();
    const resGetUser = await api.get('/users/13').set({ Authorization: token });
    expect(resGetUser.statusCode).toEqual(200);
    expect(resGetUser.body).toHaveProperty('userInfo');
    expect(resGetUser.body.userInfo).toHaveProperty('idUser');
    expect(resGetUser.body.userInfo.idUser).toBe(13);
    expect(resGetUser.body.userInfo).toHaveProperty('email');
  });

  // LIST BOOKINGS

  test('Listar valoraciones de un usuario.', async () => {
    const token = await getToken();
    const resListVotes = await api
      .get('/users/3/votes')
      .set({ Authorization: token });
    expect(resListVotes.statusCode).toEqual(200);
    expect(resListVotes.body).toHaveProperty('Valoraciones');
  });

  test('Listar valoraciones de un usuario sin autorización.', async () => {
    const body = {
      email: 'testEmail@gmail.com',
      password: 'manuTorres1',
    };
    const res = await api.post('/users/login').send(body);

    const resListVotes = await api
      .get('/users/3/votes')
      .set({ Authorization: '' });
    expect(resListVotes.statusCode).toEqual(401);
    expect(resListVotes.body.message).toBe('Falta la cabecera de autorización');
  });
});

describe('User PUT Endpoints', () => {
  test('Reset contraseña usuario.', async () => {
    const body = {
      email: 'testEmail@gmail.com',
    };
    const res = await api.put('/users/password/recover').send(body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('info');
    expect(res.body.info.recoverCode).toHaveLength(40);
  });

  test('Reset contraseña usuario con email erróneo.', async () => {
    const body = {
      email: 'testEmail@gmail.co',
    };
    const res = await api.put('/users/password/recover').send(body);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe(
      'No existe ningún usuario con ese email, por favor, comprueba que el email sea correcto.'
    );
  });

  test('Reset contraseña usuario con email vacío.', async () => {
    const body = {
      email: '',
    };
    const res = await api.put('/users/password/recover').send(body);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Escribe un correo electrónico válido.');
  });

  test('Reset contraseña usuario y cambio contraseña.', async () => {
    const body = {
      email: 'testEmail@gmail.com',
    };
    const res = await api.put('/users/password/recover').send(body);

    const resPassChange = await api
      .put(
        `/users/password/recover/${res.body.info.idUser}/${res.body.info.recoverCode}`
      )
      .send({ password: 'manuTorres1' });

    expect(resPassChange.statusCode).toEqual(200);
    expect(resPassChange.body.message).toBe('Contraseña cambiada con éxito.');
  });

  test('Reset contraseña usuario y cambio contraseña con código de recuperación erróneo.', async () => {
    const body = {
      email: 'testEmail@gmail.com',
    };
    const res = await api.put('/users/password/recover').send(body);

    const resPassChange = await api
      .put(`/users/password/recover/${res.body.info.idUser}/1234`)
      .send({ password: 'manuTorres1' });

    expect(resPassChange.statusCode).toEqual(404);
    expect(resPassChange.body.message).toBe('El enlace no existe.');
  });

  test('Cambio de contraseña de usuario y se valida.', async () => {
    const token = await getToken();
    const passBody = {
      oldPass: 'manuTorres1',
      newPass: 'manuTorres1',
    };
    const res = await api
      .put(`/users/13/password`)
      .set({ authorization: token })
      .send(passBody);

    const resVal = await api.get(`/users/validate/${res.body.regCode}`);
    expect(resVal.statusCode).toEqual(200);
    expect(resVal.body.message).toBe('Verificación completada');
  });

  test('Cambio de contraseña de usuario sin autorización.', async () => {
    const passBody = {
      oldPass: 'manuTorres1',
      newPass: 'manuTorres2',
    };
    const res = await api
      .put(`/users/13/password`)
      .set({ authorization: '' })
      .send(passBody);
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('Falta la cabecera de autorización');
  });

  test('Cambio de contraseña de usuario sin uno de los campos obligatorios.', async () => {
    const token = await getToken();
    const passBody = {
      oldPass: 'manuTorres1',
      newPass: '',
    };
    const res = await api
      .put(`/users/13/password`)
      .set({ authorization: token })
      .send(passBody);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Se requiere una contraseña');
  });

  test('Cambio de contraseña de usuario con la contraseña antigua errónea.', async () => {
    const token = await getToken();
    const passBody = {
      oldPass: 'manuTorres',
      newPass: 'manuTorres2',
    };
    const res = await api
      .put(`/users/13/password`)
      .set({ authorization: token })
      .send(passBody);
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('Contraseña incorrecta.');
  });

  test('...', async () => {});
});

describe('User DELETE Endpoints', () => {
  test('Borrar usuario.', async () => {
    // Crear usuario y validar
    const body = {
      name: 'Manu',
      lastName: 'Torres Torres',
      email: 'testEmail2@gmail.com',
      password: 'manuTorres1',
      bio: 'Empezando los tests con jest.',
      city: 'Barcelona',
      birthDate: '1996-07-14',
    };
    const resReg = await api.post('/users').send(body);
    const resVal = await api.get(
      `/users/validate/${resReg.body.registrationCode}`
    );
    // Loguear usuario
    const res = await api
      .post('/users/login')
      .send({ email: body.email, password: body.password });
    const token = res.body.token;

    //Borrar usuario
    const resDel = await api.delete('/users/14').set({ authorization: token });

    expect(resDel.statusCode).toEqual(200);
    expect(resDel.body.message).toBe('Usuario eliminado');
  });

  test('Borrar usuario con id diferente.', async () => {
    // Crear usuario y validar
    const body = {
      name: 'Manu',
      lastName: 'Torres Torres',
      email: 'testEmail4@gmail.com',
      password: 'manuTorres1',
      bio: 'Empezando los tests con jest.',
      city: 'Barcelona',
      birthDate: '1996-07-14',
    };
    const resReg = await api.post('/users').send(body);
    const resVal = await api.get(
      `/users/validate/${resReg.body.registrationCode}`
    );
    // Loguear usuario
    const token = await getToken();

    //Borrar usuario
    const resDel = await api.delete('/users/15').set({ authorization: token });

    expect(resDel.statusCode).toEqual(403);
    expect(resDel.body.message).toBe('No tienes permisos');
  });
});
// test('Subir un alquiler a la base de datos sin autorización.', async () => {
//   await api
//     .post('/properties')
//     .expect(401)
//     .expect('Content-Type', /application\/json/);
// });

// test('Obtener alquileres.', async () => {
//   await api
//     .get('/properties')
//     .expect(200)
//     .expect('Content-Type', /application\/json/);
// });

afterAll(async () => {
  try {
    server.close();
  } catch (error) {
    console.log(error);
  }
});
