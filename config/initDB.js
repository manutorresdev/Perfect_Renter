const getDB = require('./getDB');
const faker = require('faker/locale/es');
const { format } = require('date-fns');
const mail = require('@sendgrid/mail');
/**
 * @module Database
 */
/**
 * Creación base de datos
 * @name InitDataBase
 * @returns {Promise} Crea la base de datos con los datos proporcionados por la dependencia Faker.
 */
async function main() {
  let connection;

  try {
    connection = await getDB();
    //Eliminación de tablas existentes
    await connection.query('DROP TABLE IF EXISTS photos');
    await connection.query('DROP TABLE IF EXISTS votes');
    await connection.query('DROP TABLE IF EXISTS bookings');
    await connection.query('DROP TABLE IF EXISTS properties');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Tablas Eliminadas');

    /* Crearemos las tablas necesarias */

    /* Creamos la tabla users */
    await connection.query(`
        CREATE TABLE users (
            idUser INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100),
            lastName VARCHAR(100),
            tel VARCHAR(20),
            birthDate DATE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(512) NOT NULL,
            avatar VARCHAR(50),
            bio TEXT,
            city VARCHAR(50) NOT NULL,
            renterActive BOOLEAN DEFAULT false,
            deleted BOOLEAN DEFAULT false,
            role ENUM("admin", "renter", "tenant") DEFAULT "tenant" NOT NULL,
            registrationCode VARCHAR(100),
            recoverCode VARCHAR(100),
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME
        )
        `);

    // Creamos la tabla property  "Pisos en alquiler"
    await connection.query(`
        CREATE TABLE properties(
            idProperty INT PRIMARY KEY AUTO_INCREMENT,
            idUser INT NOT NULL,
            FOREIGN KEY (idUser) REFERENCES users(idUser) ON DELETE CASCADE,
            city VARCHAR(100),
            province VARCHAR(100),
            address VARCHAR(100),
            zipCode VARCHAR(5),
            number INT,
            type ENUM("duplex","casa","piso"),
            stair VARCHAR(50),
            flat INT,
            gate VARCHAR(20),
            mts DECIMAL(5,2),
            rooms INT,
            garage BOOLEAN,
            terrace BOOLEAN,
            toilets INT,
            energyCertificate BOOLEAN,
            availabilityDate DATE,
            price DECIMAL(6,2),
            state ENUM("reservado", "alquilado", "disponible"),
            modifiedAt DATETIME,
            createdAt DATETIME NOT NULL
        )
    `);

    // Creamos la tabla votes.
    //   ---idVoted hace referencia a quien esta siendo calificado.
    //   ---idUser hace referencia a quien realiza el voto.
    await connection.query(`
        CREATE TABLE votes (
            idVote INT PRIMARY KEY AUTO_INCREMENT,
            voteValue TINYINT NOT NULL DEFAULT 3,
            voteValueRenter TINYINT NOT NULL DEFAULT 3,
            commentProperty VARCHAR(250),
            commentRenter VARCHAR(250),
            idVoted INT,
            FOREIGN KEY (idVoted) REFERENCES users(idUser) ON DELETE CASCADE,
            idProperty INT,
            idUser INT NOT NULL,
            FOREIGN KEY (idUser) REFERENCES users(idUser),
            CONSTRAINT votes_CK1 CHECK (voteValue IN(1, 2, 3, 4, 5)),
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME
        )
    `);

    // Creamos la tabla de reservas.
    await connection.query(`
        CREATE TABLE bookings (
            idBooking INT PRIMARY KEY AUTO_INCREMENT,
            idRenter INT,
            FOREIGN KEY (idRenter) REFERENCES users(idUser) ON DELETE CASCADE,
            idTenant INT,
            FOREIGN KEY (idTenant) REFERENCES users(idUser) ON DELETE CASCADE,
            idProperty INT,
            FOREIGN KEY (idProperty) REFERENCES properties(idProperty) ON DELETE CASCADE,
            createdAt DATETIME NOT NULL,
            startBookingDate DATE,
            endBookingDate DATE,
            state ENUM("reservado", "alquilado", "finalizado", "peticion", "cancelado-renter", "cancelado-tenant") NOT NULL DEFAULT "peticion",
            bookingCode VARCHAR(20)
            )
    `);

    // Creamos la tabla fotos
    await connection.query(`
        CREATE TABLE photos (
            idPhoto INT PRIMARY KEY AUTO_INCREMENT,
            idProperty INT NOT NULL,
            FOREIGN KEY (idProperty) REFERENCES properties(idProperty) ON DELETE CASCADE,
            name VARCHAR(100),
            createdAt DATETIME NOT NULL
        )
    `);

    console.log('Tablas creadas');

    // Insertar el usuario administrador.
    await connection.query(`
    INSERT INTO users ( name, lastName, tel, email, password, role, createdAt, city, birthDate)
    VALUES (
        "david",
        "losas",
        "123456789",
        "david1935@gmail.com",
        SHA2("123456", 512),
        "admin",
        "${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}",
        "A coruña",
        "1900-01-30"
    )
`);
    // Nº de usuarios que queremos introducir.
    const USERS = 10;

    // Insertamos los usuarios.
    for (let i = 0; i < USERS; i++) {
      // Datos de faker.

      const name = faker.name.findName();
      const lastName = faker.name.lastName();
      const phone = faker.phone.phoneNumber();
      const email = faker.internet.email();
      const password = faker.internet.password();
      const city = faker.address.cityName();
      const birthDate = format(faker.datatype.datetime(), 'yyyy-MM-dd');

      // Fecha de cración.
      const createdAt = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

      await connection.query(`
        INSERT INTO users ( name, lastName, tel, email, password, createdAt, city, birthDate)
        VALUES ( "${name}", "${lastName}", "${phone}", "${email}", "${password}", "${createdAt}", "${city}", "${birthDate}" )
    `);
    }

    console.log('Usuarios creados');
  } catch (error) {
    console.error(error.message);
  } finally {
    if (connection) connection.release();
    process.exit(0);
  }
}

main();
