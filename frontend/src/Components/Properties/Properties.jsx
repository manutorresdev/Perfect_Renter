import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import useProperties from '../../Helpers/Hooks/useProperties';
import Filters from './Filters';
import Property from './Property';

export default function Properties() {
  const [Overlay, setOverlay] = useState(false);
  const [Properties] = useProperties();

  return (
    <div className={`${Overlay ? 'overflow-scroll' : ''} flex`}>
      <aside
        className={` bg-gray-Primary sm:bg-transparent flex-grow-0 sm:static fixed left-0 top-20 sm:top-0 self-start mt-5 sm:mt-20`}
      >
        <FaChevronRight
          className='text-white text-xl w-full h-full p-2 sm:hidden'
          onClick={() => {
            setOverlay(true);
          }}
        />
        {Overlay ? <Filters setOverlay={setOverlay} /> : ''}
      </aside>
      <section
        className={`${
          Overlay ? 'overflow-hidden' : ''
        } flex flex-col items-center mt-20 flex-grow`}
      >
        <h1 className='text-2xl'>Alquileres</h1>

        {Properties.length > 0 ? (
          Properties.map((property) => (
            <Property key={property.idProperty} property={property}>
              <div className='my-5 border border-black'>
                <div>
                  {property.city}
                  <br />
                  {property.province}
                  <br />
                  {property.adress}
                  <br />
                  {property.price}
                </div>
              </div>
            </Property>
          ))
        ) : (
          <div>No hay resultados.</div>
        )}
      </section>
    </div>
  );
}
