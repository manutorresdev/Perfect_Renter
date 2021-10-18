import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
export default function Tenant({ user }) {
  const [Votes, setVotes] = useState(0);

  console.log(user);

  useEffect(() => {
    if (Votes === 1) {
    }
  }, [Votes]);

  return (
    <article className='flex gap-2 w-full text-xs'>
      <div className='w-48 flex flex-col relative'>
        <div className='font-bold ml-1'>{user.name}</div>
        <span className='ml-2'>{user.city}</span>
        <img
          className='w-32'
          src={
            user.avatar ? '' : require('../../Images/defProfile.png').default
          }
          alt={'perfil ' + user.name + user.lastName}
        />
        <div className='flex text-xs self-center' id='calification'>
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
      <button className='bg-button-color self-center px-2 py-1 '>
        Contactar
      </button>
    </article>
  );
}

// FaStar
// FaStarHalfAlt
// FaRegStar
