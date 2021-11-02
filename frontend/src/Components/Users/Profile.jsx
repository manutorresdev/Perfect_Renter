import React, { useEffect, useState } from 'react';
import { del, get, parseJwt } from '../../Helpers/Api';
import {
  FaCamera,
  FaEnvelope,
  FaPencilAlt,
  FaPlusSquare,
  FaTrash,
} from 'react-icons/fa';
import Register from '../Forms/Register';
import useProperties from '../../Helpers/Hooks/useProperties';
import Property from '../Properties/Property';
import Avatar from '../Users/avatar';
import NewProperty from '../Properties/NewProperty';
import { Link } from 'react-router-dom';


export default function Profile({ token, setToken }) {
  const [User, setUser] = useState({});

  const [Overlay, setOverlay] = useState({
    shown: false,
    info: {},
    form: '',
  });
  const [Bookings, setBookings] = useState([]);
  const [ShownBookings, setShownBookings] = useState('proximas');
  const [properties] = useProperties([]);
  const [AvatarFile, setAvatarFile] = useState('');



  useEffect(() => {
    get(
      `http://localhost:4000/users/${User.idUser}`,
      (data) => {
        setUser(data.userInfo);
      },
      (error) => console.log(error),
      token
    );
    if (User) {
      get(
        `http://localhost:4000/photo/${User.avatar}`,
        (data) => {
          setAvatarFile(data.photo);
          console.log(data);
        },
        (error) => console.log(error),
        token
      );
     get(
      `http://192.168.5.103:4000/users/${User.idUser}/bookings`,
      (data) => {
        setBookings(data.bookings);
      },
      (error) => {
        console.log(error);
      };
      token
     );
   }
  }, [token, user.idUser]);

  function onSubmitDeleted(body, e) {
    if (window.confirm('¿Desea eliminar la cuenta?')) {
      del(
        `http://localhost:4000/users/${user.idUser}`,
        body,
        (data) => {
          setToken('');
          alert(data.message);
          window.location.reload();
        },
        (error) => console.log(error),
        token
      );
    }
  }

  const propiedadUsuario = properties.filter(
    (property) => property.idUser === user.idUser
  );

  return (
    <article className='pt-20 pb-28 flex flex-col justify-center w-screen'>
    {Overlay.form === 'register' && (
        <Register
          setOverlay={setOverlay}
          userInfo={Overlay.info}
          usuario={User}
          Token={token}
        />
      )}
      {Overlay.form === 'avatar' && (
        <Avatar
          setOverlay={setOverlay}
          avatar={User.avatar}
          usuario={User}
          Token={token}
        />
      )}
      {Overlay.form === 'property' && (
        <NewProperty setOverlay={setOverlay} usuario={User} Token={token} />
      )}

      <div className='bg-gray-Primary p-2 bg-opacity-25 text-lg text-principal-1 '>
        SOBRE TI
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 p-10 gap-32 '>
        <section className=' md:ml-36'>
          <img
            className='max-w-sm rounded-full py-4 '
            src={
              User.avatar
                ? `http://localhost:4000/photo/${User.avatar}`
                : require('../../Images/defProfile.png').default
            }
            alt='perfil de usuario'
          />
          <button
            className='left-44  '
            onClick={() => {
              setOverlay({ shown: true, userInfo: user, form: 'avatar' });
            }}
          >
            <FaCamera className='text-4xl' />
          </button>
        </section>
        <section className='w-auto'>
          <div className='text-gray-Primary px-2 text-2xl bg-principal-1 font-normal flex flex-col-2 justify-between'>
            <h1>
              {User.name} {User.lastName}
            </h1>
            <button
              className='text-2xl '
              onClick={() => {
                setOverlay({ shown: true, userInfo: user, form: 'register' });
              }}
            >
              <FaPencilAlt />
            </button>
          </div>
          <br />
          <ul className='bg-gray-200 grid grid-cols-1 gap-4'>
            <li className='sm:bg-gray-400 text-lg'>Email</li>
            {User.email}
            <li className='sm:bg-gray-400 text-lg'>Ciudad</li>
            {User.ciudad}
            <li className='sm:bg-gray-400 text-lg'>Teléfono</li>
            {User.tel}
            <li className='sm:bg-gray-400 text-lg'>Fecha de nacimiento</li>
            {new Date(User.birthDate).toLocaleDateString('es-ES')}

            <li className='sm:bg-gray-400 text-lg'>Biografía:</li>
            {User.bio}
          </ul>
        </section>
      </div>
      <div>
        <section>
          <div className='bg-gray-Primary p-2 bg-opacity-25 text-lg text-principal-1 '>
            ALQUILERES
          </div>
          <div className='contenedor alquileres flex flex-wrap gap-5'>
            {propiedadUsuario.length > 0 ? (
              propiedadUsuario.map((property) => (
                <Property key={property.idProperty} property={property} />
              ))
            ) : (
              <div>No hay ningún inmueble</div>
            )}
            <button className='text-gray-400'>
              Añade un inmueble <br />
              <FaPlusSquare
                className='text-4xl '
                onClick={() => {
                  setOverlay({
                    shown: true,
                    userInfo: user,
                    form: 'property',
                  });
                }}
              />
            </button>
          </div>
        </section>
        <section>
          <div className='bg-gray-Primary p-2 bg-opacity-25 text-lg text-principal-1'>
            {' '}
            RESERVAS
          </div>
          <div className='bookings-cont'>
            {Bookings &&
              Bookings.map((booking) => {
                console.log('\x1b[43m########\x1b[30m', booking);
                return (
                  <h1>{booking.bookingCode}</h1>
                  // <Property
                  //   key={booking.bookingCode}
                  //   property={{
                  //     idProperty: booking.idProperty,
                  //     mts: booking.mts,
                  //     price: booking.price,
                  //     province: booking.province,
                  //     rooms: booking.rooms,
                  //     votes: booking.votes,
                  //     type: booking.type,
                  //   }}
                  // />
                );
              })}
          </div>
        </section>
      </div>

      <div className='flex justify-end'>
        <button
          className='p-4 rounded-full  text-principal-1 bg-gray-Primary flex flex-row items-center justify-around'
          onClick={() => {
            onSubmitDeleted();
          }}
        >
          <FaTrash className='  text-principal-1 ' /> Eliminar cuenta
        </button>
      </div>
    </article>
      <button
        className=''
        onClick={() => {
          setOverlay({ shown: true, userInfo: user });
        }}
      >
        <FaPencilAlt />
      </button>

      <section>
        <img
          className='w-40'
          src={
            User.avatar ? '' : require('../../Images/defProfile.png').default
          }
          alt='perfil de usuario'
        />
      </section>
      <section>
        <button>
          <FaCamera />
        </button>
        <ul>
          <li className='font-bold'>Nombre:</li>
          {User.name}
          <li className='font-bold'>Apellidos:</li>
          {User.lastName}
          <li className='font-bold'>Email:</li>
          {User.email}
          <li className='font-bold'>Ciudad:</li>
          {User.ciudad}
          <li className='font-bold'>Teléfono:</li>
          {User.tel}
          <li className='font-bold'>Bio:</li>
          {User.bio}
          <li className='font-bold'>Fecha de nacimiento:</li>0
          {new Date(User.birthDate).toLocaleDateString('es-ES')}
        </ul>
      </section>
      <section className='font-bold'>
        <div>ALQUILERES</div>
        <div className='contenedor alquileres flex flex-wrap gap-5'>
          {propiedadUsuario.length > 0 ? (
            propiedadUsuario.map((property) => (
              <Property key={property.idProperty} property={property} />
            ))
          ) : (
            <div>No hay ningún inmueble</div>
          )}
        </div>
      </section>
      <section className='reservas min-h-'>
        <div className='w-full bg-principal-1 text-principal-gris font-medium text-3xl pl-5'>
          RESERVAS
        </div>
        <div className='flex gap-5 justify-around bg-gray-Primary text-principal-1 font-medium'>
          <button
            className='py-2 px-10 border-opacity-5 hover:text-white '
            onClick={() => {
              !(ShownBookings === 'proximas') && setShownBookings('proximas');
            }}
          >
            Próximas
          </button>
          <button
            onClick={() => {
              !(ShownBookings === 'finalizada') &&
                setShownBookings('finalizada');
            }}
            className='py-2 px-10 border-opacity-5 hover:text-white '
          >
            Finalizadas
          </button>
        </div>
        <BookingsComp Bookings={Bookings} ShownBookings={ShownBookings} />
      </section>
      <button
        className='p-4 rounded-full bg-gray-Primary'
        onClick={() => {
          onSubmitDeleted();
        }}
      >
        <FaTrash className=' text-4xl text-principal-1 ' />
      </button>
    </article>
  );
}

