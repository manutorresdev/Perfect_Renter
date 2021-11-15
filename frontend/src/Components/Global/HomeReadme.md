```jsx
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import {
  FaSearch,
  FaStar,
  FaPencilAlt,
  FaTrash,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';
import { button, useHistory } from 'react-router-dom';
import useProperties from '../../Helpers/Hooks/useProperties';
import Property from '../Properties/Property';
import { TokenContext } from '../../Helpers/Hooks/TokenProvider';
import { capitalizeFirstLetter } from '../../Helpers/Api';
import Carousel from 'react-material-ui-carousel';

// Styles
const sectionStyle =
  'h-max-content p-5 text-principal-1 overflow-y-auto bg-gray-Primary';
const sectionTitleStyle = 'pb-5 text-3xl font-medium';
const sectionImgStyle = 'w-2/5 float-right pl-3';
const boxContStyle = 'row-span-2 flex flex-col gap-5';
const boxContTitleStyle =
  'w-full text-center pt-4 pb-3 text-principal-1 underline text-xl';
const boxItemContStyle =
  'grid grid-cols-1 flex-grow grid-rows-auto gap-2 justify-items-center sm:grid-cols-2 relative';
const boxReadMoreBtnStyle =
  'm-auto text-xl bg-gray-Primary text-principal-1 border-2 border-gray-800 max-w-max px-6 py-2 hover:bg-principal-1 hover:text-gray-700 duration-300';
const descBoxStyle =
  'content-center w-3/4 h-full bg-principal-1-hover text-black';
const descBoxTextStyle = 'text-left p-4';
const descBoxTitleStyle = '  pb-3 font-medium';
const descBoxPStyle = '  pl-2';
const mountOn = 'home';
const Properties = [
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
const [OverlayTenants, setOverlayTenants] = useState(false);
const [Token, setToken] = useState(false);
const Users = [
  {
    idUser: 1,
    avatar: 'renter.jpg',
    name: 'Lucía Rodríguez',
    city: 'Cáceres',
  },
  {
    idUser: 2,
    avatar: 'renter.jpg',
    name: 'Sofía Guijuela',
    city: 'Albacete',
  },
  {
    idUser: 3,
    avatar: 'renter.jpg',
    name: 'Isaac Martin',
    city: 'Granada',
  },
  {
    idUser: 4,
    avatar: 'renter.jpg',
    name: 'Juan Antonio',
    city: 'La Langa',
  },
];
const User = {
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

const { register, handleSubmit } = useForm();
const SlideImgs = [
  'llaves-de-la-casa-10.jpg',
  'portada-nosotros.jpg',
  'flat.jpg',
];
const buttonStyle =
  'select-none w-1/4 self-center text-center bg-principal-1 text-principal-gris border border-yellow-300 text-black py-2 px-3 hover:bg-gray-Primary hover:text-principal-1 transform ease-in duration-200 cursor-pointer';

<>
  <div
    className='header bg-center bg-cover sm:h-60vh h-1/3  max-w-full grid grid-cols-10 grid-rows-8'
    style={{
      backgroundImage:
        "linear-gradient(rgba(16, 16, 16, 0.3),rgba(16, 16, 16, 0.9)),url('bgheader.jpg')",
    }}
  >
    <div className='header-text col-start-2 col-end-10 sm:col-start-7 sm:col-end-11 row-start-3 row-end-6 text-white h-30vh flex flex-col gap-2'>
      <h3 className='text-xl font-light'>Encuentra tu</h3>
      <h1 className='text-4xl text-principal-1'>Inquilino Perfecto</h1>
      <p className='w-4/5 text-base font-light'>
        Porque tú o tu propiedad merecen ser valorados. Busca pisos e
        inquilinos, mira sus reseñas y contacta con solo unos Click's.
      </p>
      <button
        to='/nosotros'
        className='btn-more text-xl bg-none p-2 border-yellow-400 border-2 max-w-max hover:bg-principal-1 hover:border-white hover:text-gray-600 duration-300'
      >
        Leer más
      </button>
    </div>
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className='relative col-start-2 col-end-10 mt-14 sm:col-start-4 sm:col-end-8 row-start-7 row-end-8 self-end w-full'
    >
      <input
        type='text'
        {...register('city', {
          pattern: {
            value:
              /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
            message:
              'La ciudad no puede contener carácteres especiales ni números.',
          },
          maxLength: {
            value: 30,
            message: 'La ciudad no puede tener más de 50 carácteres.',
          },
        })}
        placeholder='Escribe aquí tu ciudad favorita...'
        className='w-full pl-2 p-2 bg-gray-300 outline-contras'
      />
      <FaSearch className='text-gray-900 absolute top-3 right-2 cursor-pointer' />
    </form>
  </div>
  <div
    style={{
      backgroundImage:
        "linear-gradient(rgba(16, 16, 16, 0.9),rgba(16, 16, 16, 0.3)),url('fondo-gris.jpeg')",
    }}
    className='bg-center bg-no-repeat bg-cover flex flex-col gap-7 sm:grid sm:grid-cols-2 sm:grid-rows-3 sm:pt-5  sm:w-full pb-32'
  >
    <div className={boxContStyle}>
      <h2 className={boxContTitleStyle}>INQUILINOS</h2>
      <div
        className={boxItemContStyle}
        onClick={(e) => {
          !Token && setOverlayTenants(true);
        }}
      >
        {OverlayTenants && (
          <div
            className={`animate-fadeIn overlay z-20 absolute  flex flex-col gap-2 items-center justify-center m-auto top-0 bottom-0 left-0 right-0 text-xl font-medium text-white`}
          >
            <span className='filter drop-shadow-2xl'>
              Regístrate para visualizar otros usuarios
            </span>
            <button
              className={`${buttonStyle} `}
              onClick={(e) => {
                setOverlayTenants(false);
                setToken(true);
              }}
            >
              Registro
            </button>
          </div>
        )}
        {Users.length
          ? Users.slice(0, 4).map((user) => (
              <div className={descBoxStyle + ` ${!Token && 'filter blur'}`}>
                <img
                  className=' w-full h-48 object-cover '
                  src={user.avatar}
                  alt=''
                />

                {Token ? (
                  <button to={'/inquilinos/' + user.idUser}>
                    <div className={descBoxTextStyle}>
                      <h2 className={descBoxTitleStyle}>{user.name}</h2>
                      <p className={descBoxPStyle}>{user.city}</p>
                    </div>
                  </button>
                ) : (
                  <div className={descBoxTextStyle}>
                    <h2 className={descBoxTitleStyle}>{user.name}</h2>
                    <p className={descBoxPStyle}>{user.city}</p>
                  </div>
                )}
              </div>
            ))
          : ''}
      </div>
      {Token ? (
        <button to='/inquilinos' className={boxReadMoreBtnStyle}>
          <button>Ver más</button>
        </button>
      ) : (
        <button
          className={boxReadMoreBtnStyle}
          onClick={(e) => {
            !Token && setOverlayTenants(true);
          }}
        >
          Ver más
        </button>
      )}
    </div>
    <div className={boxContStyle}>
      <h2 className={boxContTitleStyle}>ALQUILERES</h2>
      <div className={boxItemContStyle}>
        {Properties.length > 0 &&
          Properties.slice(0, 4).map((property) => (
            <article
              key={Math.random()}
              className={`
      ${
        mountOn === 'home'
          ? 'cont-vivienda overflow-hidden content-center w-10/12 flex flex-col justify-start h-full bg-principal-1-hover  hover:max-h-full shadow-custom hover:text-gray-900 duration-300'
          : `cont-vivienda overflow-hidden max-w-xs border-2 sm:max-w-xs bg-white sm:w-auto min-w-min ${
              mountOn === 'profile' ? ' md:max-h-96 ' : ''
            } hover:max-h-full w-full my-5 shadow-custom text-gray-400 hover:text-gray-900 duration-300`
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
              </div>
            </article>
          ))}
      </div>

      <div to='/alquileres' className={boxReadMoreBtnStyle}>
        <button>Ver Mas</button>
      </div>
    </div>
    <section className={sectionStyle}>
      <h3 className={sectionTitleStyle}>Renters</h3>
      <img className={sectionImgStyle} src='familia.jpg' alt='' />
      <p className='text-justify'>
        Sabemos que encontrar una vivienda puede ser complicado y queremos
        ponértelo fácil. Tanto si necesitas un lugar en el que pasar unos días,
        como si lo que buscas es un hogar para ti o tu familia, en Perfect
        Renter tenemos lo que necesitas. Un catálogo de viviendas con un
        historial de votaciones de antiguos inquilinos que te ayudarán a
        encontrar tu vivivienda perfecta.
      </p>
    </section>
    <section className={sectionStyle}>
      <h3 className={sectionTitleStyle}>Alquileres</h3>
      <img className={sectionImgStyle} src='flat.jpg' alt='' />
      <p className='text-justify'>
        Si tienes una vivienda y quieres ponerla en alquiler... ¡Te damos la
        bienvenida a Perfect Renter! Encontrarás personas interesadas en una
        vivienda vacacional y personas que lo que buscan es un hogar. Todas con
        un historial de votaciones que te ayudarán a tomar la mejor decisión.
        ¡Estamos aquí para que encuentres a tu inquilino perfecto!
      </p>
    </section>
  </div>
</>;
```
