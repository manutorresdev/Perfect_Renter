```jsx
import { CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaCamera,
  FaEuroSign,
  FaHome,
  FaListUl,
  FaMapMarkerAlt,
  FaMoneyCheckAlt,
  FaPlus,
  FaRegCalendarAlt,
  FaRegImages,
  FaRegArrowAltCircleUp,
} from 'react-icons/fa';
import { CreateFormData, del, get, post, put } from '../../Helpers/Api';

const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
  reset,
} = useForm({
  defaultValues: {
    type: 'piso',
    state: 'disponible',
    city: '',
    province: '',
    address: '',
    number: '',
    flat: '',
    stair: '',
    gate: '',
    zipCode: '',
    rooms: '',
    toilets: '',
    mts: '',
    garage: '',
    terrace: '',
    elevator: '',
    energyCertificate: '',
    price: '',
    description: '',
  },
});
const [PhotoUploader, setPhotoUploader] = useState(false);
const [Loader, setLoader] = useState(false);
const [Message, setMessage] = useState({ status: '', message: '' });
const [Button, setButton] = useState(false);
const [TotalPhotos, setTotalPhotos] = useState(0);
const [FileName, setFileName] = useState([]);
const photos = 0;
// Provincias
const [Provinces, setProvinces] = useState([]);
const provRef = useRef(null);
const [ProvincesFound, setProvincesFound] = useState([]);
const [ProvincesOverlay, setProvincesOverlay] = useState(false);
// Ciudades
const cityRef = useRef(null);
const [Cities, setCities] = useState([]);
const [CitiesFound, setFound] = useState([]);
const [CitiesOverlay, setCitiesOverlay] = useState(false);
const [lastProperty, setLastProperty] = useState('');
const [Error, setError] = useState('');
const cpRef = useRef(null);

// Fotos en caso de entrar en EditProperty
const Photos = ['llaves-de-la-casa-10.jpg', 'portada-nosotros.jpg', 'flat.jpg'];

function onSubmitProperty(body, e) {
  alert('¡Propiedad Creada!');
  reset();
}

function onSubmitEdited(body, e) {
  e.preventDefault();
  setTimeout(() => {
    alert('¡Propiedad Editada!');
    setLoader(false);
  }, 1000);
}

function editFile(body, e) {
  e.preventDefault();

  console.log('Sucess');
  setTimeout(() => {
    setButton(false);
    setLoader(false);
    setFileName('');
    window.location.reload();
  }, 500);
  setMessage({ status: 'ok', message: '¡Fotos subidas con éxito!' });
}

useEffect(() => {
  setTotalPhotos(photos + FileName.length);
}, [FileName.length, photos]);

function deletePhoto(name) {
  setPhotos(Photos.filter((photo) => photo.name !== name));
  alert('Foto Eliminada');
}

// Province React Hook Form
const {
  onChange: onChangeProvince,
  ref: provinceRef,
  onBlur: onBlurProvince,
  ...restProvince
} = register('province', {
  required: 'Debes escribir la provincia',
  pattern: {
    value:
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
    message: 'La provincia no puede contener carácteres especiales ni números.',
  },
  maxLength: {
    value: 30,
    message: 'La provincia no puede tener más de 50 carácteres.',
  },
});
// City React Hook Form
const { onChange, ref, onBlur, ...restCity } = register('city', {
  required: 'Debes escribir una ciudad',
  pattern: {
    value:
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
    message: 'La ciudad no puede contener carácteres especiales ni números.',
  },
  maxLength: {
    value: 30,
    message: 'La ciudad no puede tener más de 50 carácteres.',
  },
});

// Postal Code React Hook Form
const { ref: cpFormRef, ...cpRest } = register('zipCode', {
  required: 'Debes escribir el código postal',
  pattern: {
    value: /^\s?\+?\s?([0-9\s]*){9,}$/,
    message: 'Debes introducir un número válido.',
  },
});
const inputsLabelStyle =
  'sm:text-gray-600  text-xl border-b-2 border-gray-200 flex items-center gap-1';

const inpStyle =
  'px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full';
const description = watch('description');

<div className='overlay z-30 bg-white bg-opacity-75 justify-center w-full h-full left-0 top-0 flex flex-col items-center px-12 pt-24 pb-2 overflow-scroll sm:overflow-hidden'>
  {PhotoUploader && (
    <div className='overlay absolute z-20 bg-gray-400 bg-opacity-20 w-full h-full left-0 top-0 flex flex-col items-center px-12 py-24 overscroll-scroll sm:overflow-hidden'>
      {Loader && (
        <div className='overlay z-50 fixed bg-gray-200 bg-opacity-50 w-full h-full left-0 top-0 flex flex-col items-center px-12 pt-24 pb-2 overflow-scroll sm:overflow-hidden'>
          <CircularProgress className='absolute top-0 left-0 right-0 bottom-0 m-auto' />{' '}
        </div>
      )}
      <section className=' pt-2 shadow-custom border-2 border-gray-700 flex flex-col items-center gap-5 bg-gray-100 relative text-principal-gris overflow-y-auto '>
        <button
          className='close-overlay absolute top-3 right-3'
          onClick={(e) => {
            setPhotoUploader(false);
          }}
        >
          <FaPlus className='transform rotate-45' />
        </button>
        <h1 className='title text-3xl p-4 border-b-4 self-center border-gray-700 flex justify-center w-5/6 select-none'>
          Añade las fotos de tu inmueble
        </h1>
        <div className='contact-card-container flex justify-around flex-col-reverse gap-10 sm:flex-row '>
          <form className='flex flex-col gap-10 md:gap-3 pl-2 font-medium w-full pb-4'>
            <div className='flex flex-col gap-5 items-center'>
              <button
                className='font-medium flex items-center gap-2 bg-blue-600 text-white p-1 rounded'
                onClick={(e) => {
                  e.preventDefault();
                  setFileName([
                    ...FileName,
                    { Content: 'Foto', index: Math.random() },
                  ]);
                  setButton(true);
                }}
              >
                <FaRegArrowAltCircleUp className='animate-bounce' />
                Selecciona los archivos
              </button>

              <div className='photo-cont flex flex-col gap-2 justify-center'>
                {photos && (
                  <div className='uploaded-photos-cont flex flex-col gap-1'>
                    <span className='border-b-2 border-gray-600 w-1/2 mb-2'>
                      Fotos subidas:
                    </span>
                    <div className='flex flex-wrap gap-2 justify-center'>
                      {photos.map((photo, index) => {
                        return (
                          <div key={Math.random()} className='relative'>
                            <button
                              className='delete-photo absolute top-0 right-0 bg-principal-1'
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <FaPlus className='transform rotate-45' />
                            </button>
                            <img
                              src={photo}
                              alt='prueba'
                              className='w-20 h-20 object-cover'
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {FileName ? (
                  <div className='flex flex-col gap-1'>
                    <span className='border-b-2 border-gray-600 w-full mb-2'>
                      Fotos seleccionadas:
                    </span>
                    <div className='selected-photos-cont flex flex-wrap gap-2 justify-center'>
                      {FileName.map((file, index) => {
                        return (
                          <div key={Math.random()} className='relative w-20'>
                            <button
                              className='delete-photo absolute top-0 right-0 bg-principal-1'
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setLoader(true);
                                setFileName(
                                  FileName.filter(
                                    (fileToRemove, index) =>
                                      fileToRemove.index !== file.index
                                  )
                                );
                                setTimeout(() => {
                                  setLoader(false);
                                }, 1000);
                              }}
                            >
                              <FaPlus className='transform rotate-45' />
                            </button>
                            <div className='w-20 h-20 object-cover'>
                              {file.Content}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className='text-center'>Ningún archivo seleccionado.</p>
                )}
              </div>
            </div>
            {Error && (
              <p className='text-red-600 font-medium text-center'>{Error}</p>
            )}
            {Message.status === 'ok' && (
              <p className='font-medium text-green-700 text-center'>
                {Message.message}
              </p>
            )}

            <span
              className={`self-center ${
                TotalPhotos >= 30 &&
                FileName.length > 0 &&
                ' text-red-500 animate-pulse'
              }`}
            >
              Fotos: {TotalPhotos}/30
            </span>

            <button
              onClick={(e) => {
                setButton(false);
                setLoader(true);
              }}
              type='submit'
              className={`${
                Button
                  ? 'bg-principal-1 text-principal-gris cursor-pointer'
                  : 'text-gray-400 select-none pointer-events-none cursor-default'
              } ${
                TotalPhotos >= 30 &&
                'text-gray-400 select-none pointer-events-none cursor-default '
              } font-medium relative flex justify-center gap-2 select-none w-1/2 self-center text-center border border-gray-400 text-black p-2 hover:bg-gray-200 hover:text-gray-600 transform ease-in duration-200`}
            >
              Añadir
              {Loader && (
                <CircularProgress className='absolute top-0 left-0 right-0 bottom-0 m-auto' />
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  )}
  {Loader && (
    <div className='overlay z-50 fixed bg-gray-200 bg-opacity-50 w-full h-full left-0 top-0 flex flex-col items-center px-12 pt-24 pb-2 overflow-scroll sm:overflow-hidden'>
      <CircularProgress className='absolute top-0 left-0 right-0 bottom-0 m-auto' />{' '}
    </div>
  )}
  <section className='pt-20 filter drop-shadow-xl flex flex-col gap-5 bg-white relative text-principal-gris overflow-y-auto  md:w-4/6'>
    <button
      className='close-overlay absolute top-3 p-5 right-2'
      onClick={() => {
        setOverlay({ shown: false, info: {}, form: '' });
        setPhotoUploader(false);
      }}
    >
      <FaPlus className='transform scale-150 rotate-45' />
    </button>
    <h1 className='title w-4/6 text-2xl sm:text-4xl text-center m-auto p-4 border-b-4 border-gray-600 '>
      Inmueble
    </h1>
    <div className='newProperty-card-container flex justify-around flex-col-reverse gap-10 '>
      <form
        className='flex flex-col gap-4 p-6'
        onSubmit={handleSubmit(onSubmitProperty)}
      >
        <h2 className={inputsLabelStyle}>
          <FaHome className='min-w-min m-1 sm:m-0' />
          ¿Qúe tipo de inmueble ofreces?
        </h2>
        <div className='grid grid-cols-3 '>
          <label className='flex gap-2 items-baseline font-medium'>
            Piso
            <input
              type='radio'
              name='tipo'
              value='piso'
              {...register('type')}
            />
          </label>
          <label className='flex gap-2 items-baseline font-medium'>
            Casa
            <input
              type='radio'
              name='tipo'
              value='casa'
              {...register('type')}
            />
          </label>
          <label className='flex gap-2 items-baseline font-medium'>
            Dúplex
            <input
              type='radio'
              name='tipo'
              value='duplex'
              {...register('type')}
            />
          </label>
        </div>

        <h3 className={inputsLabelStyle}>
          <FaRegCalendarAlt className='min-w-min m-1 sm:m-0' />
          ¿Qué disponibilidad tiene ahora mismo?
        </h3>

        <div className='flex flex-col items-end m-auto sm:m-0 sm:grid sm:grid-cols-3 '>
          <label className='flex gap-2 items-baseline font-medium'>
            Disponible
            <input
              type='radio'
              name='state'
              value='disponible'
              {...register('state')}
            />
          </label>
          <label className='flex gap-2 items-baseline font-medium'>
            Alquilado
            <input
              type='radio'
              name='state'
              value='alquilado'
              {...register('state')}
            />
          </label>
          <label className='flex gap-2 items-baseline font-medium'>
            Reservado
            <input
              type='radio'
              name='state'
              value='reservado'
              {...register('state')}
            />
          </label>
        </div>
        <h4 className={inputsLabelStyle}>
          <FaMapMarkerAlt className='min-w-min m-1 sm:m-0' />
          ¿Dónde está?
        </h4>
        <label className='relative'>
          <input
            type='text'
            name='city'
            autoComplete='new-password'
            ref={(el) => {
              ref(el);
              cityRef.current = el;
            }}
            className={inpStyle}
            placeholder='Ciudad'
            onChange={(el) => {
              onChange(el);
            }}
            {...restCity}
          />
          {errors.city && <p className='text-red-500'>{errors.city.message}</p>}
        </label>
        <label className='relative'>
          <input
            type='text'
            name='province'
            className={inpStyle}
            placeholder='Provincia'
            ref={(e) => {
              provinceRef(e);
              provRef.current = e;
            }}
            onChange={(e) => {
              onChangeProvince(e);
            }}
            {...restProvince}
          />
          {ProvincesOverlay && (
            <div className='provinces-cont absolute z-20 flex flex-col items-start overflow-y-scroll max-h-96  w-full border-2 border-black border-t-0 bg-white'>
              {ProvincesFound.length > 0 ? (
                ProvincesFound.map((province) => {
                  return (
                    <button
                      className='bg-white w-full text-left p-2 border'
                      key={Math.random()}
                      onMouseDown={() => {
                        provRef.current.value = province.provincia;
                      }}
                    >
                      {province.provincia}
                    </button>
                  );
                })
              ) : (
                <p>No hay resultados.</p>
              )}
            </div>
          )}
        </label>
        {errors.province && (
          <p className='text-red-500'>{errors.province.message}</p>
        )}
        <input
          type='text'
          name='address'
          className={inpStyle}
          placeholder='Dirección'
          {...register('address', {
            required: 'Debes escribir la dirección',
            pattern: {
              value:
                /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
              message:
                'La dirección no puede contener carácteres especiales ni números.',
            },
            maxLength: {
              value: 30,
              message: 'La dirección no puede tener más de 50 carácteres.',
            },
          })}
        />
        {errors.address && (
          <p className='text-red-500'>{errors.address.message}</p>
        )}
        <div className='flex flex-col gap-2'>
          <input
            type='num'
            name='number'
            className={inpStyle}
            placeholder='Nº'
            {...register('number', {
              required: 'Debes escribir el número',
              pattern: {
                value: /^\s?\+?\s?([0-9\s]*){9,}$/,
                message: 'Debes introducir un número válido.',
              },
            })}
          />
          {errors.number && (
            <p className='text-red-500'>{errors.number.message}</p>
          )}

          <input
            type='num'
            name='flat'
            className={inpStyle}
            placeholder='Piso'
            {...register('flat', {
              pattern: {
                value: /^\s?\+?\s?([0-9\s]*){9,}$/,
                message: 'Debes introducir un número válido.',
              },
            })}
          />
          <input
            type='text'
            name='stair'
            className={inpStyle}
            placeholder='Escalera'
            {...register('stair', {
              pattern: {
                message: 'Debes introducir un número válido.',
              },
            })}
          />
          <input
            type='text'
            name='gate'
            className={inpStyle}
            placeholder='Puerta'
            {...register('gate', {
              pattern: {
                message: 'Debes introducir un número válido.',
              },
            })}
          />
          <input
            type='text'
            name='zipCode'
            className={inpStyle}
            placeholder='Código Postal'
            ref={(e) => {
              cpFormRef(e);
              cpRef.current = e;
            }}
            {...cpRest}
          />
          {errors.zipCode && (
            <p className='text-red-500'>{errors.zipCode.message}</p>
          )}
        </div>
        <h5 className={inputsLabelStyle}>
          <FaListUl className='min-w-min m-1 sm:m-0' />
          ¿Qúe características tiene?
        </h5>
        <div className='flex flex-col gap-2'>
          <input
            {...register('rooms')}
            type='number'
            name='rooms'
            min='1'
            max='10'
            className={inpStyle}
            placeholder='Habitaciones'
            {...register('rooms', {
              required: 'Debes escribir el número de habitaciones',
              pattern: {
                value: /^\s?\+?\s?([0-9\s]*){9,}$/,
                message: 'Debes introducir un número válido.',
              },
            })}
          />
          {errors.rooms && (
            <p className='text-red-500'>{errors.rooms.message}</p>
          )}
          <input
            {...register('toilets')}
            min='1'
            max='10'
            type='number'
            name='toilets'
            className={inpStyle}
            placeholder='Baños'
            {...register('toilets', {
              pattern: {
                value: /^\s?\+?\s?([0-9\s]*){9,}$/,
                message: 'Debes introducir un número válido.',
              },
            })}
          />
          <input
            {...register('mts')}
            min='1'
            max='1000'
            type='number'
            name='mts'
            className={inpStyle}
            placeholder='Metros'
            {...register('mts', {
              required: 'Debes escribir el número de m2',
              pattern: {
                value: /^\s?\+?\s?([0-9\s]*){9,}$/,
                message: 'Debes introducir un número válido.',
              },
            })}
          />
          {errors.mts && <p className='text-red-500'>{errors.mts.message}</p>}
        </div>
        <div className='flex flex-col items-center sm:flex-row justify-between '>
          <label className='parking'>
            <div className={inputsLabelStyle}>Garaje:</div>
            <input
              type='checkbox'
              name='garage'
              className={inpStyle}
              {...register('garage')}
            />
          </label>
          <label className='terraza gap-2 items-center'>
            <div className={inputsLabelStyle}>Terraza:</div>
            <input
              type='checkbox'
              name='terrace'
              className={inpStyle}
              {...register('terrace')}
            />
          </label>
          <label className='ascensor gap-2 items-center'>
            <div className={inputsLabelStyle}>Ascensor:</div>
            <input
              type='checkbox'
              name='elevator'
              className={inpStyle}
              {...register('elevator')}
            />
          </label>
          <label className='ascensor gap-2 items-center'>
            <div className={inputsLabelStyle}>Certificado de energía:</div>
            <input
              type='checkbox'
              name='energyCertificate'
              className={inpStyle}
              {...register('energyCertificate')}
            />
          </label>
        </div>
        <h6 className={inputsLabelStyle}>
          <FaRegImages className='min-w-min m-1 sm:m-0' />
          '¡Sube fotos para que vean cómo es!'
        </h6>
        <div
          className={inpStyle + ' flex items-center justify-between'}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setPhotoUploader(true);
          }}
        >
          {'La primera fotografía será la principal'}
          <div className='flex flex-wrap gap-2 justify-center'>
            {Photos
              ? Photos.map((photo) => {
                  return (
                    <div key={Math.random()} className='relative'>
                      <button
                        className='delete-photo absolute top-0 right-0 bg-principal-1'
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      ></button>
                    </div>
                  );
                })
              : ''}
          </div>
          <FaCamera className={`text-4xl cursor-pointer`} />
        </div>

        <p className={inputsLabelStyle}>
          <FaMoneyCheckAlt />
          ¿Qué precio por noche tiene?
        </p>
        <div className='flex flex-col-2 w-52 gap-2'>
          <input
            min='1'
            max='10000'
            type='number'
            name='price'
            className={inpStyle}
            placeholder='Precio'
            {...register('price', {
              required: 'Debes escribir el precio',
              pattern: {
                value: /^\s?\+?\s?([0-9\s]*){9,}$/,
                message: 'Debes introducir un número válido.',
              },
            })}
          />
          <FaEuroSign className='m-5' />
        </div>
        {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
        <label className='relative'>
          <p className={inputsLabelStyle}>
            Cuéntanos un poco más sobre tu vivienda
          </p>
          <textarea
            className={
              'px-3 pt-3 pb-5 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full h-20'
            }
            type='text'
            name='description'
            cols='20'
            maxLength='3000'
            placeholder='Describe tu inmueble'
            {...register('description', {
              minLength: 0,
              maxLength: {
                value: 3000,
                message: 'No puedes escribir más de 3000 carácteres.',
              },
            })}
          />
          <p className=' absolute right-5 bottom-2 '>
            {description ? description.length : 0}/3000
          </p>
        </label>
        {Error && <div>{Error}</div>}
        <div className='flex justify-center items-center self-center  bottom-0 w-full h-28 sm:bg-transparent'>
          <input
            type='submit'
            value='AÑADIR'
            className='btn-submit cursor-pointer text-xl bg-none p-2 font-medium text-principal-gris border-gray-700 border-2 h-2/4 hover:bg-gray-Primary bg-principal-1 hover:border-white hover:text-principal-1 duration-300'
          />
        </div>
      </form>
    </div>
  </section>
</div>;
```
