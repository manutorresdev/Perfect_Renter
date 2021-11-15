use perfect_renter;

-- Creacion usuarios
INSERT INTO perfect_renter.users
(name, lastName, tel, birthDate, email, password, avatar, bio, city, renterActive, deleted, `role`, registrationCode, recoverCode, createdAt, modifiedAt)
VALUES("Manu","Torres", "666 666 666", '1996-07-14',  "manutorres1996@gmail.com",SHA2("PerfectRenter1", 512), 'manu.jpg', "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum amet natus eaque rem ad, minima iure.", "Barcelona", 1, 0, "renter", 123, null, CURRENT_TIMESTAMP(), NULL);
INSERT INTO perfect_renter.users
(name, lastName, tel, birthDate, email, password, avatar, bio, city, renterActive, deleted, `role`, registrationCode, recoverCode, createdAt, modifiedAt)
VALUES("Perfect", "Renter", "666 666 666", "1990-01-01", "perfectrenterproject@gmail.com", SHA2("PerfectRenter1", 512),'renter.jpg', "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum amet natus eaque rem ad, minima iure.", "Madrid", 1,0,"renter", 123, null, CURRENT_TIMESTAMP(),null);
INSERT INTO perfect_renter.users
(name, lastName, tel, birthDate, email, password, avatar, bio, city, renterActive, deleted, `role`, registrationCode, recoverCode, createdAt, modifiedAt)
VALUES("Julian", "Rendon", "666 666 666", "1990-01-01", "julianandres.rendon@gmail.com", SHA2("PerfectRenter1", 512),'julian.jpg', "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum amet natus eaque rem ad, minima iure.", "Canarias", 1,0,"renter", 123, null, CURRENT_TIMESTAMP(), null);
INSERT INTO perfect_renter.users
(name, lastName, tel, birthDate, email, password, avatar, bio, city, renterActive, deleted, `role`, registrationCode, recoverCode, createdAt, modifiedAt)
VALUES("Rocio", "Iglesias", "666 666 666", "1990-01-01", "rocioiglesias30@gmail.com", SHA2("PerfectRenter1", 512),'rocio.jpg', "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum amet natus eaque rem ad, minima iure.", "A Coruña", 1,0,"renter", 123, null, CURRENT_TIMESTAMP(),null);
INSERT INTO perfect_renter.users
(name, lastName, tel, birthDate, email, password, avatar, bio, city, renterActive, deleted, `role`, registrationCode, recoverCode, createdAt, modifiedAt)
VALUES("Gloria", "Valido", "666 666 666", "1990-06-01", "rocioisis30@gmail.com", SHA2("PerfectRenter1", 512),'entrepreneur-g9d1bf0592_640.jpg', "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum amet natus eaque rem ad, minima iure.", "Telde", 1,0,"renter", 123, null, CURRENT_TIMESTAMP(),null);
INSERT INTO perfect_renter.users
(name, lastName, tel, birthDate, email, password, avatar, bio, city, renterActive, deleted, `role`, registrationCode, recoverCode, createdAt, modifiedAt)
VALUES("Fernando", "Casas", "666 666 666", "1990-06-01", "rooisias30@gmail.com", SHA2("PerfectRenter1", 512),'model-g6b31d7895_640.jpg', "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum amet natus eaque rem ad, minima iure.", "Telde", 1,0,"renter", 123, null, CURRENT_TIMESTAMP(),null);
INSERT INTO perfect_renter.users
(name, lastName, tel, birthDate, email, password, avatar, bio, city, renterActive, deleted, `role`, registrationCode, recoverCode, createdAt, modifiedAt)
VALUES("Laura", "Pausini", "666 666 666", "1990-06-01", "rocioias30@gmail.com", SHA2("PerfectRenter1", 512),'woman-g6639aa850_640.jpg', "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum amet natus eaque rem ad, minima iure.", "Telde", 1,0,"renter", 123, null, CURRENT_TIMESTAMP(),null);

-- Creacion propiedades
INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt, description)
VALUES(12, "Barcelona", "Barcelona", "Carrer del Riu", "08480", 9, "piso", 0, 1, 3, 90, 3, 0, 0, 2, 0,CURRENT_DATE(), 125.00, "disponible", NULL, CURRENT_TIMESTAMP(), "Promoción de Obra nueva situada en Barcelona, exclusiva promoción de 22 viviendas con acabados de primera calidad, sistema de climatización de aerotermia de ahorro energético, suelos de parqué, piso de 90,30m² construídos, 2 habitaciones dobles y 1 individual, 2 baños completos, cocina independiente con salida al balcón, amplio comedor con salida al balcón, con parking opcional ! Ven a pedir información !");

INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt, description)
VALUES(12, 'Girona', 'Girona', 'Carrer de Costa Rica', '17001', 9, 'dúplex', 1, 2,2, 85, 2, 0, 0, 1, 0, CURRENT_DATE(), 99.00, 'disponible', NULL, CURRENT_TIMESTAMP(),"Últimos apartamentos en nuestra promoción Santa Clara 11.Se encuentra instalada en una de las mejores zonas del casco antiguo de Girona, frente al río Onyar. El objetivo de Zenit Houses es transformar el edificio denso de oficinas de los años 70 en una nueva tipología de vida dinámica. Se propone un nuevo patio de luces. Se piensa como un espacio moderno, transparente y luminoso, abierto al cielo. Como corazón de construcción, proporciona luz, ventilación y carácter a las viviendas y al público. Se define en bloques de vidrio siguiendo la tradición de la galería norte-europea, tal como sucede en la Viennese Otto Wagner modernist DS. Las tipologías de viviendas variadas están abiertas tanto en la calle como en el patio. Los diferentes niveles están ocupados con múltiples experiencias de vida. La antigua estructura flexible se adapta a los nuevos tiempos, y también desarrolla una nueva fachada en la calle, que muestra el carácter renovado de Girona. Los apartamentos están listos para entrar a vivir, cocinas totalmente completas con los electrodomésticos integrados incluidos.");

INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt, description)
VALUES(13, 'Madrid', 'Madrid', 'Calle Aragón', '28002', 9, 'piso', '1', 3, '2', 80, 1, 0, 0, 1, 0, CURRENT_DATE(), 150.00, 'disponible', NULL, CURRENT_TIMESTAMP(),"El piso está reformado y se encuentra en óptimas condiciones. Cuenta con calefación incluída en el precio. Tiene aire acondicionado en el salón. Es exterior.
Tiene techos altos, paredes lisas con molduras de techo, suelos de parqué. Cuenta con puerta blindada y ventilación cruzada. Podemos encontrar armarios empotrados en dos dormitorios. Las ventanas son climalit. Se divide en las siguientes estancias: -Hall de entrada: Recibidor que da acceso a la vivienda -Salón: con ventanas exteriores. La zona de comedor es independiente. -Cocina: Independiente, amueblada y equipada con electrodomésticos. Cuenta con microondas, lavavajillas, horno, y vitrocerámica. Tiene ventana. -Zona office que da servicio a la cocina -Zona de lavadero, independiente, con su puerta de servicio -Dormitorio 1: mater bedroom, con baño ensuite. Tiene ventana exterior. Acceso desde el salón -Baño 1: Con bañera -Dormitorio 2: individual, con baño ensuite. Tiene ventana interior -Baño 2: Con pie de ducha -Dormitorio 3: de servicio. Tiene ventana -Baño 3: Con ducha. Tiene ventana"); 

INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt, description)
VALUES(13, 'Cuenca', 'Cuenca', 'Calle Jorge Torner', '16004', 2, 'casa', '1', 4, '2', 150, 5, 0, 0, 2, 0, CURRENT_DATE(), 110.00, 'disponible', NULL, CURRENT_TIMESTAMP(),"Se alquila estupenda casa zona Plaza Del Nazareno. 2 Dormitorios, 2 Baños completos, Salón-comedor y cocina totalmente equipada");

INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt, description)
VALUES(14, 'Madrid', 'Madrid', 'Calle España', '28001', 1, 'dúplex', '1', 5, '2', 80, 3, 0, 0, 1, 0,CURRENT_DATE(), 180.00, 'disponible', NULL, CURRENT_TIMESTAMP(),"Se alquila dúplex en urbanización cerrada con grandes zonas verdes ajardinadas y piscina comunitaria. Recién reformado con unas calidades inmejorables. La vivienda se divide en varias plantas con una gran amplitud en cada estancia. Sótano con gran sala polivalente con jacuzzi. Planta Baja con gran salón con salida a jardín privado y acceso directo a la zona comunitaria y piscina. Comedor independiente con acceso directo a la cocina. Planta 1ª con 4 dormitorios, dos de ellos en suite con baño incorporado y otros dos compartiendo un baño. Buhardilla con baño. Calefacción por suelo radiante. Climatización frío-calor por conductos. Instalación de sistema solar para apoyo al agua caliente sanitaria. Aspiración centralizada. Iluminación Led en toda la vivienda en pasillos y escaleras con sensores de presencia. Vídeo- vigilancia con cámaras IP Domótica integrada para el manejo de la calefacción. Persianas y toldos eléctricos. Ascensor con acceso a todas las plantas. Cocina con electrodomésticos Mide 3 plazas de garaje consecutivas.");

INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt, description)
VALUES(14, 'A Coruña', 'Cerceda', 'Rúa González del Villar', '15185', 40, 'piso', '1', 6, '2', 80, 3, 0, 0, 1, 0, CURRENT_DATE(), 75.00, 'disponible', NULL, CURRENT_TIMESTAMP(),"¡¡Aviso Importante!! Si eres de Madrid Comunidad, por favor,mira bien la dirección porque este inmueble esta en Cerceda, un pueblo de la provincia de A CORUÑA.
15185 Cerceda (La Coruña), España.

AVISO MUY IMPORTANTE!!!! Si eres de Madrid comunidad y no sabes leer no te preocupes, sigue llamándonos y te atenderemos gustosamente aunque te llevarás un disgusto porque este Cerceda está y sigue estando en la provincia de A Coruña.

Se alquila maravilloso piso con excelentes vistas, en la zona de Cerceda. Disfrute de excelentes vistas despejadas y muy soleado.

La Propiedad es muy amplia y luminosa, dispone de 2 amplias habitaciones y 2 baños. La cocina esta completamente equipada con electrodomésticos de muy buena calidad, con área de lavandería aparte. Todas las habitaciones son amplias con armario empotrado.

El piso cuenta con 2 plazas de garaje y trastero.

Además para que no lo dudes, el edificio cuenta con un área privada (en la parte trasera del edificio) para esparcimiento, tomar el sol y hacer unas ricas barbacoas, dispones de mesitas y área para churrasco.

A poca distancia encontrara supermercados, farmacias, parada de bus, colegios, etc.

SE SOLICITA COMO CONDICIÖN SEGURO IMPAGO DE INQUILINO ( se lo podemos gestionar y cuesta unos 180€/año)");

INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt, description)
VALUES(15, 'Mérida', 'Badajoz', 'Calle San Juan', '06800', 14, 'piso', '1', 7, '2', 80, 3, 0, 0, 1, 0, CURRENT_DATE(), 90.00, 'disponible', NULL, CURRENT_TIMESTAMP(),"CENTRO COLWORKING Dos esplendidas plantas con varios despachos y zonas comunes . En pleno corazón de Mérida. Zona comercial por excelencia. Grandes salones. Materiales de primera. Zona turística. Posibilidad de alquilar por separado o las dos plantas. Todas las instalaciones necesarias para despachos profesionales, Wifi, telefonía, Si es un profesional del sector no lo dude , rentabilidad asegurada, poca inversión. Alquiler largo plazo. No deje pasar esta oportunidad.");

