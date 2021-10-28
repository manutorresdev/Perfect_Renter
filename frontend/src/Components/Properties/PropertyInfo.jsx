
import { Link } from 'react-router-dom';
import ContactProperty from '../Forms/ContactProperty';
import { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaChevronRight } from 'react-icons/fa';
import useProperties from '../../Helpers/Hooks/useProperties';
import Filters from './Filters';

export default function PropertyInfo(props) {
  const [Overlay, setOverlay] = useState({
    form: '',
    show: false,
    propertyInfo: {},
  });
  const [Photo, setPhoto] = useState(false);
  const [property, setProperty] = useState({});
  const [Properties] = useProperties();
  // Slider
  const [curr, setCurr] = useState(0);
  const [SlideImgs, setSlideImgs] = useState([]);
  const slider = useRef();

  useEffect(() => {
    setSlideImgs([
      require('../../Images/defPicture.jpg').default,
      require('../../Images/defPicture2.jpg').default,
      require('../../Images/defPicture3.jpg').default,
    ]);
  }, []);

  function right() {
    console.log('\x1b[43m########\x1b[30m', 'RIGHT');
    setCurr(curr === SlideImgs.length - 1 ? 0 : curr + 1);
  }

  function left() {
    console.log('\x1b[43m########\x1b[30m', 'LEFT');
    setCurr(curr === 0 ? SlideImgs.length - 1 : curr - 1);
  }

  function openPhoto() {
    setPhoto(!Photo);
  }


  useEffect(() => {
    const prop = Properties.find(
      (property) =>
        property.idProperty === Number(props.match.params.idProperty)
    );
    if (prop) {
      setProperty(prop);
    }
  }, [props.match.params.idProperty, Properties]);


  return (
    <article className='pb-24 flex w-screen bg-gray-200 bg-opacity-20'>
     {overlay.show ? (
        <ContactProperty
          form={overlay.form}
          setOverlay={setOverlay}
          property={overlay.propertyInfo}
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
            setOverlay(true);
          }}
        />
        <Filters setOverlay={setOverlay} Overlay={Overlay} />
      </aside>
      <section className='self-start flex-grow shadow-xl'>
        <div className='slider pt-20 flex flex-col items-center justify-center '>
          <div
            className={`slider-cont w-full ${
              Photo ? 'h-full' : 'h-96'
            } relative transition-all transform ease-linear duration-300`}
          >
            <button
              onClick={right}
              className='absolute z-10 text-white text-xl sm:text-7xl hover:text-principal-1 hover:bg-gray-800 hover:bg-opacity-5 h-full shadow-md right-0 pr-5 duration-200'
            >
              <FaAngleRight />
            </button>
            <button
              onClick={left}
              className='absolute z-10 text-white  text-xl sm:text-7xl hover:text-principal-1 hover:bg-gray-800 hover:bg-opacity-5 h-full shadow-md left-0 pl-5 duration-200'
            >
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
      </section>
       <button>
          {Properties.length === Number(props.match.params.idProperty) ? (
            <span className='pointer-events-none'>
              {' '}
              No hay mas propiedades{' '}
            </span>
          ) : (
            <Link
              to={`/alquileres/${Number(props.match.params.idProperty) + 1}`}
              className='border-2 py-1 px-3 bg-yellow-400 hover:bg-gray-500 hover:text-white'
            >
              Siguiente Link
            </Link>
          )}
        </button>
        <button
          className='border-2 py-1 px-3 bg-yellow-400 hover:bg-gray-500 hover:text-white'
          onClick={() => {
            setOverlay({
              form: 'contact',
              show: true,
              propertyInfo: property,
            });
          }}
        >
          Contactar
        </button>
        <button
          className='border-2 py-1 px-3 bg-yellow-400 hover:bg-gray-500 hover:text-white'
          onClick={() => {
            setOverlay({
              form: 'reservar',
              show: true,
              propertyInfo: property,
            });
          }}
        >
          Reservar
        </button>
    </article>
  );
}
