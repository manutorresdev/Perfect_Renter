import { Link } from 'react-router-dom';
import ContactProperty from '../Forms/ContactProperty';
import { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaChevronRight } from 'react-icons/fa';
import useProperties from '../../Helpers/Hooks/useProperties';
import Filters from './Filters';
// import { parseJwt } from '../../Helpers/Api';
import useUser from '../../Helpers/Hooks/useUser';

export default function PropertyInfo(props) {
  // Recibimos id del usuario que hace la request
  const [User] = useUser(props.token);
  // Overlay de formularios
  const [Overlay, setOverlay] = useState({
    form: '',
    show: false,
    propertyInfo: {},
  });
  // Verificar si User es dueño de la propiedad
  const [Owner, setOwner] = useState(false);
  // Ampliar fotos
  const [Photo, setPhoto] = useState(false);
  // Información de la propiedad
  const [property, setProperty] = useState({});
  // Array de propiedades
  const [Properties] = useProperties();
  // Slider
  const [curr, setCurr] = useState(0);
  const [SlideImgs, setSlideImgs] = useState([]);
  const slider = useRef();

  function right() {
    setCurr(curr === SlideImgs.length - 1 ? 0 : curr + 1);
  }

  function left() {
    setCurr(curr === 0 ? SlideImgs.length - 1 : curr - 1);
  }

  function openPhoto() {
    setPhoto(!Photo);
  }

  useEffect(() => {
    setSlideImgs([
      require('../../Images/defPicture.jpg').default,
      require('../../Images/defPicture2.jpg').default,
      require('../../Images/defPicture3.jpg').default,
    ]);
  }, []);

  useEffect(() => {
    const prop = Properties.find(
      (property) =>
        property.idProperty === Number(props.match.params.idProperty)
    );

    if (prop) {
      setProperty(prop);
      if (prop.idUser === User.idUser) {
        setOwner(true);
      } else {
        setOwner(false);
      }
    }
  }, [props.match.params.idProperty, Properties, property, Owner, User]);

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  // Styles
  const sliderButtonStyle =
    'absolute z-10 text-white text-xl sm:text-7xl hover:text-principal-1 hover:bg-gray-800 hover:bg-opacity-5 h-full shadow-md duration-200';
  const buttonStyle =
    'border-2 py-1 px-3 bg-principal-1 hover:bg-gray-500 hover:text-white duration-200';

  const pageIteratorButtonsStyle = `border-2 p-3 rounded-full hover:bg-gray-500 hover:text-white duration-200  `;

  return (
    <article className='pb-28 flex bg-gray-200 bg-opacity-20 relative'>
      {Overlay.form ? (
        <ContactProperty
          form={Overlay.form}
          setOverlay={setOverlay}
          property={Overlay.propertyInfo}
          user={User}
          pictures={SlideImgs}
        />
      ) : (
        ''
      )}
      <aside
        className={`bg-gray-Primary w-min sm:bg-transparent flex-grow-0 sm:static absolute left-0 top-20 sm:top-0 mt-5 sm:mt-20`}
      >
        <FaChevronRight
          className='text-white text-xl w-10 h-full p-2 sm:hidden'
          onClick={() => {
            setOverlay({ show: true });
          }}
        />
        <Filters setOverlay={setOverlay} Overlay={Overlay} />
      </aside>
      <section className='self-start flex-grow flex flex-col justify-between'>
        <div className='shadow-xl flex flex-col'>
          <div className='slider pt-20 flex flex-col items-center justify-center '>
            <div
              className={`slider-cont ${
                Photo ? 'h-full' : 'h-96'
              }  transition-all transform ease-linear duration-300`}
            >
              <button
                onClick={right}
                className={`${sliderButtonStyle} right-0`}
              >
                <FaAngleRight />
              </button>
              <button onClick={left} className={`${sliderButtonStyle} left-0`}>
                <FaAngleLeft />
              </button>
              <div
                ref={slider}
                className={`slider-cont overflow-hidden h-full flex transition-all transform ease-in}`}
              >
                {/* Hacer un map con los path que nos llegan pintando img */}
                {SlideImgs.map((img, i) => {
                  return (
                    <img
                      key={i}
                      className={`${
                        i === curr ? '' : 'absolute opacity-0'
                      } object-cover w-full duration-300 cursor-pointer`}
                      onClick={openPhoto}
                      src={img}
                      alt='default'
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className='informacion bg-gray-Primary p-5 bg-opacity-25 text-2xl text-principal-1 flex justify-between'>
            <h2>Piso en {property.city}</h2>
            <h2>{Number(property.price)}/mes</h2>
          </div>
          <p className='p-5 self-center font-medium text-principal-gris'>
            {`${Number(property.mts)}m² - ${property.rooms} habitaciones - ${
              property.toilets
            } ${property.toilets > 1 ? 'baños' : 'baño'}`}
          </p>
          <p className='px-5 text-xl'>{property.description}</p>
          <span className='pt-5 px-5 underline font-medium'>
            Informacion detallada:
          </span>
          <ul className='p-5 pt-2 pl-10'>
            <li>Ciudad: {property.province}</li>
            <li>{property.terrace === 0 ? 'Sin' : 'Con'} terraza</li>
            <li>{property.garage === 0 ? 'Sin' : 'Con'} garaje</li>
            <li>
              Estado: {property.state && capitalizeFirstLetter(property.state)}
            </li>
            <li>
              Fecha disponibilidad:{' '}
              {new Date(property.availabilityDate).toLocaleDateString('es-ES')}
            </li>
            <li>
              Certificado de energía:{' '}
              {property.energyCertificate === 0 ? 'Sin especificar' : 'Si'}
            </li>
          </ul>
        </div>
        <div className='buttons-cont p-5 flex justify-around items-center'>
          <div className='grid grid-cols-2 grid-rows-2 gap-1 fixed right-5 bottom-0 select-none z-10'>
            <Link
              to={`/alquileres/${Number(props.match.params.idProperty) - 1}`}
              className={`${pageIteratorButtonsStyle} ${
                Number(props.match.params.idProperty) === 1
                  ? 'text-white bg-gray-500 pointer-events-none cursor-default'
                  : 'bg-principal-1 cursor-pointer'
              }`}
            >
              <FaAngleLeft className='text-gray-700' aria-disabled />
            </Link>
            <Link
              to={`/alquileres/${Number(props.match.params.idProperty) + 1}`}
              className={`${pageIteratorButtonsStyle} ${
                Number(props.match.params.idProperty) === Properties.length
                  ? 'text-white bg-gray-500 pointer-events-none cursor-default'
                  : 'bg-principal-1 cursor-pointer'
              }`}
            >
              <FaAngleRight className='text-gray-700' />
            </Link>
            <p className='col-start-1 col-end-3 justify-self-center'>
              {Number(props.match.params.idProperty)}/{Properties.length}
            </p>
          </div>
          {Owner ? (
            <button
              className={buttonStyle}
              onClick={() => {
                // setOverlay({
                //   form: 'editar',
                //   propertyInfo: property,
                // });
              }}
            >
              Editar
            </button>
          ) : (
            <>
              <button
                className={buttonStyle}
                onClick={() => {
                  setOverlay({
                    form: 'contact',
                    propertyInfo: property,
                  });
                }}
              >
                Contactar
              </button>
              <button
                className={buttonStyle}
                onClick={() => {
                  setOverlay({
                    form: 'reservar',
                    propertyInfo: property,
                  });
                }}
              >
                Reservar
              </button>
            </>
          )}
        </div>
      </section>
    </article>
  );
}