INSERT INTO perfect_renter.properties(idUser, city, province, address, zipCode, `number`, `type`, stair, flat, gate, mts, rooms, garage, terrace, toilets, energyCertificate, availabilityDate, price, state, modifiedAt, createdAt, description)
VALUES(15, 'Cadiz', 'Cadiz', 'Calle Murillo', '11010', 20, 'dúplex', '6', 8, '2', 80, 3, 0, 0, 1, 0, CURRENT_DATE(), 65.00, 'disponible', NULL, CURRENT_TIMESTAMP(),"Espectacular dúplex en finca de reciente construcción (año 2021), primeras calidades, situado en una de las mejores zonas de la ciudad como es el barrio de La Laguna. Proximidad al Hospital Universitario Puerta del Mar, multitud de comercios y supermercados y magníficas conexiones con las principales estaciones de transporte urbano e interurbano.
La vivienda consta de dos dormitorios amplios con armarios empotrados completamente forrados y ventanas oscilobatientes de primera calidad, ambos exteriores.
Cuarto de baño completo con sanitarios de porcelanosa y placa de ducha con mampara de cristal.
Salón cocina como antesala de la terraza con mucha luminosidad. Cocina equipada con los electrodomésticos (frigorífico, lavavajillas, microondas, vitrocerámica, campana extractora y calentador eléctrico), encimera de silestone.
Gran terraza principal exterior muy espaciosa dotada de un cuarto de Aseo y de una zona con barra y fregadero que hará las delicias de los inquilinos. En la misma terraza disponemos de una escalera de caracol que nos lleva a una segunda terraza/solarium con vistas a toda la bahía.
Incluye plaza de garaje y trastero en el mismo edificio, amplia y con maniobras sencillas y directas.");



-- Creacion reservas
-- 12
INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(12, 13, 1, CURRENT_DATE(), NULL,"2021-12-01" , "2021-12-03", 'reservado', "reserva1");

CREATE EVENT reserva1_event_start
ON SCHEDULE AT "2021-12-01"
DO
UPDATE bookings SET state = "alquilada", modifiedAt = "2021-12-01" WHERE bookingCode = "reserva1";
    
CREATE EVENT reserva1_event_end
ON SCHEDULE AT "2021-12-03"
DO
UPDATE bookings SET state = "finalizada", modifiedAt = "2021-12-03" WHERE bookingCode = "reserva1";

INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(12, 13, 1, CURRENT_TIMESTAMP(), NULL,"2021-10-15" , "2021-10-20", 'finalizada', "reserva2");

INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(12, 13, 2, CURRENT_DATE(), NULL,"2021-12-15" , "2021-12-20", 'reservado', "reserva3");

CREATE EVENT reserva3_event_start
ON SCHEDULE AT "2021-12-15"
DO
UPDATE bookings SET state = "alquilada", modifiedAt = "2021-12-15" WHERE bookingCode = "reserva3";
    
CREATE EVENT reserva3_event_end
ON SCHEDULE AT "2021-12-20"
DO
UPDATE bookings SET state = "finalizada", modifiedAt = "2021-12-20" WHERE bookingCode = "reserva3";

-- 13

INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(13, 15, 8, CURRENT_DATE(), NULL,"2021-12-01" , "2021-12-03", 'reservado', "reserva4");

CREATE EVENT reserva4_event_start
ON SCHEDULE AT "2021-12-01"
DO
UPDATE bookings SET state = "alquilada", modifiedAt = "2021-12-01" WHERE bookingCode = "reserva4";
    
CREATE EVENT reserva4_event_end
ON SCHEDULE AT "2021-12-03"
DO
UPDATE bookings SET state = "finalizada", modifiedAt = "2021-12-03" WHERE bookingCode = "reserva4";

INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(13, 14, 5, CURRENT_TIMESTAMP(), NULL,"2021-10-15" , "2021-10-20", 'finalizada', "reserva5");

INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(13, 14, 5, CURRENT_DATE(), NULL,"2021-12-15" , "2021-12-20", 'reservado', "reserva6");

CREATE EVENT reserva6_event_start
ON SCHEDULE AT "2021-12-15"
DO
UPDATE bookings SET state = "alquilada", modifiedAt = "2021-10-15" WHERE bookingCode = "reserva6";
    
CREATE EVENT reserva6_event_end
ON SCHEDULE AT "2021-10-20"
DO
UPDATE bookings SET state = "finalizada", modifiedAt = "2021-12-20" WHERE bookingCode = "reserva6";

-- 14
INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(14, 15, 7, CURRENT_DATE(), NULL,"2021-12-01" , "2021-12-03", 'reservado', "reserva7");

CREATE EVENT reserva7_event_start
ON SCHEDULE AT "2021-12-01"
DO
UPDATE bookings SET state = "alquilada", modifiedAt = "2021-12-01" WHERE bookingCode = "reserva7";

CREATE EVENT reserva7_event_end
ON SCHEDULE AT "2021-12-03"
DO
UPDATE bookings SET state = "finalizada", modifiedAt = "2021-12-03" WHERE bookingCode = "reserva7";


INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(14, 13, 4, CURRENT_TIMESTAMP(), NULL,"2021-10-15" , "2021-10-20", 'finalizada', "reserva8");

INSERT INTO perfect_renter.bookings
(idRenter, idTenant, idProperty, createdAt, modifiedAt, startBookingDate, endBookingDate, state, bookingCode)
VALUES(14, 13, 3, CURRENT_DATE(), NULL,"2021-12-15" , "2021-12-20", 'reservado', "reserva9");

CREATE EVENT reserva9_event_start
ON SCHEDULE AT "2021-12-15"
DO
UPDATE bookings SET state = "alquilada", modifiedAt = "2021-12-15" WHERE bookingCode = "reserva9";

CREATE EVENT reserva9_event_end
ON SCHEDULE AT "2021-12-20"
DO
UPDATE bookings SET state = "finalizada", modifiedAt = "2021-12-20" WHERE bookingCode = "reserva9";

-- Creacion Votos
-- Finalizadas
INSERT INTO perfect_renter.votes
(voteValue, voteValueRenter, commentProperty, commentRenter, idTenant, idProperty, idRenter, createdAt, modifiedAt)
VALUES(1, 3, 'La casa se desmoronaba.', 'Es un señor especial.', 13, 1, 12, CURRENT_DATE(), null);

INSERT INTO perfect_renter.votes
(voteValue, voteValueRenter, commentProperty, commentRenter, idTenant, idProperty, idRenter, createdAt, modifiedAt)
VALUES(2, 5, 'La casa bien pero había malos vecinos.', 'Muy puntual con los pagos.', 14, 5, 13, CURRENT_DATE(), null);

INSERT INTO perfect_renter.votes
(voteValue, voteValueRenter, commentProperty, commentRenter, idTenant, idProperty, idRenter, createdAt, modifiedAt)
VALUES(5, 5, 'La casa impoluta.', 'Es un señor muy amable.', 13, 4, 14, CURRENT_DATE(), null);
-- Reservadas
INSERT INTO perfect_renter.votes
(voteValue, voteValueRenter, commentProperty, commentRenter, idTenant, idProperty, idRenter, createdAt, modifiedAt)
VALUES(5, 1, 'El dueño muy amable.', 'Preguntan mucho.', 13, 1, 12, CURRENT_DATE(), null);

INSERT INTO perfect_renter.votes
(voteValue, voteValueRenter, commentProperty, commentRenter, idTenant, idProperty, idRenter, createdAt, modifiedAt)
VALUES(3, 3, 'Todo ok.', 'Todo ok.', 13, 3, 14, CURRENT_DATE(),null);

INSERT INTO perfect_renter.votes
(voteValue, voteValueRenter, commentProperty, commentRenter, idTenant, idProperty, idRenter, createdAt, modifiedAt)
VALUES(2, 0, 'Todo ok de momento.', 'Cambiaré la opinión cuando acabe la estancia.', 15, 8, 13, CURRENT_DATE(), null);

INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('1', 'isaac-martin-wH2aFGo-Rt0-unsplash.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('1', 'visualsofdana-T5pL6ciEn-I-unsplash.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('1','conscious-design-xMZFL3_Iwf0-unsplash.jpg', '2021-11-10');

INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('2', 'stephen-leonardi--TsLaYk1DLM-unsplash.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('2', 'chastity-cortijo-R-w5Q-4Mqm0-unsplash.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('2', 'chastity-cortijo-M8iGdeTSOkg-unsplash.jpg', '2021-11-10');

INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('3', 'christopher-jolly-YNthBCE7_Ao-unsplash.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('3', 'lissete-laverde-u8MvAeoieuY-unsplash.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('3', 'kam-idris-kyt0PkBSCNQ-unsplash.jpg', '2021-11-10');

INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('4', 'neonbrand-Wp7t4cWN-68-unsplash.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('4', 'sidekix-media-r_y2VBvEOIE-unsplash.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('4', 'sidekix-media-SnHO-Ua7QtY-unsplash.jpg', '2021-11-10');

INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('5','sidekix-media-OMm4EMA2Vbs-unsplash.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('5', 'murat-demircan-beDmytOHU5k-unsplash.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('5', 'laura-adai-m8Mz6UjaoEo-unsplash.jpg', '2021-11-10');

INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('6', 'murat-demircan-NcCMsdDJXIY-unsplash.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('6', 'sidekix-media-r_y2VBvEOIE-unsplash.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('6', 'sidekix-media-SnHO-Ua7QtY-unsplash.jpg', '2021-11-10');

INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('7', 'neonbrand-Wp7t4cWN-68-unsplash.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('7', 'toa-heftiba-FV3GConVSss-unsplash.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('7', 'slide26.jpg', '2021-11-10');

INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('8', 'slide20.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('8', 'modern_kitchen_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_3335566_o.jpg', '2021-11-10');
INSERT INTO perfect_renter.photos(idProperty, name, createdAT) VALUES ('8', 'sidekix-media-SnHO-Ua7QtY-unsplash.jpg', '2021-11-10');






