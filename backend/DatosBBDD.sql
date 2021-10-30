-- COPIAR Y PEGAR EL ARCHIVO ENTERO EN WORKBENCH Y EJECUTAR TODO EL ARCHIVO DESPUES DE HACER UN "NPM RUN INITDB"

use perfect_renter;

-- Creacion usuarios
INSERT INTO perfect_renter.users
(name, lastName, tel, birthDate, email, password, avatar, bio, city, renterActive, deleted, `role`, registrationCode, recoverCode, createdAt, modifiedAt)
VALUES("Manu","Torres", "666 666 666", '1996-07-14',  "manutorres1996@gmail.com",SHA2("PerfectRenter1", 512), '', "Biografia", "Barcelona", 1, 0, "renter", 123, null, CURRENT_TIMESTAMP(), NULL);
INSERT INTO perfect_renter.users
(name, lastName, tel, birthDate, email, password, avatar, bio, city, renterActive, deleted, `role`, registrationCode, recoverCode, createdAt, modifiedAt)
VALUES("Perfect", "Renter", "666 666 666", "1990-01-01", "perfectrenterproject@gmail.com", SHA2("PerfectRenter1", 512),'', "Biografia", "Madrid", 1,0,"renter", 123, null, CURRENT_TIMESTAMP(),null);
INSERT INTO perfect_renter.users
(name, lastName, tel, birthDate, email, password, avatar, bio, city, renterActive, deleted, `role`, registrationCode, recoverCode, createdAt, modifiedAt)
VALUES("Julian", "Rendon", "666 666 666", "1990-01-01", "julianandres.rendon@gmail.com", SHA2("PerfectRenter1", 512),'', "Biografia", "Canarias", 1,0,"renter", 123, null, CURRENT_TIMESTAMP(), null);
INSERT INTO perfect_renter.users
(name, lastName, tel, birthDate, email, password, avatar, bio, city, renterActive, deleted, `role`, registrationCode, recoverCode, createdAt, modifiedAt)
VALUES("Rocio", "Iglesias", "666 666 666", "1990-01-01", "rocioiglesias30@gmail.com", SHA2("PerfectRenter1", 512),'', "Biografia", "A Coruña", 1,0,"renter", 123, null, CURRENT_TIMESTAMP(),null);

-- Creacion propiedades
INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt)
VALUES(12, "Barcelona", "Barcelona", "Carrer del Riu", "08480", 9, "piso", 0, 1, 3, 70.00, 3, 0, 0, 1, 0,CURRENT_DATE(), 650.00, "disponible", NULL, CURRENT_TIMESTAMP());

INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt)
VALUES(12, 'Girona', 'Girona', 'Carrer de Costa Rica', '17001', 9, 'duplex', 1, 2,2, 80.00, 3, 0, 0, 1, 0, CURRENT_DATE(), 300.00, 'disponible', NULL, CURRENT_TIMESTAMP());

INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt)
VALUES(13, 'Madrid', 'Madrid', 'Calle Aragón', '28002', 9, 'piso', '1', 3, '2', 80.00, 3, 0, 0, 1, 0, CURRENT_DATE(), 1250.00, 'disponible', NULL, CURRENT_TIMESTAMP());

INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt)
VALUES(13, 'Cuenca', 'Cuenca', 'Calle Jorge Torner', '16004', 2, 'casa', '1', 4, '2', 80.00, 3, 0, 0, 1, 0, CURRENT_DATE(), 500.00, 'disponible', NULL, CURRENT_TIMESTAMP());

INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt)
VALUES(14, 'Madrid', 'Madrid', 'Calle España', '28001', 1, 'duplex', '1', 5, '2', 80.00, 3, 0, 0, 1, 0,CURRENT_DATE(), 2000.00, 'disponible', NULL, CURRENT_TIMESTAMP());

INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt)
VALUES(14, 'A Coruña', 'A Coruña', 'Rúa González del Villar', '15007', 40, 'piso', '1', 6, '2', 80.00, 3, 0, 0, 1, 0, CURRENT_DATE(), 850.00, 'disponible', NULL, CURRENT_TIMESTAMP());

INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt)
VALUES(15, 'Mérida', 'Badajoz', 'Calle San Juan', '06800', 14, 'piso', '1', 7, '2', 80.00, 3, 0, 0, 1, 0, CURRENT_DATE(), 950.00, 'disponible', NULL, CURRENT_TIMESTAMP());

INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt)
VALUES(15, 'Cadiz', 'Cadiz', 'Calle Murillo', '11010', 20, 'duplex', '6', 8, '2', 80.00, 3, 0, 0, 1, 0, CURRENT_DATE(), 500.00, 'disponible', NULL, CURRENT_TIMESTAMP());



-- Creacion reservas
-- 12
INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(12, 13, 1, CURRENT_DATE(), NULL,"2021-12-03" , "2021-12-01", 'reservado', "reserva1");

INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(12, 13, 1, CURRENT_TIMESTAMP(), NULL,"2021-10-15" , "2021-10-20", 'finalizada', "reserva2");

INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(12, 13, 2, CURRENT_DATE(), NULL,"2021-12-15" , "2021-12-20", 'reservado', "reserva3");
-- 13
INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(13, 15, 8, CURRENT_DATE(), NULL,"2021-12-03" , "2021-12-01", 'reservado', "reserva4");

INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(13, 14, 5, CURRENT_TIMESTAMP(), NULL,"2021-10-15" , "2021-10-20", 'finalizada', "reserva5");

INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(13, 14, 5, CURRENT_DATE(), NULL,"2021-12-15" , "2021-12-20", 'reservado', "reserva6");
-- 14
INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(14, 15, 7, CURRENT_DATE(), NULL,"2021-12-03" , "2021-12-01", 'reservado', "reserva7");

INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(14, 13, 4, CURRENT_TIMESTAMP(), NULL,"2021-10-15" , "2021-10-20", 'finalizada', "reserva8");

INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(14, 13, 3, CURRENT_DATE(), NULL,"2021-12-15" , "2021-12-20", 'reservado', "reserva9");

-- Creacion Votos
-- Finalizadas
INSERT INTO perfect_renter.votes
(voteValue, voteValueRenter, commentProperty, commentRenter, idTenant, idProperty, idRenter, createdAt, modifiedAt)
VALUES(1, 3, 'La casa se desmoronaba.', 'Es un señor especial.', 13, 1, 12, CURRENT_DATE(), '');

INSERT INTO perfect_renter.votes
(voteValue, voteValueRenter, commentProperty, commentRenter, idTenant, idProperty, idRenter, createdAt, modifiedAt)
VALUES(2, 5, 'La casa bien pero había malos vecinos.', 'Muy puntual con los pagos.', 14, 5, 13, CURRENT_DATE(), '');

INSERT INTO perfect_renter.votes
(voteValue, voteValueRenter, commentProperty, commentRenter, idTenant, idProperty, idRenter, createdAt, modifiedAt)
VALUES(5, 5, 'La casa impoluta.', 'Es un señor muy amable.', 13, 4, 14, CURRENT_DATE(), '');
-- Reservadas
INSERT INTO perfect_renter.votes
(voteValue, voteValueRenter, commentProperty, commentRenter, idTenant, idProperty, idRenter, createdAt, modifiedAt)
VALUES(5, 1, 'El dueño muy amable.', 'Preguntan mucho.', 13, 1, 12, CURRENT_DATE(), '');

INSERT INTO perfect_renter.votes
(voteValue, voteValueRenter, commentProperty, commentRenter, idTenant, idProperty, idRenter, createdAt, modifiedAt)
VALUES(3, 3, 'Todo ok.', 'Todo ok.', 13, 3, 14, CURRENT_DATE(), '');

INSERT INTO perfect_renter.votes
(voteValue, voteValueRenter, commentProperty, commentRenter, idTenant, idProperty, idRenter, createdAt, modifiedAt)
VALUES(2, 0, 'Todo ok de momento.', 'Cambiaré la opinión cuando acabe la estancia.', 15, 8, 13, CURRENT_DATE(), '');

