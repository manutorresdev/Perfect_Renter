import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

import { Link } from 'react-router-dom';

export default function Tenant({ user, setOverlay }) {
  const [Votes] = useState(0);

  useEffect(() => {
    if (Votes === 1) {
    }
  }, [Votes]);

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  return (
    <article className='flex gap-2 text-xs items-center'>
      <div className='flex flex-col relative items-center'>
        <Link to={`/inquilinos/${user.idUser}`}>
          <div className='font-bold'>{capitalizeFirstLetter(user.name)}</div>
          <span className=''>{user.city}</span>
          <span>{user.idUser}</span>
          <img
            className='w-32 rounded-full'
            src={
              user.avatar
                ? `http://localhost:4000/photo/${user.avatar}`
                : require('../../Images/defProfile.png').default
            }
            alt={'perfil ' + user.name + user.lastName}
          />
          <div
            className='flex text-xs self-center text-principal-1 justify-center'
            id='calification'
          >
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
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
            setOverlay({ shown: true, userInfo: user, form: 'contact' });
          }}
        >
          Contactar
        </button>
        <button
          className='bg-principal-1 self-center px-2 py-1 '
          onClick={() => {
            setOverlay({ shown: true, userInfo: user, form: 'vote' });
          }}
        >
          Valorar
        </button>
      </div>
    </article>
  );
}

// FaStar
// FaStarHalfAlt
// FaRegStar
