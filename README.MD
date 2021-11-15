# Perfect Renter

- Perfect Renter es una aplicación web destinada a la búsqueda de pisos en
  alquiler.

- En ella se pueden encontrar los inmuebles disponibles con la persona encargada
  de arrendarlo, como también los futuros inquilinos.

## Tutorial de uso
  
  - Despues de clonar el repositorio en tu repositorio local:
      1. Crear un archivo que se llame: **.env** y añadir la información necesaria, descrita en **.env_example**.
      2. ```npm install ``` Para instalar las dependencias necesarias.
      3. ```npm run initDB``` Para la creación de las bases de datos.
      4. ```npm run dev``` Para iniciar el servidor.

## Tutorial de uso TESTS

  -Para iniciar los tests tan solo debes utilizar el siguiente comando:
    1. ````npm run tests```
   Y aparecerán todos los tests realizados en la app.
## Documentación

  - Sprint de Backend: [Tabla horas trabajadas.](https://github.com/manutowersdev/Perfect_Renter/blob/01ac551f8aaf83095e96a887ba5eb4e016b54b75/Sprint%20BACKEND%20-%20SCRUM.pdf)
  
  - Sprint de Frontend: 

  - JavascriptDocumentation(JSDOC): [JSDOC PerfectRenter](https://manutowersdev.github.io/Perfect_Renter/)


## Directorios

1. Documentación

   - Contiene documentación general del proyecto, como el análisis funcional, el wireframe...

2. Config

   - Contiene archivos de configuración de la base de datos/servidor. (_Debería estar en .gitIgnore_)

3. Libs

   - Contiene modulos de funciones, middlewares... para utilizar en múltiples ocasiones en los demás módulos.

4. Models
   - Contiene los schemas de las diferentes páginas dónde el usuario debe insertar datos.

## Endpoints Entradas ✅

- GET - [/properties] - Obtener un listado de todos los alquileres. 
- GET - [/properties/:idProperty] - Obtener un alquiler en concreto. 
- POST - [/properties] - Crear un alquiler. 
- POST - [/properties/:idProperty/photos] - Agregar una foto a un alquiler. 
- POST - [/properties/:idProperty/votes] - Votar un alquiler. 
- PUT - [/properties/:idProperty] - Edita un alquiler. 
- DELETE - [/properties/:idProperty] - Borrar un alquiler. 
- DELETE - [/properties/:idProperty/photos/:idPhoto] - Eliminar una foto del alquiler. 

  <-- FUNCIONES AVANZADAS -->

- POST - [/properties/:idProperty/contact] - Mandar mensaje al casero de un alquiler. 
- POST - [/properties/:idProperty/:bookingCode] - Aceptar solicitud de reserva. 
- POST - [/properties/:idProperty/:bookingCode/cancel] - Rechazar reserva. 

  <-- FUNCIONES AVANZADAS -->

## Endpoints del usuario ✅

- GET - [/users] - Listar los usuarios 
- GET - [/users/:idUser] - Obtener un usuario en concreto.
- POST - [/users] - Crea un usuario pendiente de activación.
- POST - [/users/login] - Inicia sesión a un usuario y proporciona un token.
- GET - [/users/validate/:registrationCode] - Valida un usuario recién registrado o valida los cambios de email/contraseña. 
- PUT - [/users/:idUser] - Editar los datos del usuario.
- PUT - [/users/:idUser/password] - Edita la contraseña de un usuario. 
- PUT - [/users/password/recover] - Enviar un correo con el enlace de reseteo de la contraseña. 
- PUT - [users/password/recover/:idUser/:recoverCode] - Cambiar la contraseña de un usuario con el código de reseteo. 
- DELETE - [/users/:idUser] - Eliminar un usuario. 
- GET- [/users/:idUser/properties] - Listar alquileres en propiedad.

  <-- FUNCIONES AVANZADAS -->

- POST - [/users/:idUser/contact] - Mandar mensaje a un renter. 
- GET- [/users/:idUser/booked] - Listar alquileres reservados.
- GET - [/users/:idUser/votes] - Obtener votos de un usuario en concreto.

  <-- FUNCIONES AVANZADAS -->

## FUNCIONES A AÑADIR

- [ ] Geolocalizar usuario
- [ ] Avisar subida o bajada de precio de un alquiler por email al usuario que se suscriba
- [ ] Añadir API idealista

## AUTORES

### JULIAN RENDON

### ROCIO IGLESIAS

### MANU TORRES
