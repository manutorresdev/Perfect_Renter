import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { useHistory } from 'react-router';

export default function Filters({ setOverlay }) {
  const pMinVal = useRef();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(body, e) {
    e.preventDefault();
    const queryString = Object.keys(body)
      .filter((val) => body[val].length > 1)
      .map((key) => {
        return `${key}=${body[key]}`;
      })
      .join('&');
    history.push('?' + queryString);
    if (window.innerWidth <= 650) {
      setOverlay(false);
    }
  }

  return (
    <div className='overlay z-10  bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-24 overflow-scroll  duration-300 sm:overflow-hidden sm:z-0 sm:bg-transparent sm:mt-0 sm:static sm:py-10'>
      <section className='contact pt-2 border border-black sm:border-transparent flex flex-col gap-5 w-9/12 bg-white relative'>
        <button
          className='close-overlay absolute top-3 right-3 sm:hidden'
          onClick={() => {
            setOverlay(false);
          }}
        >
          <FaPlus className='transform rotate-45 ' />
        </button>
        <h1 className='title self-center select-none'>Filtros</h1>
        <div className='contact-card-container flex justify-around flex-col-reverse gap-10 sm:flex-row '>
          <form
            className='flex flex-col gap-4 p-2'
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>
              <select name='orden' defaultValue='' {...register('orden')}>
                <option value='' disabled>
                  Filtrar por
                </option>
                <option value='precio'>Precio</option>
                <option value='creacion'>Fecha de creacion</option>
                <option value='valoraciones'>Valoraciones</option>
              </select>
            </label>
            <label>
              <select
                name='direccion'
                defaultValue=''
                {...register('direccion')}
              >
                <option value='' disabled>
                  Orden
                </option>
                <option value='ASC'>Asc</option>
                <option value='DESC'>Desc</option>
              </select>
            </label>
            <label className='dispDate'>
              <div>Fecha de entrada:</div>
              {/* {A GESTIONAR} */}
              <input
                type='date'
                name='dispDate'
                className='border border-black'
              />
            </label>
            <label className='dispDate'>
              <div>Fecha de salida:</div>
              {/* {A GESTIONAR} */}
              <input
                type='date'
                name='dispDate'
                className='border border-black'
              />
            </label>
            <div>Ciudad:</div>
            <label className='city'>
              <input
                {...register('ciudad', {
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
                type='text'
                name='ciudad'
                className='border border-black'
                placeholder='Ciudad...'
              />
              {errors.city && (
                <p className='text-red-500'>{errors.city.message}</p>
              )}
            </label>
            <div>Provincia:</div>
            <label className='province'>
              <input
                {...register('provincia', {
                  pattern: {
                    value:
                      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                    message:
                      'La provincia no puede contener carácteres especiales ni números.',
                  },
                  maxLength: {
                    value: 30,
                    message:
                      'La provincia no puede tener más de 50 carácteres.',
                  },
                })}
                type='text'
                name='provincia'
                className='border border-black'
                placeholder='Provincia...'
              />
            </label>
            <label className='type'>
              <div>Tipo de vivienda:</div>
              <select name='type' defaultValue='' {...register('tipo')}>
                <option value='' disabled></option>
                <option value='piso'>Piso</option>
                <option value='casa'>Casa</option>
                <option value='duplex'>Dúplex</option>
              </select>
            </label>
            <div className='flex gap-2'>
              <label className='minPrice'>
                <div>Precio Mínimo:</div>
                <input
                  ref={pMinVal}
                  min='1'
                  max='10000'
                  {...register('pMin')}
                  type='number'
                  name='pMin'
                  className='border border-black'
                  placeholder='Mínimo'
                />
                €
              </label>
              <label className='maxPrice'>
                <div>Precio Máximo:</div>
                <input
                  {...register('pMax')}
                  min='1'
                  max='10000'
                  type='number'
                  name='pMax'
                  className='border border-black'
                  placeholder='Máximo'
                />
                €
              </label>
            </div>
            <label className='rooms'>
              <div>Habitaciones:</div>
              <input
                {...register('hab')}
                type='number'
                name='hab'
                min='1'
                max='10'
                className='border border-black '
                placeholder='Habitaciones'
              />
            </label>
            <label className='parking flex gap-2 items-center'>
              <div>Garaje:</div>
              <input
                {...register('garaje')}
                type='checkbox'
                name='garaje'
                className='border border-black'
                placeholder='Garaje...'
              />
            </label>
            <label className='toilets'>
              <div>Baños: </div>
              <input
                {...register('baños')}
                min='1'
                max='10'
                type='number'
                name='baños'
                className='border border-black'
                placeholder='Baños...'
              />
            </label>
            <label className='mts'>
              <div>Metros:</div>
              <input
                {...register('m2')}
                min='1'
                max='1000'
                type='number'
                name='m2'
                className='border border-black'
                placeholder='Metros...'
              />
            </label>
            <input
              type='submit'
              value='Aplicar filtros'
              className='btn-more text-xl bg-none p-2 border-yellow-400 border-2 max-w-max hover:bg-principal-1 hover:border-white hover:text-gray-600 duration-300'
            />
          </form>
        </div>
      </section>
    </div>
  );
}
