import React, { useEffect, useState } from 'react';
import { get } from '../../Helpers/Api';
import Property from './Property';

export default function Properties() {
  const [Properties, setProperties] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    get(
      'http://localhost:4000/properties',
      (data) => {
        console.log('data', data);
        setTimeout(() => {
          setProperties(data.properties);
          setLoaded(true);
        }, 500);
      },
      (error) => console.log(error)
    );
  }, []);

  return (
    <>
      <section className='flex flex-col items-center mt-14'>
        <h1 className='text-2xl'>Alquileres</h1>
        {Loaded ? (
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
