import React, { useContext, useEffect, useState } from 'react';
import { get } from '../../Helpers/Api';
import { FaStar } from 'react-icons/fa';
import { TokenContext } from '../../Helpers/Hooks/TokenProvider';
import ContactTenant from '../Forms/ContactTenant';
import useProperties from '../../Helpers/Hooks/useProperties';
import Property from '../Properties/Property';

export default function UserProfile({ match, property }) {
  const [Token] = useContext(TokenContext);
  const [user, setUser] = useState({});
  const [Overlay, setOverlay] = useState({ shown: false, userInfo: {} });
  const [properties] = useProperties([]);

  useEffect(() => {
    get(
      `http://localhost:4000/users/${match.params.idUser}`,
      (data) => {
        setUser(data.userInfo);
      },
      (error) => {
        console.log(error);
      },
      Token
    );
  }, [match.params.idUser,Token]);

  const propiedadUsuario = properties.filter(
    (property) => property.idUser === user.idUser
  );

  return (
    <>
      {Overlay.shown ? (
        <ContactTenant setOverlay={setOverlay} userInfo={Overlay.userInfo} />
      ) : (
        ''
      )}
      <main>
        <div className='perfil flex flex-col items-center justify-center'>
          <article>
            <img
              className='w-80 py-20 float-right '
              src={require('../../Images/defProfile.png').default}
              alt='imagen de perfil'
            />
            <section className='p-40'>
              <h1>
                {user.name
                  ? user.name + ' ' + user.lastName
                  : 'Nombre de tenant'}
              </h1>
              <div className='flex text-xs self-center'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className=''>
                {user.bio} Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Repellendus obcaecati dignissimos ratione labore rem
                nesciunt architecto illo a quos, iure quibusdam aliquid quo
                impedit dolorum quam assumenda minus beatae voluptate!
              </p>
            </section>
          </article>
        </div>
        <section>
          <h2 className='p-5 text-2xl underline'>Historial viviendas</h2>
          <div className='flex items-center  space-x-5 max-w-sm'>
            <img src='../../Images/flat.jpg' alt='imagen vivienda' />
            <img src='../../Images/flat.jpg' alt='imagen vivienda' />
          </div>
        </section>
        <section className='font-bold'>
          ALQUILERES
          {propiedadUsuario.length > 0 ? (
            propiedadUsuario.map((property) => (
              <Property
                key={property.idProperty}
                property={property}
              ></Property>
            ))
          ) : (
            <div>No hay ningún inmueble</div>
          )}
        </section>

        <section>
          <h2 className='p-5 text-2xl underline'>Opiniones</h2>
          <div className='flex items-center justify-center'>
            <article>
              <img
                className='w-40 py-20 float-left '
                src={require('../../Images/defProfile.png').default}
                alt='imagen de perfil'
              />
              <section className='p-20'>
                <h1 className='font-bold'>Manuel</h1>

                <p className=''>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellendus obcaecati dignissimos ratione labore rem nesciunt
                  architecto illo a quos, iure quibusdam aliquid quo impedit
                  dolorum quam assumenda minus beatae voluptate!
                </p>
                <div className='flex text-xs self-center'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </section>
            </article>
            <article>
              <img
                className='w-40 py-20 float-left '
                src={require('../../Images/defProfile.png').default}
                alt='imagen de perfil'
              />
              <section className='p-20'>
                <h1 className='font-bold'>Julián</h1>

                <p className=''>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellendus obcaecati dignissimos ratione labore rem nesciunt
                  architecto illo a quos, iure quibusdam aliquid quo impedit
                  dolorum quam assumenda minus beatae voluptate!
                </p>
                <div className='flex text-xs self-center'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </section>
            </article>
          </div>
        </section>

        <button
          className=' relative bottom-10 left-16 place-self-center select-none text-center border border-gray-400 text-black rounded-full p-5 bg-gray-600 hover:bg-gray-200 hover:text-gray-600  transform ease-in duration-200 cursor-pointer '
          onClick={() => {
            setOverlay({ shown: true, userInfo: user });
          }}
        >
          Contactar
        </button>
      </main>
    </>
  );
}
