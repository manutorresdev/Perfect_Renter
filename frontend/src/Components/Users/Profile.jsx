import React, { useEffect, useState } from 'react';
import { del, get, parseJwt } from '../../Helpers/Api';
import { FaCamera, FaPencilAlt, FaTrash } from 'react-icons/fa';
import Register from '../Forms/Register';
import useProperties from '../../Helpers/Hooks/useProperties';
import Property from '../Properties/Property';
import Avatar from '../Users/avatar';

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

  console.log(User);
  console.log(AvatarFile);

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
    <>
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
      <article className='pt-20 pb-28 flex flex-col items-center justify-center'>
        <button
          className=''
          onClick={() => {
            setOverlay({ shown: true, userInfo: user, form: 'register' });
          }}
        >
          <FaPencilAlt />
        </button>
        <div>
          <section>
            <img
              className='w-40'
              src={
                User.avatar
                  ? ''
                  : require('../../Images/defProfile.png').default
              }
              alt='perfil de usuario'
            />
          </section>
          <section>
            <button
              onClick={() => {
                setOverlay({ shown: true, userInfo: user, form: 'avatar' });
              }}
            >
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
          <section>
            <div>RESERVAS</div>
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
          <button
            className='p-4 rounded-full bg-gray-Primary'
            onClick={() => {
              onSubmitDeleted();
            }}
          >
            <FaTrash className=' text-4xl text-principal-1 ' />
          </button>
        </div>
      </article>
    </>
  );
}
