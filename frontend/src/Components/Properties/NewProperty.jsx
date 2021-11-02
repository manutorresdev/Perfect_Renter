import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCamera, FaEuroSign, FaPlus } from 'react-icons/fa';
import { CreateFormData, post } from '../../Helpers/Api';

export default function NewProperty({ Token, setOverlay, usuario }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const formFunctions = { register, errors };

  const [Error, setError] = useState('');

  function onSubmitProperty(body, e) {
    e.preventDefault();
    post(
      'http://localhost:4000/properties',
      CreateFormData(body),
      (data) => {
        alert(data.message);
        reset();
        console.log(data);
      },
      (data) => {
        setError(data.message);
      },
      Token
    );
  }

  const inputsLabelStyle =
    'sm:text-gray-600 sm:hover:text-principal-1 text-xl duration-200';

  const inpStyle =
    'px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full';

  return (
    <div className='overlay z-20 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-20 overflow-scroll sm:overflow-hidden'>
      <section className='contact w-1/3 p-24 border border-black flex flex-col gap-5 mt-16 bg-white relative'>
        {/* <button
          className='close-overlay absolute top-3 right-3 sm:hidden'
          onClick={() => {
            setOverlay({ show: false });
          }}
        >
          <FaPlus className='transform rotate-45 ' />
        </button> */}
        <h2 className='title underline text-5xl m-0 p-0  '>Inmueble</h2>
        <div className='filters-card-container flex justify-around flex-col-reverse gap-10 sm:flex-row '>
          <form
            className='flex flex-col gap-4 p-2'
            onSubmit={handleSubmit(onSubmitProperty)}
          >
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
              className={inpStyle}
              placeholder='Ciudad...'
            />
            {errors.city && (
              <p className='text-red-500'>{errors.city.message}</p>
            )}

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
                  message: 'La provincia no puede tener más de 50 carácteres.',
                },
              })}
              type='text'
              name='provincia'
              className={inpStyle}
              placeholder='Provincia...'
            />

            <div className='grid grid-cols-2 grid-rows-2'>
              <div className={`col-start-1 col-end-3 ${inputsLabelStyle}`}>
                Tipo de vivienda:
              </div>
              <label className='flex gap-2 items-baseline font-medium'>
                Piso
                <input
                  type='radio'
                  name='tipo'
                  value='piso'
                  {...register('tipo')}
                />
              </label>
              <label className='flex gap-2 items-baseline font-medium'>
                Casa
                <input
                  type='radio'
                  name='tipo'
                  value='casa'
                  {...register('tipo')}
                />
              </label>
              <label className='flex gap-2 items-baseline font-medium'>
                Duplex
                <input
                  type='radio'
                  name='tipo'
                  value='duplex'
                  {...register('tipo')}
                />
              </label>
            </div>
            <div className='flex flex-col gap-2'>
              <input
                min='1'
                max='10000'
                type='number'
                name='price'
                className={inpStyle}
                placeholder='Precio'
              />
              <FaEuroSign />
            </div>

            <input
              {...register('hab')}
              type='number'
              name='hab'
              min='1'
              max='10'
              className={inpStyle}
              placeholder='Hab...'
            />

            <label className='parking flex gap-2 items-center'>
              <div className={inputsLabelStyle}>Garaje:</div>
              <input
                {...register('garaje')}
                type='checkbox'
                name='garaje'
                className={inpStyle}
                placeholder='Garaje...'
              />
            </label>

            <input
              {...register('baños')}
              min='1'
              max='10'
              type='number'
              name='baños'
              className={inpStyle}
              placeholder='Baños...'
            />

            <input
              {...register('m2')}
              min='1'
              max='1000'
              type='number'
              name='m2'
              className={inpStyle}
              placeholder='Metros...'
            />

            <div className={inputsLabelStyle}>
              Fotos:La primera será la principal
            </div>
            <button
              className='left-44'
              usuario={usuario}
              onClick={() => {
                setOverlay({ shown: true, userInfo: '', form: 'property' });
              }}
            >
              <FaCamera className='text-4xl ' />
            </button>

            <input
              className={inpStyle + ' h-20'}
              type='text'
              name='description'
              placeholder='Describe tu inmueble'
              {...register('bio', {
                required: { value: false, message: 'Description' },
                minLength: 0,
                maxLength: {
                  value: 3000,
                  message: 'No puedes escribir más de 3000 carácteres.',
                },
              })}
            />

            <div className='flex justify-center items-center self-center  bottom-0 w-full h-28 bg-white sm:bg-transparent'>
              <input
                type='submit'
                value='Añadir'
                className='btn-submit text-xl bg-none p-2 font-medium text-principal-gris border-gray-700 border-2 h-2/4 hover:bg-gray-Primary bg-principal-1 hover:border-white hover:text-principal-1 duration-300'
              />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
