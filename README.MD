# Perfect Renter

- Perfect Renter es una aplicación web destinada a la búsqueda de pisos en
  alquiler.

- En ella se pueden encontrar los inmuebles disponibles con la persona encargada
  de arrendarlo, como también los futuros inquilinos.

## Directorios

1. Documentación

   - Contiene documentación general del proyecto, como el análisis funcional, el wireframe...

2. Config

   - Contiene archivos de configuración de la base de datos/servidor. (_Debería estar en .gitIgnore_)

3. Libs

   - Contiene modulos de funciones, middlewares... para utilizar en múltiples ocasiones en los demás módulos.

4. Models
   - Contiene los schemas de las diferentes páginas dónde el usuario debe insertar datos.

## Endpoints Flats

- GET - [/flats] - Obtener un listado de todos los alquileres. ✅
- GET - [/flats/:idFlat] - Obtener un alquiler en concreto. ✅
- POST - [/flats] - Crear un alquiler. ✅
- POST - [/flats/:idFlat/photos] - Agregar una foto a un alquiler.✅
- POST - [/flats/:idFlat/votes] - Votar un alquiler.
- POST - [/flats/:idFlat/contact] - Mandar mensaje a un alquiler. ✅
- PUT - [/entries/:idFlat] - Edita un alquiler. ✅
- DELETE - [/flats/:idFlat] - Borrar un alquiler.
- DELETE - [/flats/:idFlat/photos/:idPhoto] - Eliminar una foto del alquiler.

## Endpoints del usuario

- GET - [/users] - Listar los usuarios ✅
- GET - [/users/:idUser] - Obtener un usuario en concreto.✅
- POST - [/users] - Crea un usuario pendiente de activación.✅
- POST - [/users/login] - Inicia sesión a un usuario y proporciona un token.✅
- POST - [/users/:idUser/contact] - Mandar mensaje a un renter. ✅
- GET - [/users/validate/:registrationCode] - Valida un usuario recién registrado o valida los cambios de email/contraseña. ✅
- PUT - [/users/:idUser] - Editar los datos del usuario.✅
- PUT - [/users/:idUser/password] - Edita la contraseña de un usuario. ✅
- PUT - [/users/password/recover] - Enviar un correo con el enlace de reseteo de la contraseña. ✅
- PUT - [users/password/recover/:idUser/:recoverCode] - Cambiar la contraseña de un usuario con el código de reseteo. ✅
- DELETE - [/users/:idUser] - Eliminar un usuario. ✅

## AUTORES

# JULIAN RENDON

# ROCIO IGLESIAS

# MANU TORRES
