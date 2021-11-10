import React, { useEffect, useRef, useState } from 'react';
import {
  FaAngleLeft,
  FaAngleRight,
  FaPencilAlt,
  FaStar,
  FaTrash,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { del, get } from '../../Helpers/Api';
import NewProperty from './NewProperty';

export default function Property({
  property,
  token,
  profileOverlay,
  setProfileOverlay,
  mountOn,
}) {
  const [curr, setCurr] = useState(0);
  const [SlideImgs, setSlideImgs] = useState([]);
  const slider = useRef();
  const [Overlay, setOverlay] = useState({
    shown: false,
    form: '',
  });

  useEffect(() => {
    get(
      `http://localhost:4000/properties/${property.idProperty}/photos`,
      (data) => {
        if (data.status === 'ok' && mountOn === 'propertiesList') {
          setSlideImgs(data.photos.slice(0, 5));
        } else if (data.status === 'ok' && mountOn !== 'propertiesList') {
          setSlideImgs(data.photos);
        }
      },
      (error) => console.log(error),
      null
    );
  }, [property.idProperty, mountOn]);
  function right() {
    console.log('\x1b[43m########\x1b[30m', 'RIGHT');
    console.log(curr);
    console.log('\x1b[45m%%%%%%%', SlideImgs.length);
    setCurr(curr === SlideImgs.length - 1 ? 0 : curr + 1);
  }

  function left() {
    console.log('\x1b[43m########\x1b[30m', 'LEFT');
    setCurr(curr === 0 ? SlideImgs.length - 1 : curr - 1);
  }

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  function onSubmitDeleted(body, e) {
    del(
      `http://localhost:4000/properties/${property.idProperty}`,
      body,
      (data) => {
        alert(data.message);
        window.location.reload();
      },
      (error) => console.log(error),
      token
    );
  }

  return (
    <article
      className={`cont-vivienda overflow-hidden cont-vivienda content-center w-3/4 h-full bg-principal-1-hover  ${
        mountOn === 'profile' ? ' md:max-h-96 ' : ''
      } hover:max-h-full shadow-custom hover:text-gray-900 duration-300`}
    >
      {Overlay.form === 'editProperty' && (
        <NewProperty
          setOverlay={setOverlay}
          Token={token}
          EditProperty={property}
        />
      )}
      <div className='slider w-full max-w-custom sm:max-w-none relative'>
        <button
          onClick={right}
          className='absolute z-10 text-white text-3xl hover:text-principal-1 hover:bg-gray-800 hover:bg-opacity-5 h-full shadow-md right-0 pr-2 duration-200'
        >
          <FaAngleRight />
        </button>
        <button
          onClick={left}
          className='absolute z-10 text-white text-3xl hover:text-principal-1 hover:bg-gray-800 hover:bg-opacity-5 h-full shadow-md left-0 pl-2 duration-200'
        >
          <FaAngleLeft />
        </button>
        <div
          ref={slider}
          className={`slider-cont min-w-xxs h-48 flex transition-all transform ease-in}`}
        >
          {SlideImgs.length > 0 ? (
            SlideImgs.slice(0, 5).map((img, i) => {
              return (
                <img
                  key={i}
                  className={`${
                    i === curr ? '' : 'absolute opacity-0'
                  } object-cover w-full duration-300`}
                  src={'http://localhost:4000/photo/' + img.name}
                  alt='default'
                />
              );
            })
          ) : (
            <img
              className='object-cover w-full'
              src='https://www.arquitecturaydiseno.es/medio/2020/10/19/casa-prefabricada-de-hormipresa-en-el-boecillo-valladolid-realizada-con-el-sistema-arctic-wall-de-paneles-estructurales-con-el-acabado-incorporado_6f2a28cd_1280x794.jpg'
              alt='default home'
            />
          )}
        </div>
      </div>

      <div className='relative max-w-custom sm:max-w-none'>
        <Link to={`/alquileres/${property.idProperty}`}>
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
            <div className='sm:w-72 pt-2'>
              <p className='overflow-hidden'>
                {property.description.slice(0, 100)}...
              </p>
            </div>
          </div>
          <footer className='flex p-2 justify-end'>
            {Array(parseInt(property.votes))
              .fill(null)
              .map((value, i) => {
                return <FaStar key={i} className='text-principal-1' />;
              })}
          </footer>
        </Link>
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
  );
}
