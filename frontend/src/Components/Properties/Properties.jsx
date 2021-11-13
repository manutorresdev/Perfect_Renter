import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { get } from '../../Helpers/Api';
import useProperties from '../../Helpers/Hooks/useProperties';
import Filters from './Filters';
import Property from './Property';

export default function Properties(props) {
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
    <main className='flex flex-col sm:flex-row pb-40 sm:gap-2 max-w-customXL relative flex-grow'>
      <aside
        className={`flex justify-center max-w-min items-center bg-principal-1 border-yellow-300 text-principal-gris text-xl w-32 lg:w-auto lg:bg-transparent flex-grow-0 lg:static  ${
          props.IsFooterVisible ? 'absolute bottom-28 ' : ' fixed bottom-0 '
        } z-20 right-0 left-0 mx-auto lg:top-0 mt-5 lg:mt-20`}
      >
        <button
          className='lg:hidden flex pl-6'
          onClick={() => {
            setOverlay({ show: true });
          }}
        >
          Filtrar
          <FaFilter className='w-10 h-full p-2 lg:hidden' />
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
