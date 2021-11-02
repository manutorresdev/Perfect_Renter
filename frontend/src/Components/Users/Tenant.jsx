import React from 'react';
import { FaStar } from 'react-icons/fa';

import { Link } from 'react-router-dom';

export default function Tenant({ user, setOverlay, relation }) {
  console.log('\x1b[43m########\x1b[30m', user);
  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  return (
    <article className='flex flex-col gap-2 text-xs items-center p-4 '>
      <Link className='self-start' to={`/inquilinos/${user.idUser}`}>
        <div className='font-bold'>{capitalizeFirstLetter(user.name)}</div>
      </Link>
      <div className='flex items-center font-medium'>
        <div className='flex flex-col relative items-center'>
          <Link to={`/inquilinos/${user.idUser}`}>
            <span className=''>{user.city}</span>
            <img
              className='w-32'
              src={
                user.avatar
                  ? ''
                  : require('../../Images/defProfile.png').default
              }
              alt={'perfil ' + user.name + user.lastName}
            />
            <div
              className='flex text-xs self-center text-principal-1 justify-center'
              id='calification'
            >
              {Array(parseInt(user.votes))
                .fill(null)
                .map((value, i) => {
                  return <FaStar key={i} className='text-principal-1'></FaStar>;
                })}
            </div>
          </Link>
        </div>
        <p className='self-center '>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum amet
          natus eaque rem ad, minima iure.
        </p>
        <div className='flex flex-col gap-1'>
          <button
            className='bg-principal-1 self-center px-2 py-1 '
            onClick={() => {
              setOverlay({ shown: true, info: user, form: 'contact' });
            }}
          >
            Contactar
          </button>
          {relation.length > 0 && (
            <button
              className='bg-principal-1 self-center px-2 py-1 '
              onClick={() => {
                setOverlay({
                  shown: true,
                  info: { ...user, relation: relation },
                  form: 'vote',
                });
              }}
            >
              Valorar
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
