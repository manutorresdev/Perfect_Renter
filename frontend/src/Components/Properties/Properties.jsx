import React, { useEffect, useState } from 'react';
import { get } from '../../Helpers/Api';
import useProperties from '../../Helpers/Hooks/useProperties';
import Filters from './Filters';
import Property from './Property';

export default function Properties() {
  const [Overlay, setOverlay] = useState({ show: false });
  const [Properties] = useProperties();
  const [bestRatedProperties, setBestRatedProperties] = useState([]);

  useEffect(() => {
    get(
      `http://192.168.5.103:4000/properties?orden=valoraciones&direccion=DESC`,
      (data) => {
        if (data.message !== 'No hay conicidencias para su busqueda') {
          setBestRatedProperties(data.properties);
        } else {
          setBestRatedProperties([]);
        }
      },
      (error) => console.log(error),
      null
    );
  }, []);

  return (
    <main className='flex flex-col sm:flex-row pb-28 sm:gap-2'>
      <aside
        className={` w-min sm:bg-white bg-gray-Primary flex-grow-0 sm:static fixed right-0 top-20 z-20 sm:top-0 mt-2 sm:mt-0 sm:pt-20`}
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
        } flex flex-col items-center mt-20 flex-grow max-w-7xl`}
      >
        <h1 className='text-4xl text-principal-gris shadow-lg pt-10 md:pt-10 bg-principal-1 w-full p-10 font-semibold'>
          Viviendas en alquiler
        </h1>
        <div className='cont-alquileres pt-2 justify-center flex flex-wrap w-full gap-5'>
          {Properties.length > 0 ? (
            Properties.map((property) => (
              <Property
                key={property.idProperty}
                property={property}
                mountOn={'propertiesList'}
              />
            ))
          ) : (
            <div>No hay conicidencias para su busqueda.</div>
          )}
        </div>
        <aside
          className={`ALQUILERES ${
            Overlay.show && 'overflow-hidden'
          } flex flex-col items-center mt-20 flex-grow max-w-7xl`}
        >
          <h1 className='text-2xl text-principal-gris pt-10 md:pt-10 bg-principal-1 w-full p-10 font-semibold'>
            Viviendas destacadas
          </h1>
          <div className='cont-alquileres pt-2 justify-center flex flex-wrap w-full gap-5'>
            {bestRatedProperties.length > 0 &&
              bestRatedProperties
                .slice(0, 3)
                .map((property) => (
                  <Property
                    key={property.idProperty}
                    property={property}
                    mountOn={'bestPropertiesList'}
                  />
                ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
