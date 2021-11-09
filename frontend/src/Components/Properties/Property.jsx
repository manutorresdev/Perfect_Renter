import React, { useEffect, useRef, useState } from 'react';
import { get } from 'react-hook-form';
import {
  FaAngleLeft,
  FaAngleRight,
  FaPencilAlt,
  FaStar,
  FaTrash,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { del } from '../../Helpers/Api';
import NewProperty from './NewProperty';

export default function Property({
  property,
  token,
  profileOverlay,
  setProfileOverlay,
}) {
  const [curr, setCurr] = useState(0);
  const [SlideImgs, setSlideImgs] = useState([]);
  const slider = useRef();
  const [Overlay, setOverlay] = useState({
    shown: false,
    form: '',
  });
  console.log(property);

  /*   get(
    `http://localhost:4000/photo/${}`,
    (data) => {
      setSlideImgs(data);
      console.log(data);
    },
    (error) => console.log(error),
    token
  );  */
  console.log(SlideImgs);
  function right() {
    console.log('\x1b[43m########\x1b[30m', 'RIGHT');
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
    <article className='cont-vivienda overflow-hidden border-2 max-w-custom sm:max-w-none border-white bg-white sm:w-auto min-w-min hover:max-h-full my-5 shadow-2xl text-gray-400 hover:text-gray-900 duration-300'>
      {Overlay.form === 'newProperty' && (
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
          className={`slider-cont min-w-xxs flex transition-all transform ease-in}`}
        >
          {/* Hacer un map con los path que nos llegan pintando img */}
          {SlideImgs.map((img, i) => {
            return (
              <img
                key={i}
                className={`${
                  i === curr ? '' : 'absolute opacity-0'
                } w-auto sm:max-w-xs object-cover duration-300`}
                src={img}
                alt='default'
              />
            );
          })}
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
          <div className='pl-2 pb-2'>
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
                setOverlay({ shown: true, form: 'newProperty' });
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
