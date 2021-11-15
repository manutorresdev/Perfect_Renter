```jsx
import { button } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaChevronRight } from 'react-icons/fa';
import { capitalizeFirstLetter } from '../../Helpers/Api';
import NewProperty from './NewProperty';
import Carousel from 'react-material-ui-carousel';

//Overlay de respuestas
const [message, setMessage] = useState({ status: '', message: '' });

// Verificar si User es dueño de la propiedad
const Owner = false;
// Ampliar fotos
const [Photo, setPhoto] = useState(true);
// Información de la propiedad
const property = {
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
};
// Slider
const SlideImgs = [
  'llaves-de-la-casa-10.jpg',
  'portada-nosotros.jpg',
  'flat.jpg',
];

function openPhoto() {
  setPhoto(!Photo);
}

// Styles
const sliderButtonStyle =
  'absolute z-10 text-white text-4xl sm:text-7xl hover:text-principal-1 hover:bg-gray-800 hover:bg-opacity-5 h-full duration-200';
const buttonStyle =
  'select-none w-full self-center text-center bg-principal-1 text-principal-gris border border-yellow-300 text-black py-2 px-3 hover:bg-gray-Primary hover:text-principal-1 transform ease-in duration-200 cursor-pointer';

const pageIteratorButtonsStyle = `border-2 p-3 rounded-full hover:bg-gray-500 hover:text-white duration-200  `;

<main className='flex flex-col relative max-w-customXL'>
  <article className='w-full pb-10 flex bg-opacity-20'>
    <section className='self-start flex-grow flex flex-col justify-between max-w-7xl'>
      <div className={`shadow-xl flex flex-col w-full h-full`}>
        <div className={`slider pt-20 w-full h-full`}>
          <Carousel
            className={`slider-cont sm:max-w-7xl w-full h-full ${
              Photo ? 'max-h-96' : 'max-h-full bg-gray-Primary'
            } flex transition-all transform ease-in duration-300 `}
            navButtonsAlwaysVisible
            indicators={false}
            autoPlay={false}
            animation='slide'
            NavButton={({ onClick, className, style, next, prev }) => {
              if (next) {
                return (
                  <FaAngleRight
                    onClick={onClick}
                    className={`${
                      Photo
                        ? ' text-5xl pr-2 text-white'
                        : ' text-7xl pr-5 text-principal-gris bg-gray-100 bg-opacity-10'
                    } absolute z-10  cursor-pointer hover:text-principal-1 hover:bg-gray-800 hover:bg-opacity-5 h-full shadow-md right-0  duration-200`}
                  >
                    {next && 'Next'}
                  </FaAngleRight>
                );
              } else {
                return (
                  <FaAngleLeft
                    onClick={onClick}
                    className={`${
                      Photo
                        ? ' text-5xl pl-2 text-white'
                        : ' text-7xl pl-5 text-principal-gris bg-gray-100 bg-opacity-10 '
                    } absolute z-10 cursor-pointer hover:text-principal-1 hover:bg-gray-800 hover:bg-opacity-5 h-full shadow-md left-0 duration-200`}
                  >
                    {prev && 'Previous'}
                  </FaAngleLeft>
                );
              }
            }}
          >
            {SlideImgs.length > 0 ? (
              SlideImgs.map((img, i) => {
                return (
                  <img
                    key={Math.random()}
                    onClick={openPhoto}
                    className={`object-cover duration-300 cursor-pointer ${
                      Photo
                        ? ' h-96 w-full'
                        : ' sm:h-full w-full sm:max-h-lg max-w-2xl object-contain m-auto'
                    }`}
                    src={img}
                    alt='default'
                  />
                );
              })
            ) : (
              <img
                className=' object-cover w-full h-full duration-300 cursor-pointer'
                onClick={openPhoto}
                src='https://www.arquitecturaydiseno.es/medio/2020/10/19/casa-prefabricada-de-hormipresa-en-el-boecillo-valladolid-realizada-con-el-sistema-arctic-wall-de-paneles-estructurales-con-el-acabado-incorporado_6f2a28cd_1280x794.jpg'
                alt='default home'
              />
            )}
          </Carousel>
        </div>
        <div className='informacion bg-gray-Primary p-5 bg-opacity-25 text-2xl text-principal-1 flex justify-between'>
          <h2>Piso en {property.city}</h2>
          <h2>{Number(property.price)} €/mes</h2>
        </div>
        <p className='p-5 self-center font-medium text-principal-gris'>
          {`${Number(property.mts)}m² - ${property.rooms} habitaciones - ${
            property.toilets
          } ${property.toilets > 1 ? 'baños' : 'baño'}`}
        </p>
        <p className='px-5 text-xl'>{property.description}</p>
        <span className='pt-5 px-5 underline font-medium'>
          Información detallada:
        </span>
        <ul className='p-5 pt-2 pl-10 w-2/3 text-center'>
          <li className='bg-gray-200 h-7'>Ciudad: {property.province}</li>
          <li>{property.terrace === 0 ? 'Sin' : 'Con'} terraza</li>
          <li className='bg-gray-200'>
            {property.garage === 0 ? 'Sin' : 'Con'} garaje
          </li>
          <li>{property.elevator === 0 ? 'Sin' : 'Con'} ascensor</li>
          <li className='bg-gray-200'>
            Estado: {property.state && capitalizeFirstLetter(property.state)}
          </li>
          <li>
            Fecha disponibilidad:{' '}
            {new Date(property.availabilityDate).toLocaleDateString('es-ES')}
          </li>
          <li className='bg-gray-200'>
            Certificado de energía:{' '}
            {property.energyCertificate === 0 ? 'Sin especificar' : 'Si'}
          </li>
        </ul>
        {/* {property && pisosVisitados.includes(property.idProperty) && (
            <p>Ya has visitado este piso.</p>
          )} */}
      </div>
      <div className='buttons-cont z-20 font-medium p-5 flex justify-around items-center'>
        {Owner ? (
          <button className={buttonStyle + ' z-0'}>Editar</button>
        ) : (
          <>
            <button className={buttonStyle + ' z-0'} onClick={() => {}}>
              Contactar
            </button>
            <button className={buttonStyle} onClick={() => {}}>
              Reservar
            </button>
          </>
        )}
      </div>
    </section>
  </article>
</main>;
```
