import React, { useState } from 'react';
import useProperties from '../../Helpers/Hooks/useProperties';
import Filters from './Filters';
import Property from './Property';

export default function Properties() {
  const [Overlay, setOverlay] = useState({ show: false });
  const [Properties] = useProperties();

  return (
    <main className='flex pb-28  bg-gray-Primary'>
      <aside
        className={`bg-gray-Primary w-min sm:bg-transparent flex-grow-0 sm:static fixed right-0 top-20 z-20 sm:top-0 mt-5 sm:mt-20`}
      >
        <button
          className='text-white text-xl min-w-min h-full p-2 sm:hidden'
          onClick={() => {
            setOverlay({ show: true });
          }}
        >
          Filtros
        </button>
        <Filters setOverlay={setOverlay} Overlay={Overlay} />
      </aside>
      <section
        className={`ALQUILERES ${
          Overlay.show && 'overflow-hidden'
        } flex flex-col items-center mt-20 flex-grow`}
      >
        <h1 className='text-4xl text-principal-gris shadow-lg pt-10 md:pt-10 bg-principal-1 w-full p-10 font-semibold'>
          Viviendas en alquiler
        </h1>
        <div className='cont-alquileres  justify-center flex flex-wrap w-full gap-5'>
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
