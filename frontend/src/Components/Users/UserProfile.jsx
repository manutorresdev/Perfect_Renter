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
  }, [match.params.idUser, Token]);

  const propiedadUsuario = properties.filter(
    (property) => property.idUser === user.idUser
  );

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  return (
    <>
      {Overlay.shown && (
        <ContactTenant setOverlay={setOverlay} userInfo={Overlay.userInfo} />
      )}
      <main className='pb-28  py-20 flex items-center flex-col justify-center'>
        <div className='perfil flex flex-col items-center justify-center'>
          <article className=' flex flex-col gap-5 items-center justic'>
            <img
              className='w-2/4 rounded-full'
              src={
                user.avatar
                  ? `http://localhost:4000/photo/${user.avatar}`
                  : require('../../Images/defProfile.png').default
              }
              alt='imagen de perfil'
            />
            <section className=''>
              <div className='bg-gray-Primary p-2 bg-opacity-25 text-3xl text-principal-1 flex justify-between'>
                <h1>
                  {user.name
                    ? `${capitalizeFirstLetter(
                        user.name
                      )} ${capitalizeFirstLetter(user.lastName)}`
                    : 'Nombre de tenant'}
                </h1>
              </div>
              <div className='flex self-center px-2 py-2'>
                {[1, 2, 3, 4, 5].map((value, i) => {
                  return (
                    <FaStar
                      key={value}
                      className={`text-principal-1 duration-200 text-2xl cursor-pointer`}
                    />
                  );
                })}
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
          <div className='flex items-center'>
            <img
              className='w-10'
              src='../../Images/flat.jpg'
              alt='imagen vivienda'
            />
            <img
              className='w-10'
              src='../../Images/flat.jpg'
              alt='imagen vivienda'
            />
          </div>
        </section>

        <section>
          <h2 className='p-5 text-2xl underline'>Alquileres</h2>
          <div className='flex flex-wrap gap-5'>
            {propiedadUsuario.length > 0 ? (
              propiedadUsuario.map((property) => (
                <Property key={property.idProperty} property={property}>
                  <div className='cont-vivienda bg-white w-auto min-w-min my-5 border border-black shadow-2xl '>
                    <img
                      className='w-auto max-w-xs'
                      src={require('../../Images/defPicture.jpg').default}
                      alt='default'
                    />
                    <div>
                      {property.city}
                      <br />
                      {property.province}
                      <br />
                      {property.adress}
                      <br />
                      {property.price}
                      <br />
                      <span className='flex'>
                        {Array(parseInt(property.votes))
                          .fill(null)
                          .map((value, i) => {
                            return (
                              <FaStar
                                key={i}
                                className='text-principal-1'
                              ></FaStar>
                            );
                          })}
                      </span>
                    </div>
                  </div>
                </Property>
              ))
            ) : (
              <div>No hay ningún inmueble</div>
            )}
          </div>
        </section>

        <section>
          <h2 className='p-5 text-2xl underline'>Opiniones</h2>
          <div className='flex flex-col items-center justify-center'>
            <article>
              <img
                className='w-10 py-20 float-left '
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
                className='w-10 py-20 float-left '
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
          // 'btn-submit  text-xl bg-none p- border-yellow-400 border-2 h-2/4 hover:bg-principal-1 hover:border-white hover:text-gray-600 duration-300'
          className=' relative bottom-10 left-16 place-self-center select-none text-center border border-gray-400 text-white rounded-full p-5 bg-gray-600 hover:bg-gray-200 hover:text-gray-600  transform ease-in duration-200 cursor-pointer '
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
