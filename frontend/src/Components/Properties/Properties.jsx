import React from 'react';
import useProperties from '../../Helpers/Hooks/useProperties';
import Property from './Property';

export default function Properties() {
  const [Properties] = useProperties();

  return (
    <>
      <section className='flex flex-col items-center mt-14'>
        <h1 className='text-2xl'>Alquileres</h1>
        {Properties.length>0 ? (
          Properties.map((property) => (
            <Property key={property.idProperty} property={property}>
              <div className='my-5 border border-black'>
                <div>
                  {property.city}
                  <br />
                  {property.province}
                  <br />
                  {property.adress}
                </div>
              </div>
            </Property>
          ))
        ) : (
          <div>Cargando alquileres...</div>
        )}
      </section>
    </>
  );
}
