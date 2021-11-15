```jsx
import React, { useContext, useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '../../Helpers/Api';
import Carousel from 'react-material-ui-carousel';
import {
  FaStar,
  FaAngleLeft,
  FaAngleRight,
  FaChevronRight,
  FaPencilAlt,
  FaTrash,
} from 'react-icons/fa';
const buttonStyle =
  'select-none w-1/4 self-center text-center bg-principal-1 text-principal-gris border border-yellow-300 text-black py-2 px-3 hover:bg-gray-Primary hover:text-principal-1 transform ease-in duration-200 cursor-pointer';

const token = false;
const [Overlay, setOverlay] = useState({ shown: false, userInfo: {} });
const mountOn = 'propertiesList';
const SlideImgs = [
  'llaves-de-la-casa-10.jpg',
  'portada-nosotros.jpg',
  'flat.jpg',
];
const Votes = [
  {
    idVote: 1,
    commentRenter: 'Es un señor especial.',
    idRenter: 12,
    voteValueRenter: 3,
    name: 'Manu',
    lastName: 'Torres',
    avatar: 'manu.jpg',
  },
  {
    idVote: 3,
    commentRenter: 'Es un señor muy amable.',
    idRenter: 14,
    voteValueRenter: 5,
    name: 'Julian',
    lastName: 'Rendon',
    avatar: 'julian.jpg',
  },
  {
    idVote: 4,
    commentRenter: 'Preguntan mucho.',
    idRenter: 12,
    voteValueRenter: 1,
    name: 'Manu',
    lastName: 'Torres',
    avatar: 'manu.jpg',
  },
  {
    idVote: 5,
    commentRenter: 'Todo ok.',
    idRenter: 14,
    voteValueRenter: 3,
    name: 'Julian',
    lastName: 'Rendon',
    avatar: 'julian.jpg',
  },
];
const user = {
  avatar: 'manu.jpg',
  bio: 'Biografia',
  birthDate: '1996-07-14T00:00:00.000Z',
  ciudad: 'Barcelona',
  createdAt: '2021-11-10T19:26:11.000Z',
  email: 'manutorres1996@gmail.com',
  idUser: 12,
  lastName: 'Torres',
  name: 'Manu',
  role: 'renter',
  tel: '666 666 666',
};
const Bookings = [
  {
    address: 'Calle España',
    bookingCode: 'reserva5',
    city: 'Madrid',
    endBookingDate: '2021-10-20T00:00:00.000Z',
    idBooking: 5,
    idProperty: 5,
    number: 1,
    photo: 'flat.jpg',
    price: '2000.00',
    rooms: 3,
    startBookingDate: '2021-10-15T00:00:00.000Z',
    state: 'finalizada',
    type: 'duplex',
    votes: '2.0000',
  },
  {
    address: 'Calle España',
    bookingCode: 'reserva5',
    city: 'Madrid',
    endBookingDate: '2021-10-20T00:00:00.000Z',
    idBooking: 5,
    idProperty: 5,
    number: 1,
    photo: 'flat.jpg',
    price: '2000.00',
    rooms: 3,
    startBookingDate: '2021-10-15T00:00:00.000Z',
    state: 'finalizada',
    type: 'duplex',
    votes: '2.0000',
  },
];

const propiedadUsuario = [
  {
    idProperty: 1,
    idUser: 12,
    description:
      'Promoción de Obra nueva situada en Barcelona, exclusiva promoción de 22 viviendas con acabados de primera calidad, sistema de climatización de aerotermia de ahorro energético, suelos de parqué, piso de 90,30m² construidos, 2 habitaciones dobles y 1 individual, 2 baños completos, cocina independiente con salida al balcón, amplio comedor con salida al balcón, con parking opcional ! Ven a pedir bookingrmación !',
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

<main className='pb-32 py-20 flex flex-col items-center justify-center max-w-5xl m-auto'>
  <div className='perfil flex flex-col items-center justify-center'>
    <article className=' flex flex-col gap-5 items-center justify-center'>
      <img
        className=' w-60 h-60 object-cover rounded-circle'
        src={'renter.jpg'}
        alt='imagen de perfil'
      />
      <section>
        <div className='bg-gray-Primary p-2 bg-opacity-25 text-3xl text-principal-1 flex justify-between'>
          <h1>
            {user.name
              ? `${capitalizeFirstLetter(user.name)} ${capitalizeFirstLetter(
                  user.lastName
                )}`
              : 'Nombre de tenant'}
          </h1>
        </div>
        <div className='flex self-center px-2 py-2'>
          {[1, 2, 3, 4, 5].map((value, i) => {
            return (
              <FaStar
                key={Math.random()}
                className={`text-principal-1 duration-200 text-2xl cursor-pointer`}
              />
            );
          })}
        </div>
        <h2 className='text-2xl border-b border-gray-200 text-principal-gris bg-principal-1 w-full p-1 font-semibold'>
          Biografía
        </h2>
        <p className='p-2'>
          {user.bio}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus obcaecati
          dignissimos ratione labore rem nesciunt architecto illo a quos, iure quibusdam
          aliquid quo impedit dolorum quam assumenda minus beatae voluptate!
        </p>
      </section>
    </article>
  </div>

  <section className='w-full pt-2'>
    <h2 className='text-2xl border-b border-gray-200 text-principal-gris bg-principal-1 w-full p-1 font-semibold'>
      Historial viviendas
    </h2>
    <div className='flex flex-col p-5 items-center gap-5 sm:justify-start sm:flex-row sm:flex-wrap lg:justify-start'>
      {Bookings.length ? (
        Bookings.map((booking) => {
          return (
            <span key={Math.random()} className='max-w-xs'>
              <article
                className={`animate-fadeIn filter drop-shadow-xl h-1/3 max-w-xs flex flex-col items-start justify-between
                sm:w- sm:max-w-xs
                lg:flex-row lg:max-w-md lg:w-full`}
              >
                <div className='flex flex-col flex-grow lg:w-5/12 w-full'>
                  <h2 className='bg-gray-Primary text-principal-1 text-lg w-full pl-2'>
                    {capitalizeFirstLetter(booking.type)} en {booking.city}
                  </h2>
                  <p>
                    {booking.address}, {booking.number}
                  </p>
                  <p>Precio: {Number(booking.price)}€</p>
                  <p>
                    Entrada:{' '}
                    {new Date(booking.startBookingDate).toLocaleDateString()}
                  </p>
                  <p>
                    Salida:
                    {new Date(booking.endBookingDate).toLocaleDateString()}
                  </p>
                </div>
                <div className='border-r-2 border-opacity-75 border-gray-700'></div>
                <button
                  to={`/alquileres/${booking.idProperty}`}
                  className='lg:h-40 w-full relative flex flex-col flex-grow justify-between lg:w-4/12'
                >
                  <img
                    className='flex-grow object-cover w-full h-full'
                    src={'flat.jpg'}
                    alt='alquiler'
                  />
                  <div className='flex justify-end bg-gray-Primary w-full p-2'>
                    {booking.votes > 0 ? (
                      Array(parseInt(booking.votes))
                        .fill(null)
                        .map((value, i) => {
                          return (
                            <FaStar
                              key={Math.random()}
                              className='text-principal-1'
                            ></FaStar>
                          );
                        })
                    ) : (
                      <div className='h-4'></div>
                    )}
                  </div>
                </button>
              </article>
              {Bookings.length > 1 && (
                <div className='separador bg-principal-1 h-4 mt-5 w-full sm:w-0 max-w-xs'></div>
              )}
            </span>
          );
        })
      ) : (
        <h2 className='p-2'>Este inquilino no ha estado no ha viajado aún.</h2>
      )}
    </div>
  </section>
  <section className='w-full '>
    <h2 className='text-2xl border-b border-gray-200 text-principal-gris bg-principal-1 w-full p-1 font-semibold'>
      Aquileres
    </h2>
    <div className='flex flex-wrap gap-5 justify-center'>
      {propiedadUsuario.length > 0 ? (
        propiedadUsuario.map((property) => (
          <article
            key={Math.random()}
            className={`${
              mountOn === 'home'
                ? 'cont-vivienda overflow-hidden content-center w-3/4 h-full bg-principal-1-hover  hover:max-h-full filter drop-shadow-xl hover:text-gray-900 duration-300'
                : `cont-vivienda overflow-hidden max-w-xs border-2 sm:max-w-xs bg-white sm:w-auto min-w-min ${
                    mountOn === 'profile' ? ' md:max-h-96 ' : ''
                  } hover:max-h-full w-full my-5 filter drop-shadow-xl text-gray-400 hover:text-gray-900 duration-300`
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
                      return (
                        <FaStar
                          key={Math.random()}
                          className='text-principal-1'
                        />
                      );
                    })}
                </footer>
              </button>
              {token ? (
                <div className='flex flex-row justify-between'>
                  <button className='text-xl p-4 hover:text-blue-700'>
                    <FaPencilAlt />
                  </button>
                  <button className='text-xl p-4 hover:text-red-500'>
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
        <div className='font-medium p-2'>No hay ningún inmueble</div>
      )}
    </div>
  </section>

  <section className='w-full'>
    <h2 className='text-2xl border-b border-gray-200 text-principal-gris bg-principal-1 w-full p-1 font-semibold'>
      Opiniones
    </h2>
    <div className='votes-cont pt-5 pb-5 flex flex-col sm:flex-row sm:flex-wrap gap-5 w-full items-center justify-center'>
      {Votes.length ? (
        Votes.map((vote) => {
          return (
            <article
              className='flex w-10/12 shadow-xl max-w-xs'
              key={Math.random()}
            >
              <img
                className='w-14 h-14 rounded-full m-2'
                src={vote.avatar}
                alt='imagen de perfil'
              />
              <section className=''>
                <h1 className='font-bold'>
                  {vote.name} {vote.lastName}
                </h1>
                <p className=''>{vote.commentRenter}</p>
                <div className='flex text-xs self-center py-2'>
                  {vote.voteValueRenter > 0 ? (
                    Array(parseInt(vote.voteValueRenter))
                      .fill(null)
                      .map((value, i) => {
                        return (
                          <FaStar
                            key={Math.random()}
                            className='text-principal-1 text-xl'
                          ></FaStar>
                        );
                      })
                  ) : (
                    <div className='h-4'>
                      <FaStar className='text-gray-200' />
                    </div>
                  )}
                </div>
              </section>
            </article>
          );
        })
      ) : (
        <p className='font-medium p-2'>Aún no tiene valoraciones</p>
      )}
    </div>
  </section>
  <button
    className={buttonStyle}
    onClick={() => {
      setOverlay({ shown: true, info: user, form: 'contact' });
    }}
  >
    Contactar
  </button>
</main>;
```
