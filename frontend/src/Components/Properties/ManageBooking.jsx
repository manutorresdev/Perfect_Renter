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
      `http://192.168.5.103:4000/properties/${match.params.bookingCode}/accept`,
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
      `http://192.168.5.103:4000/properties/${match.params.bookingCode}/cancel`,
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
        <div className='fixed w-full h-full left-0 bg-gray-600 bg-opacity-40 top-0 flex flex-col items-center py-24 overflow-scroll sm:overflow-hidden'>
          <section className='contact bg-gray-200 h-auto py-5 px-5 border border-black flex flex-col gap-5  relative items-center  sm:h-4/6'>
            <h2 className='text-4xl text-principal-gris bg-principal-1-hover p-2 '>
              ¡Parece que hay un error!
            </h2>
            <h3 className='text-xl text-principal-gris '>{booking.message}</h3>
            <Link
              to='/'
              className='border border-gray-400 text-center font-medium w-2/3 p-1 mr-2 sm:mr-4 text-principal-gris  bg-principal-1 hover:bg-principal-gris hover:text-white '
            >
              Cerrar
            </Link>
          </section>
        </div>
      );
    }
    if (booking.status === 'ok') {
      return (
        <div className=' fixed w-full h-full left-0 top-0 flex bg-gray-600 bg-opacity-40 flex-col items-center py-24 overflow-scroll sm:overflow-hidden'>
          <section className='contact bg-gray-200 h-auto w-56 py-5 px-5 border border-black flex flex-col gap-5  relative items-center sm:h-4/6'>
            <h2 className='text-4xl text-principal-gris bg-principal-1-hover p-2 '>
              ¡Ya esta listo!
            </h2>
            <h3 className='text-xl text-principal-gris '>
              {/* {booking.message}  */}
            </h3>
            <Link
              to='/'
              className='border border-gray-400 text-center font-medium  w-2/3 p-1 mr-2 sm:mr-4 text-principal-gris  bg-principal-1 hover:bg-principal-gris hover:text-white '
            >
              Cerrar
            </Link>
          </section>
        </div>
      );
    }
    if (match.path.includes('accept')) {
      return (
        <div className='z-10 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-24 overflow-scroll sm:overflow-hidden'>
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
      );
    } else {
      return (
        <div className='z-10 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-20 overflow-scroll sm:overflow-hidden'>
          <section className='contact bg-gray-200 h-auto w-56 py-5 px-5 border border-black flex flex-col gap-5  relative items-center'>
            <h2 className='text-4xl text-principal-gris bg-principal-1-hover p-2 '>
              Piensatelo Bien!!!
            </h2>
            <h3 className='text-xl text-principal-gris '>
              Puede ser el Inquilino Perfecto!!!
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
      );
    }
  } else {
    /**Si no esta validado mostramos el componente login y al entrar vuelve a la misma url de accept o cancel */
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
