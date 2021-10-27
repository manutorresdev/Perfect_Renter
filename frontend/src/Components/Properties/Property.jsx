import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Property({ property }) {
  return (
    <Link to={`/alquileres/${property.idProperty}`}>
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
                return <FaStar key={i} className='text-principal-1'></FaStar>;
              })}
          </span>
        </div>
      </div>
    </Link>
  );
}