function BookingsComp({ Bookings, ShownBookings }) {
  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  return (
    <div className='bookings-cont p-5 flex flex-col sm:flex-row sm:flex-wrap gap-5'>
      {Bookings &&
        Bookings.filter((booking) => {
          if (ShownBookings === 'proximas') {
            return booking.state !== 'finalizada';
          } else {
            return booking.state === 'finalizada';
          }
        }).map((booking) => {
          return (
            <article
              key={booking.idBooking}
              className={`animate-fadeIn border border-black h-1/3 flex md:w-4/12 md:max-w-md sm:w-7/12 justify-between shadow-2xl`}
            >
              <div className='flex flex-col flex-grow w-5/12'>
                <h2 className='bg-gray-Primary text-principal-1 text-lg w-full'>
                  {capitalizeFirstLetter(booking.type)} en {booking.city}
                </h2>
                <p>
                  {booking.address}, {booking.number}
                </p>
                <p>Precio: {Number(booking.price)}€</p>
                <p>
                  Entrada:{' '}
                  {new Date(booking.startBookingDate).toLocaleDateString()}
                </p>
                <p>
                  Salida:{' '}
                  {new Date(booking.endBookingDate).toLocaleDateString()}
                </p>
              </div>
              <div className='border-r-2 border-opacity-75 border-gray-700'></div>
              <Link
                to={`/alquileres/${booking.idProperty}`}
                className='w-4/12 relative flex flex-col justify-between'
              >
                <img
                  className='object-cover flex-grow'
                  src={require('../../Images/defPicture.jpg').default}
                  alt=''
                />
                <div className='flex justify-end bg-gray-Primary w-full'>
                  {booking.votes > 0 ? (
                    Array(parseInt(booking.votes))
                      .fill(null)
                      .map((value, i) => {
                        return (
                          <FaStar key={i} className='text-principal-1'></FaStar>
                        );
                      })
                  ) : (
                    <div className='h-4'></div>
                  )}
                </div>
              </Link>
            </article>
          );
        })}
    </div>
  );
}
