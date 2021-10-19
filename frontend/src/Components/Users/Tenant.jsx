import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export default function Tenant({ user, setOverlay }) {
  const [Votes] = useState(0);

  useEffect(() => {
    if (Votes === 1) {
    }
  }, [Votes]);

  return (
    <article className='flex gap-2 text-xs '>
      <div className='w-48 flex flex-col relative'>
        <Link to={`/inquilinos/${user.idUser}`} className='UserProfile'>
          <div className='font-bold ml-1'>{user.name}</div>
          <span className='ml-2'>{user.city}</span>
          <img
            className='w-32'
            src={
              user.avatar ? '' : require('../../Images/defProfile.png').default
            }
            alt={'perfil ' + user.name + user.lastName}
          />
        </Link>
        <div className='flex text-xs self-center'>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      </div>
      <p className='self-center '>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum amet
        natus eaque rem ad, minima iure.
      </p>
      <button
        className='bg-button-color self-center px-2 py-1 '
        onClick={() => {
          setOverlay({ shown: true, userInfo: user });
        }}
      >
        Contactar
      </button>
    </article>
  );
}

// FaStar
// FaStarHalfAlt
// FaRegStar
