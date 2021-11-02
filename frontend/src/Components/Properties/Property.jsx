import React, { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Property({ property }) {
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

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  return (
    <article className='cont-vivienda overflow-hidden border-2 border-white bg-white sm:w-auto w-full min-w-min my-5 shadow-2xl text-gray-400 hover:text-gray-900 duration-200'>
      <div className='slider w-full relative'>
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
          className={`slider-cont min-w-full flex transition-all transform ease-in}`}
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
      <Link to={`/alquileres/${property.idProperty}`}>
        <div className='relative'>
          <div className='bg-gray-Primary p-2 bg-opacity-25 text-lg text-principal-1 flex justify-between'>
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
            <div className='w-72 pt-2'>
              <p>{property.description.slice(0, 100)}...</p>
            </div>
          </div>
          <footer className='flex p-2 justify-end'>
            {Array(parseInt(property.votes))
              .fill(null)
              .map((value, i) => {
                return <FaStar key={i} className='text-principal-1'></FaStar>;
              })}
          </footer>
        </div>
      </Link>
    </article>
  );
}
