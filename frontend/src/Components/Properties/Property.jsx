import React from 'react';

import { Link } from 'react-router-dom';

export default function Property({ property }) {
  return (
    <>
      <div className='my-5 border border-black'>
        <Link to={`/properties/${property.idProperty}`}>
          <div>
            {property.city}
            <br />
            {property.province}
            <br />
            {property.adress}
          </div>
        </Link>
      </div>
    </>
  );
}
