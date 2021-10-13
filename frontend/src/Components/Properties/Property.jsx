import React from 'react';

export default function Property({ property }) {
  return (
    <>
      <div className='my-5 border border-black'>
        <div>
          {property.city}
          <br />
          {property.province}
          <br />
          {property.adress}
        </div>
      </div>
    </>
  );
}
