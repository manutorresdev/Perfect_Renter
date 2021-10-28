import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import useProperties from '../../Helpers/Hooks/useProperties';
import Filters from './Filters';
import Property from './Property';

export default function Properties() {
  const [Overlay, setOverlay] = useState(false);
  const [Properties] = useProperties();

  const prop = Properties.filter((property) => property.idUser === 1);
  console.log(prop);

  return (
    <main className='flex pb-28 bg-gray-200 bg-opacity-20'>
      <aside
        className={`bg-gray-Primary w-min sm:bg-transparent flex-grow-0 sm:static absolute left-0 top-20 sm:top-0 mt-5 sm:mt-20`}
      >
        <FaChevronRight
          className='text-white text-xl w-10 h-full p-2 sm:hidden'
          onClick={() => {
            setOverlay(true);
          }}
        />
        <Filters setOverlay={setOverlay} Overlay={Overlay} />
      </aside>
      <section
        className={`ALQUILERES ${
          Overlay && 'overflow-hidden'
        } flex flex-col items-center  mt-20 flex-grow`}
      >
        <h1 className='text-2xl pt-10 md:pt-10'>Viviendas en alquiler</h1>
        <div className='cont-alquileres justify-center flex flex-wrap w-full gap-5'>
          {Properties.length > 0 ? (
            Properties.map((property) => (
              <Property key={property.idProperty} property={property} />
            ))
          ) : (
            <div>No hay conicidencias para su busqueda.</div>
          )}
        </div>
      </section>
    </main>
  );
}
