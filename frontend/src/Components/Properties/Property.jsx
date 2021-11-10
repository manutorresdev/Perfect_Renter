import React, { useEffect, useState } from 'react';
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
import Carousel from 'react-material-ui-carousel';
export default function Property({
  property,
  token,
  profileOverlay,
  setProfileOverlay,
  mountOn,
}) {
  const [SlideImgs, setSlideImgs] = useState([]);
  const [Overlay, setOverlay] = useState({
    shown: false,
    form: '',
  });

  useEffect(() => {
    get(
      `http://192.168.5.103:4000/properties/${property.idProperty}/photos`,
      (data) => {
        if (data.status === 'ok' && mountOn === 'propertiesList') {
          setSlideImgs(data.photos.slice(0, 5));
        } else if (data.status === 'ok' && mountOn === 'profile') {
          setSlideImgs(data.photos);
        } else {
          setSlideImgs(data.photos);
        }
      },
      (error) => console.log(error),
      null
    );
  }, [property.idProperty, mountOn]);

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  function onSubmitDeleted(body, e) {
    del(
      `http://192.168.5.103:4000/properties/${property.idProperty}`,
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
      className={`cont-vivienda overflow-hidden max-w-xs border-2 sm:max-w-xs bg-white sm:w-auto min-w-min ${
        mountOn === 'profile' ? ' md:max-h-96 ' : ''
      } hover:max-h-full w-full my-5 shadow-custom text-gray-400 hover:text-gray-900 duration-300`}
    >
      {Overlay.form === 'editProperty' && (
        <NewProperty
          setOverlay={setOverlay}
          Token={token}
          EditProperty={property}
        />
      )}
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
                  key={i}
                  className='object-cover w-full h-48'
                  src={'http://192.168.5.103:4000/photo/' + img.name}
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
