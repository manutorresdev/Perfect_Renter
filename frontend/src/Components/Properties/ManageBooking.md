```jsx
import { useContext, useState } from 'react';
import { button } from 'react-router-dom';

const [booking, setBooking] = useState({});

function acceptBooking() {
  alert('Reserva Aceptada');
}

function cancelBooking() {
  alert('Reserva cancelada');
}

<>
  <div className=' w-full h-full left-0 bg-gray-600 bg-opacity-40 top-0 flex flex-col items-center py-24 overflow-scroll sm:overflow-hidden'>
    <section className='contact bg-gray-200 h-auto py-5 px-5 border border-black flex flex-col gap-5  relative items-center  sm:h-4/6'>
      <h2 className='text-4xl text-principal-gris bg-principal-1-hover p-2 '>
        ¡Parece que hay un error!
      </h2>
      <h3 className='text-xl text-principal-gris '>{booking.message}</h3>
      <button
        to='/'
        className='border border-gray-400 text-center font-medium w-2/3 p-1 mr-2 sm:mr-4 text-principal-gris  bg-principal-1 hover:bg-principal-gris hover:text-white '
      >
        Cerrar
      </button>
    </section>
  </div>
  <div className='  w-full h-full left-0 top-0 flex bg-gray-600 bg-opacity-40 flex-col items-center py-24 overflow-scroll sm:overflow-hidden'>
    <section className='contact bg-gray-200 h-auto w-5/12 py-5 px-5 border border-black flex flex-col gap-5  relative items-center sm:h-4/6'>
      <h2 className='text-4xl text-principal-gris bg-principal-1-hover p-2 '>
        ¡Ya esta listo!
      </h2>
      <h3 className='text-xl text-principal-gris '></h3>
      <button
        to='/'
        className='border border-gray-400 text-center font-medium  w-2/3 p-1 mr-2 sm:mr-4 text-principal-gris  bg-principal-1 hover:bg-principal-gris hover:text-white '
      >
        Cerrar
      </button>
    </section>
  </div>;<div className='z-10 bg-gray-400 bg-opacity-75  w-full h-full left-0 top-0 flex flex-col items-center py-24 overflow-scroll sm:overflow-hidden'>
    <section className='contact bg-gray-200 h-auto w-full max-w-lg py-5 px-5 border border-black flex flex-col gap-5  relative items-center '>
      <h2 className='text-4xl text-principal-gris bg-principal-1-hover p-2 '>
        Felicidades por tu reserva
      </h2>
      <h3 className='text-xl text-principal-gris font-medium text-center'>
        Esperamos que sea el Inquilino perfecto
        <img
          className='w pt-2 sm:pt-8'
          src='https://www.cerrajeriaplacer.com/que-debo-hacer-si-me-roban-las-llaves-de-casa_img21063t1.jpg'
          alt='llaves de casa'
        />
      </h3>
      <div className='flex flex-row p-3  sm:flex-row  sm:justify-between gap-4 lg:pt-24'>
        <button
          className='border font-medium  border-gray-400 w-2/3 p-1 mr-2 sm:mr-4 text-principal-gris  bg-principal-1 hover:bg-principal-gris hover:text-white '
          onClick={acceptBooking}
        >
          ¡Aceptar reserva!
        </button>
        <button
          className='border  font-medium border-gray-400 w-2/3 p-1  ml-2 sm:ml-4 text-principal-gris  bg-red-400 hover:bg-principal-gris hover:text-white '
          onClick={cancelBooking}
        >
          ¡Cancelar reserva!
        </button>
      </div>
    </section>
  </div>
  <div className='z-10 bg-gray-400 bg-opacity-75  w-full h-full left-0 top-0 flex flex-col items-center py-20 overflow-scroll sm:overflow-hidden'>
    <section className='contact bg-gray-200 h-auto w-2/3 py-5 px-5 border border-black flex flex-col gap-5  relative items-center'>
      <h2 className='text-4xl text-principal-gris bg-principal-1-hover p-2 '>
        ¡Piensatelo Bien!
      </h2>
      <h3 className='text-xl text-principal-gris '>
        ¡Puede ser el Inquilino Perfecto!
        <img
          className='w pt-2 sm:pt-8'
          src='https://www.cerrajeriaplacer.com/que-debo-hacer-si-me-roban-las-llaves-de-casa_img21063t1.jpg'
          alt='llaves de casa'
        />
      </h3>
      <div className='flex flex-row p-3  sm:flex-row  sm:justify-between gap-4 lg:pt-24'>
        <button
          className='border font-medium  border-gray-400 w-2/3 p-1 mr-2 sm:mr-4 text-principal-gris  bg-principal-1 hover:bg-principal-gris hover:text-white '
          onClick={acceptBooking}
        >
          ¡Aceptar reserva!
        </button>
        <button
          className='border font-medium  border-gray-400 w-2/3 p-1  ml-2 sm:ml-4 text-principal-gris  bg-red-400 hover:bg-principal-gris hover:text-white '
          onClick={cancelBooking}
        >
          ¡Cancelar reserva!
        </button>
      </div>
    </section>
  </div>
</>;
```
