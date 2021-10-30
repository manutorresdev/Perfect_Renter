import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../../Helpers/Api';
import { TokenContext } from '../../Helpers/Hooks/TokenProvider';
import Login from '../Forms/Login';

export default function ManageBokking({ match }) {
  const [Token] = useContext(TokenContext);
  const [booking, setBooking] = useState({});

  function acceptBooking() {
    get(
      `http://localhost:4000/properties/${match.params.bookingCode}/accept`,
      (data) => {
        alert(data.message);
        setBooking(data);
      },
      (error) => {
        console.log(error);
        setBooking(error);
      },
      Token
    );
  }

  function cancelBooking() {
    get(
      `http://localhost:4000/properties/${match.params.bookingCode}/cancel`,
      (data) => {
        // alert(data.message);
        setBooking(data);
      },
      (error) => {
        // console.log(error);
        setBooking(error);
      },
      Token
    );
  }

  if (Token) {
    if (booking.status === 'error') {
      return (
        <div className='fixed w-full h-full left-0 top-0 flex flex-col items-center py-20 overflow-scroll sm:overflow-hidden'>
          <section className='contact py-5 px-5 border border-black flex flex-col gap-5  bg-white relative items-center'>
            <h2>Parece que hay un error!!!</h2>
            <h2>{booking.message}</h2>
            <Link
              to='/'
              className='border-2 py-1 px-3 bg-yellow-400 hover:bg-gray-500 hover:text-white'
            >
              Cerrar
            </Link>
          </section>
        </div>
      );
    }
    if (booking.status === 'ok') {
      return (
        <div className='fixed w-full h-full left-0 top-0 flex flex-col items-center py-20 overflow-scroll sm:overflow-hidden'>
          <section className='contact py-5 px-5 border border-black flex flex-col gap-5  bg-white relative items-center'>
            <h2>Ya esta listo!!!</h2>
            <h2>{booking.message}</h2>
            <Link
              to='/'
              className='border-2 py-1 px-3 bg-yellow-400 hover:bg-gray-500 hover:text-white'
            >
              Cerrar
            </Link>
          </section>
        </div>
      );
    }
    if (match.path.includes('accept')) {
      return (
        <div className='z-10 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-20 overflow-scroll sm:overflow-hidden'>
          <section className='contact py-5 px-5 border border-black flex flex-col gap-5  bg-white relative items-center'>
            <h2>Felicidades por tu reserva</h2>
            <h2>Esperamos que sea el Inquilino perfecto</h2>
            <button
              className='border-2 py-1 px-3 bg-yellow-400 hover:bg-gray-500 hover:text-white w-72'
              onClick={acceptBooking}
            >
              Aceptar reserva!!!
            </button>
            <button
              className='border-2 py-1 px-3 bg-red-400 hover:bg-gray-500 hover:text-white w-72'
              onClick={cancelBooking}
            >
              Cancelar reserva!!!
            </button>
          </section>
        </div>
      );
    } else {
      return (
        <div className='z-10 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-20 overflow-scroll sm:overflow-hidden'>
          <section className='contact py-5 px-5 border border-black flex flex-col gap-5  bg-white relative items-center'>
            <h2>Piensatelo Bien!!!</h2>
            <h2>Puede ser el Inquilino Perfecto!!!</h2>
            <button
              className='border-2 py-1 px-3 bg-red-400 hover:bg-gray-500 hover:text-white w-72'
              onClick={cancelBooking}
            >
              Cancelar reserva!!!
            </button>
            <button
              className='border-2 py-1 px-3 bg-yellow-400 hover:bg-gray-500 hover:text-white w-72'
              onClick={acceptBooking}
            >
              Me lo pense mejor. Reservar!!!
            </button>
          </section>
        </div>
      );
    }
  } else {
    /**Si no est validado mostramos el componente login y al entrar vuelve a la misma url de accept o cancel */
    return (
      <>
        <div className='z-10 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-20 overflow-scroll sm:overflow-hidden'>
          <section className='contact pt-2 border border-black flex flex-col gap-5  bg-white relative'>
            <h2>Debes iniciar sessión para administrar tu reserva...</h2>
            <Login />
          </section>
        </div>
      </>
    );
  }
}
