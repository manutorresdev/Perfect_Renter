import React, { useEffect, useState } from 'react';
import { del, get, parseJwt } from '../../Helpers/Api';
import {
  FaCamera,
  FaPencilAlt,
  FaPlusSquare,
  FaStar,
  FaTrash,
} from 'react-icons/fa';
import Register from '../Forms/Register';
import useProperties from '../../Helpers/Hooks/useProperties';
import Property from '../Properties/Property';
import Avatar from '../Users/avatar';
import NewProperty from '../Properties/NewProperty';
import { Link } from 'react-router-dom';
import Properties from '../Properties/Properties';

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

  useEffect(() => {
    get(
      `http://localhost:4000/users/${parseJwt(token).idUser}`,
      (data) => {
        setUser(data.userInfo);
      },
      (error) => console.log(error),
      token
    );
    if (User.idUser) {
      get(
        `http://localhost:4000/users/${User.idUser}/bookings`,
        (data) => {
          setBookings(data.bookings);
        },
        (error) => {
          console.log(error);
        },
        token
      );
    }
  }, [token, User.avatar, User.idUser]);

  function onSubmitDeleted(body, e) {
    if (window.confirm('¿Desea eliminar la cuenta?')) {
      del(
        `http://localhost:4000/users/${User.idUser}`,
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
    (property) => property.idUser === User.idUser
  );

  console.log(propiedadUsuario);
  return (
    <article className='pt-24 pb-32 flex flex-col justify-center'>
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
        <NewProperty
          setOverlay={setOverlay}
          Overlay={Overlay}
          idProperty={propiedadUsuario}
          Token={token}
        />
      )}

      <div className='bg-principal-1 text-principal-gris font-medium text-3xl pl-5 bg-opacity-25  '>
        SOBRE TI
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 p-10 gap-10 sm:gap-32 '>
        <section className='md:ml-36'>
          <img
            className='sm:max-w-sm rounded-full py-4 '
            src={
              User.avatar
                ? `http://localhost:4000/photo/${User.avatar}`
                : require('../../Images/defProfile.png').default
            }
            alt='perfil de usuario'
          />
          <button
            className=''
            onClick={() => {
              setOverlay({ shown: true, userInfo: User, form: 'avatar' });
            }}
          >
            <FaCamera className='text-4xl' />
          </button>
        </section>
        <section className='w-auto'>
          <div className=' px-4 text-2xl bg-gray-Primary text-principal-1  font-normal flex flex-col-2 justify-between'>
            <h1>
              {User.name} {User.lastName}
            </h1>
            <button
              className='text-2xl '
              onClick={() => {
                setOverlay({ shown: true, userInfo: User, form: 'register' });
              }}
            >
              <FaPencilAlt />
            </button>
          </div>
          <br />
          <ul className='bg-gray-200 grid grid-cols-1 gap-4'>
            <li className='bg-gray-400 text-lg px-2'>Email</li>
            <span className='pl-2'>{User.email}</span>
            <li className='bg-gray-400 text-lg px-2'>Ciudad</li>
            <span className='pl-2'>{User.ciudad}</span>
            <li className='bg-gray-400 text-lg px-2'>Teléfono</li>
            <span className='pl-2'>{User.tel}</span>
            <li className='bg-gray-400 text-lg px-2'>Fecha de nacimiento</li>
            <span className='pl-2'>
              {new Date(User.birthDate).toLocaleDateString('es-ES')}
            </span>
            <li className='bg-gray-400 text-lg pl-2'>Biografía</li>
            <span className='py-2'>{User.bio}</span>
          </ul>
        </section>
      </div>
      <div>
        <section>
          <div className='bg-principal-1 text-principal-gris font-medium text-3xl pl-5 bg-opacity-25 '>
            ALQUILERES
          </div>
          <div className='contenedor alquileres flex flex-wrap gap-5'>
            {propiedadUsuario.length > 0 ? (
              propiedadUsuario.map((property) => (
                <Property
                  key={property.idProperty}
                  property={property}
                  token={token}
                />
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
                    userInfo: User,
                    form: 'property',
                  });
                }}
              />
            </button>
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
      </div>
      <div className='flex justify-end'>
        <button
          className='py-4 px-2 rounded-full text-principal-1 bg-gray-Primary flex flex-row items-center justify-around'
          onClick={() => {
            onSubmitDeleted();
          }}
        >
          <FaTrash className='text-principal-1' /> Eliminar cuenta
        </button>
      </div>
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
