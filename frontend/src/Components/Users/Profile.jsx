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

export default function Profile({ token, setToken }) {
  const [User, setUser] = useState({});

  const [Overlay, setOverlay] = useState({
    shown: false,
    userInfo: {},
    form: '',
  });

  const [Bookings, setBookings] = useState([]);

  const [properties] = useProperties([]);
  const [AvatarFile, setAvatarFile] = useState('');

  const user = parseJwt(token);

  useEffect(() => {
    console.log('\x1b[43m########\x1b[30m', user.idUser);
    get(
      `http://localhost:4000/users/${user.idUser}`,
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
    }
  }, [token, user.idUser, User.avatar]);

  console.log(User.avatar);

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

  /**
   * Es necesario hacer un llamado a un nuevo middleware para listar
   * las reservas de un usuario y ponerlas en su perfil
   */

  return (
    <article className=' pt-24 pb-32 px-10 grid grid-cols-1  '>
      {Overlay.form === 'register' && (
        <Register
          setOverlay={setOverlay}
          userInfo={Overlay.userInfo}
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
  );
}
