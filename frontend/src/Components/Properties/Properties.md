```jsx
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { capitalizeFirstLetter, get } from '../../Helpers/Api';
import {
  FaAngleLeft,
  FaAngleRight,
  FaPencilAlt,
  FaStar,
  FaTrash,
} from 'react-icons/fa';

const [Overlay, setOverlay] = useState({ show: false });
const [bestRatedProperties, setBestRatedProperties] = useState([]);
const SlideImgs = [
  'llaves-de-la-casa-10.jpg',
  'portada-nosotros.jpg',
  'flat.jpg',
];
const mountOn = 'propertiesList';
const token = false;
const Propertiess = [
  {
    idProperty: 1,
    idUser: 12,
    description:
      'Promoción de Obra nueva situada en Barcelona, exclusiva promoción de 22 viviendas con acabados de primera calidad, sistema de climatización de aerotermia de ahorro energético, suelos de parqué, piso de 90,30m² construidos, 2 habitaciones dobles y 1 individual, 2 baños completos, cocina independiente con salida al balcón, amplio comedor con salida al balcón, con parking opcional ! Ven a pedir información !',
    city: 'Barcelona',
    province: 'Barcelona',
    address: 'Carrer del Riu',
    zipCode: '08480',
    number: 9,
    type: 'piso',
    stair: '0',
    elevator: null,
    flat: 1,
    gate: '3',
    mts: '90.00',
    rooms: 3,
    garage: 0,
    terrace: 0,
    toilets: 2,
    energyCertificate: 0,
    availabilityDate: '2021-11-10T00:00:00.000Z',
    price: '650.00',
    state: 'disponible',
    votes: '3.0000',
    createdAt: '2021-11-10T19:26:11.000Z',
  },
  {
    idProperty: 2,
    idUser: 12,
    description:
      'Últimos apartamentos en nuestra promoción Santa Clara 11.Se encuentra instalada en una de las mejores zonas del casco antiguo de Girona, frente al río Onyar. El objetivo de Zenit Houses es transformar el edificio denso de oficinas de los años 70 en una nueva tipología de vida dinámica. Se propone un nuevo patio de luces. Se piensa como un espacio moderno, transparente y luminoso, abierto al cielo. Como corazón de construcción, proporciona luz, ventilación y carácter a las viviendas y al público. Se define en bloques de vidrio siguiendo la tradición de la galería norte-europea, tal como sucede en la Viennese Otto Wagner modernist DS. Las tipologías de viviendas variadas están abiertas tanto en la calle como en el patio. Los diferentes niveles están ocupados con múltiples experiencias de vida. La antigua estructura flexible se adapta a los nuevos tiempos, y también desarrolla una nueva fachada en la calle, que muestra el carácter renovado de Girona. Los apartamentos están listos para entrar a vivir, cocinas totalmente completas con los electrodomésticos integrados incluidos.',
    city: 'Girona',
    province: 'Girona',
    address: 'Carrer de Costa Rica',
    zipCode: '17001',
    number: 9,
    type: 'duplex',
    stair: '1',
    elevator: 1,
    flat: 2,
    gate: '2',
    mts: '85.00',
    rooms: 2,
    garage: 0,
    terrace: 0,
    toilets: 1,
    energyCertificate: 0,
    availabilityDate: '2021-11-10T00:00:00.000Z',
    price: '300.00',
    state: 'disponible',
    votes: '0.0000',
    createdAt: '2021-11-10T19:26:11.000Z',
  },
  {
    idProperty: 3,
    idUser: 13,
    description:
      'El piso está reformado y se encuentra en ÓPTIMAS CONDICIONES. Cuenta con CALEFACCIÓN CENTRAL INCLUIDA EN EL PRECIO. Tiene aire acondicionado en el salón Es EXTERIOR.\nTiene techos altos, paredes lisas con molduras de techo, suelos de parqué. Cuenta con puerta blindada y ventilación cruzada. Podemos encontrar ARMARIOS EMPOTRADOS en dos dormitorios. Las ventanas son climalit. Se divide en las siguientes estancias: -Hall de entrada: Recibidor que da acceso a la vivienda -Salón: con ventanas exteriores. La zona de comedor es independiente. -Cocina: Independiente, amueblada y equipada con ELECTRODOMÉSTICOS. Cuenta con HORNO, microondas, LAVAVAJILLAS, HORNO, y vitrocerámica. Tiene ventana. -Zona office que da servicio a la cocina -Zona de lavadero, independiente, con su puerta de servicio -Dormitorio 1: MATER BEDROOM, con baño ensuite. Tiene ventana exterior. Acceso desde el salón -Baño 1: Con bañera -Dormitorio 2: INDIVIDUAL, con baño ensuite. Tiene ventana interior -Baño 2: Con pie de ducha -Dormitorio 3: de SERVICIO. Tiene ventana -Baño 3: Con ducha. Tiene ventana',
    city: 'Madrid',
    province: 'Madrid',
    address: 'Calle Aragón',
    zipCode: '28002',
    number: 9,
    type: 'piso',
    stair: '1',
    elevator: null,
    flat: 3,
    gate: '2',
    mts: '80.00',
    rooms: 1,
    garage: 0,
    terrace: 0,
    toilets: 1,
    energyCertificate: 0,
    availabilityDate: '2021-11-10T00:00:00.000Z',
    price: '1250.00',
    state: 'disponible',
    votes: '3.0000',
    createdAt: '2021-11-10T19:26:11.000Z',
  },
];

<main className='flex flex-col sm:flex-row sm:gap-2'>
  <section
    className={`ALQUILERES ${
      Overlay.show && 'overflow-hidden'
    } flex flex-col items-center mt-20 flex-grow  w-full`}
  >
    <h1 className='text-4xl text-principal-gris shadow-lg pt-10 md:pt-10 bg-principal-1 w-full p-10 font-semibold'>
      Viviendas en alquiler
    </h1>
    <div className='cont-alquileres pt-2 justify-center flex flex-wrap w-full gap-5'>
      {Propertiess.length > 0 ? (
        Propertiess.map((property) => (
          <article
            key={Math.random()}
            className={`
        ${
          mountOn === 'home'
            ? 'cont-vivienda overflow-hidden content-center w-3/4 h-full bg-principal-1-hover shadow-custom hover:text-gray-900 duration-300'
            : `cont-vivienda overflow-hidden  relative max-w-xs filter drop-shadow-lg sm:max-w-xs bg-white sm:w-auto min-w-min ${
                mountOn === 'profile' ? 'pb-10 lg:h-95%' : 'h-100  '
              } w-full my-5  text-gray-400 hover:text-gray-900 duration-300`
        }
      `}
            // className={`cont-vivienda overflow-hidden content-center w-3/4 h-full bg-principal-1-hover  hover:max-h-full shadow-custom hover:text-gray-900 duration-300`}
          >
            <div className='slider w-full sm:max-w-custom md:max-w-none relative'>
              <Carousel
                navButtonsAlwaysVisible
                indicators={false}
                autoPlay={false}
                animation='slide'
                NavButton={({ onClick, className, style, next, prev }) => {
                  if (next) {
                    return (
                      <FaAngleRight
                        onClick={onClick}
                        className='absolute z-10 text-white text-3xl cursor-pointer hover:text-principal-1 hover:bg-gray-800 hover:bg-opacity-5 h-full shadow-md right-0 pr-2 duration-200'
                      >
                        {next && 'Next'}
                      </FaAngleRight>
                    );
                  } else {
                    return (
                      <FaAngleLeft
                        onClick={onClick}
                        className='absolute z-10 text-white text-3xl cursor-pointer hover:text-principal-1 hover:bg-gray-800 hover:bg-opacity-5 h-full shadow-md left-0 pl-2 duration-200'
                      >
                        {prev && 'Previous'}
                      </FaAngleLeft>
                    );
                  }
                }}
                className='slider-cont min-w-xxs h-48 transition-all transform ease-in'
              >
                {SlideImgs.length > 0 ? (
                  SlideImgs.map((img, i) => {
                    return (
                      <img
                        key={Math.random()}
                        className='object-cover w-full h-48'
                        src={img}
                        alt='default'
                      />
                    );
                  })
                ) : (
                  <img
                    className='object-fit h-48 w-full'
                    src='https://www.arquitecturaydiseno.es/medio/2020/10/19/casa-prefabricada-de-hormipresa-en-el-boecillo-valladolid-realizada-con-el-sistema-arctic-wall-de-paneles-estructurales-con-el-acabado-incorporado_6f2a28cd_1280x794.jpg'
                    alt='default home'
                  />
                )}
              </Carousel>
            </div>

            <div className='relative sm:max-w-custom md:max-w-none'>
              <button to={`/alquileres/${property.idProperty}`}>
                <div className='bg-gray-Primary p-2 bg-opacity-25 text-lg text-principal-1 flex justify-between gap-2'>
                  <h3>
                    {capitalizeFirstLetter(property.type)} en {property.city}
                  </h3>
                  <h3>{Number(property.price)} €/mes</h3>
                </div>
                <div className='pl-2'>
                  {property.province}
                  <div className='text-black font-medium'>
                    {`${property.mts}m² - ${property.rooms} habitaciones - ${
                      property.toilets
                    } ${property.toilets > 1 ? 'baños' : 'baño'}`}
                  </div>
                  {!(mountOn === 'bestPropertiesList') && (
                    <div className='sm:w-72 pt-2'>
                      <p className='overflow-hidden'>
                        {property.description.slice(0, 100)}...
                      </p>
                    </div>
                  )}
                </div>
                <footer className='flex p-2 justify-end'>
                  {Array(parseInt(property.votes))
                    .fill(null)
                    .map((value, i) => {
                      return <FaStar key={i} className='text-principal-1' />;
                    })}
                </footer>
              </button>
              {token ? (
                <div className='flex flex-row justify-between'>
                  <button
                    className='text-xl p-4 hover:text-blue-700'
                    onClick={() => {
                      setOverlay({ shown: true, form: 'editProperty' });
                    }}
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    className='text-xl p-4 hover:text-red-500'
                    onClick={() => {
                      setProfileOverlay({
                        form: 'deleteProperty',
                        shown: true,
                        onSubmitDeleted: onSubmitDeleted,
                      });
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </article>
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
        {Propertiess.length > 0 &&
          Propertiess.slice(0, 3).map((property) => (
            <article
              key={Math.random()}
              className={`
        ${
          mountOn === 'home'
            ? 'cont-vivienda overflow-hidden content-center w-3/4 h-full bg-principal-1-hover shadow-custom hover:text-gray-900 duration-300'
            : `cont-vivienda overflow-hidden  relative max-w-xs filter drop-shadow-lg sm:max-w-xs bg-white sm:w-auto min-w-min ${
                mountOn === 'profile' ? 'pb-10 lg:h-95%' : 'h-100  '
              } w-full my-5  text-gray-400 hover:text-gray-900 duration-300`
        }`}
            >
              <div className='slider w-full sm:max-w-custom md:max-w-none relative'>
                <Carousel
                  navButtonsAlwaysVisible
                  indicators={false}
                  autoPlay={false}
                  animation='slide'
                  NavButton={({ onClick, className, style, next, prev }) => {
                    if (next) {
                      return (
                        <FaAngleRight
                          onClick={onClick}
                          className='absolute z-10 text-white text-3xl cursor-pointer hover:text-principal-1 hover:bg-gray-800 hover:bg-opacity-5 h-full shadow-md right-0 pr-2 duration-200'
                        >
                          {next && 'Next'}
                        </FaAngleRight>
                      );
                    } else {
                      return (
                        <FaAngleLeft
                          onClick={onClick}
                          className='absolute z-10 text-white text-3xl cursor-pointer hover:text-principal-1 hover:bg-gray-800 hover:bg-opacity-5 h-full shadow-md left-0 pl-2 duration-200'
                        >
                          {prev && 'Previous'}
                        </FaAngleLeft>
                      );
                    }
                  }}
                  className='slider-cont min-w-xxs h-48 transition-all transform ease-in'
                >
                  {SlideImgs.length > 0 ? (
                    SlideImgs.map((img, i) => {
                      return (
                        <img
                          key={Math.random()}
                          className='object-cover w-full h-48'
                          src={img}
                          alt='default'
                        />
                      );
                    })
                  ) : (
                    <img
                      className='object-fit h-48 w-full'
                      src='https://www.arquitecturaydiseno.es/medio/2020/10/19/casa-prefabricada-de-hormipresa-en-el-boecillo-valladolid-realizada-con-el-sistema-arctic-wall-de-paneles-estructurales-con-el-acabado-incorporado_6f2a28cd_1280x794.jpg'
                      alt='default home'
                    />
                  )}
                </Carousel>
              </div>

              <div className='relative sm:max-w-custom md:max-w-none'>
                <button to={`/alquileres/${property.idProperty}`}>
                  <div className='bg-gray-Primary p-2 bg-opacity-25 text-lg text-principal-1 flex justify-between gap-2'>
                    <h3>
                      {capitalizeFirstLetter(property.type)} en {property.city}
                    </h3>
                    <h3>{Number(property.price)} €/mes</h3>
                  </div>
                  <div className='pl-2'>
                    {property.province}
                    <div className='text-black font-medium'>
                      {`${property.mts}m² - ${property.rooms} habitaciones - ${
                        property.toilets
                      } ${property.toilets > 1 ? 'baños' : 'baño'}`}
                    </div>
                    {!(mountOn === 'bestPropertiesList') && (
                      <div className='sm:w-72 pt-2'>
                        <p className='overflow-hidden'>
                          {property.description.slice(0, 100)}...
                        </p>
                      </div>
                    )}
                  </div>
                  <footer className='flex p-2 justify-end'>
                    {Array(parseInt(property.votes))
                      .fill(null)
                      .map((value, i) => {
                        return <FaStar key={i} className='text-principal-1' />;
                      })}
                  </footer>
                </button>
                {token ? (
                  <div className='flex flex-row justify-between'>
                    <button
                      className='text-xl p-4 hover:text-blue-700'
                      onClick={() => {
                        setOverlay({ shown: true, form: 'editProperty' });
                      }}
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      className='text-xl p-4 hover:text-red-500'
                      onClick={() => {
                        setProfileOverlay({
                          form: 'deleteProperty',
                          shown: true,
                          onSubmitDeleted: onSubmitDeleted,
                        });
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </article>
          ))}
      </div>
    </aside>
  </section>
</main>;
```
