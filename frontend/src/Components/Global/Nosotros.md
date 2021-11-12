```jsx



<div
        className='header  bg-center bg-cover sm:h-60vh  sm:max-w-full grid grid-cols-10 grid-rows-4'
        style={{
          backgroundImage:
            "linear-gradient(rgba(16, 16, 16, 0.3),rgba(16, 16, 16, 0.9)),url('portada-nosotros.jpg')",
        }}
      >
        <div className='col-start-5 row-start-3 col-span-full text-principal-1'>
          <h1 className='text-4xl '>Perfect Renter</h1>
          <h3>El lugar para encontrar tu hogar</h3>
        </div>
      </div>
      <div className='separador bg-principal-1 h-9'></div>
      <div className='contenedor flex flex-wrap md:flex-nowrap text-principal-gris p-10 gap-5'>
        <div className='sm:w-full p-3  shadow-md bg-principal-1'>
          <h1 className='text-xl font-bold'>¿Qué es perfect renter?</h1>
          <p className='pt-1 text-justify'>
            Perfect renter nace de la creencia de la información colaborativa y
            la honestidad de las personas para compartir sus experiencias como
            inquilinos o caseros. Siempre con respeto y con la única intención
            de ayudar a los demás usuarios a encontrar su inquilino o casero
            perfecto.
          </p>
        </div>
        <div className=' sm:w-full p-3 shadow-md bg-principal-1'>
          <h1 className='text-xl font-bold'>¿Cómo funciona?</h1>
          <p className='pt-1 text-justify'>
            Nuestra App está diseñada para ser un canal de comunicación entre
            los caseros, los inquilinos y sus propiedades. Así como una base de
            datos consultable donde podrás saber los pros, los contras y los
            detalles a tener en cuenta tanto de las propiedades como de los
            usuarios que forman parte de nuestra red.
          </p>
        </div>
      </div>
      <div className='separador  bg-gray-Primary h-0.5 shadow '></div>
      <div className='contenedor-equipo pb-52 flex flex-col items-center gap-y-9'>
        <h1 className='py-4 font-bold text-3xl text-principal-1'>
          Nuestro equipo
        </h1>
        <div className='contenedor_integrantes flex  gap-y-9 items-center justify-around sm:flex-row flex-wrap w-full'>
          <div className=' relative flex-col  justify-center  text-center '>
            <img
              src='manu.jpg'
              alt=''
              className='w-48 h-48 rounded-full object-cover content-self-center shadow-perfil '
            />

            <h3 className='font-bold text-principal-1 text-2xl absolute bottom-7 bg-gray-Primary'>
              Manu Torres
            </h3>
            <p className='absolute bottom-1 bg-principal-1'>Jefe de Equipo.</p>
          </div>
          <div className='relative flex-col  justify-center  text-center  '>
            <img
              src='rocio.jpg'
              alt=''
              className='w-48 h-48 rounded-full object-cover content-self-center shadow-perfil'
            />
            <h3 className='text-principal-1 text-2xl absolute bottom-7 bg-gray-Primary'>
              Rocío Iglesias
            </h3>
            <p className='absolute bottom-1 bg-principal-1'>Desarrollo.</p>
          </div>
          <div className='relative flex-col  justify-center  text-center  '>
            <img
              src='julian.jpg'
              alt=''
              className='w-48 h-48 rounded-full object-cover content-self-center shadow-perfil '
            />
            <h3 className='text-principal-1 text-2xl absolute bottom-7 bg-gray-Primary'>
              Julián Rendón
            </h3>
            <p className='absolute bottom-1 bg-principal-1'>
              Marketing Digital.
            </p>
          </div>
        </div>
      </div>

```
