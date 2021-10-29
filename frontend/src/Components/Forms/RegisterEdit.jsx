import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { post } from '../../Helpers/Api';

// Import inputs controlados
import Email from './Inputs/Email';
import Password from './Inputs/Password';
import FirstName from './Inputs/FirstName';

export default function RegisterEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formFunctions = { register, errors };

  // States
  const [Error, setError] = useState('');

  // Enviar datos a backend
  function onSubmit(body, e) {
    e.preventDefault();

    console.log(body);

    post(
      'http://192.168.5.103:4000/users',
      body,
      (data) => {
        console.log('Success');
        alert(data.message);
        /* e.target.reset(); */
      },
      (data) => {
        setError(data.message);
      }
    );
  }

  const inpStyle =
    'px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full';

  return (
    <>
      <div className='mt-20 flex flex-col items-center gap-5 m-0 p-2'>
        <div className='title underline text-5xl m-0 p-0'>
          <h2>REGISTER</h2>
        </div>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <Email className={inpStyle} {...formFunctions} />
          <Password {...formFunctions} />
          <FirstName className={inpStyle} {...formFunctions} />
          <input
            className={inpStyle}
            type='text'
            name='lastName'
            placeholder='Last Name*'
            {...register('lastName', {
              required: 'Debes escribir un apellido.',
              pattern: {
                value:
                  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                message:
                  'El apellido no puede contener carácteres especiales ni números.',
              },
              minLength: {
                value: 3,
                message: 'El apellido debe contener como mínimo 3 carácteres.',
              },
              maxLength: {
                value: 30,
                message: 'El apellido no puede tener más de 30 carácteres.',
              },
            })}
          />
          {errors.lastName && (
            <p className='text-red-500'>{errors.lastName.message}</p>
          )}
          <input
            className={inpStyle}
            type='text'
            name='city'
            placeholder='City*'
            {...register('city', {
              required: 'Debes escribir la ciudad donde resides.',
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
          />
          {errors.city && <p className='text-red-500'>{errors.city.message}</p>}
          <input
            defaultValue={''}
            className={inpStyle + ' h-20'}
            type='text'
            name='bio'
            placeholder='Bio'
            {...register('bio', {
              required: { value: false, message: 'Bio' },
              minLength: 0,
              maxLength: {
                value: 255,
                message: 'No puedes escribir más de 250 carácteres.',
              },
            })}
          />
          <input
            className={inpStyle}
            type='date'
            name='birthDate'
            {...register('birthDate', {
              required: 'Debes añadir la fecha de nacimiento.',
              pattern: {
                value: /^[0-9].*$/,
                message: 'Debes añadir una fecha de nacimiento correcta.',
              },
            })}
          />
          {errors.birthDate && (
            <p className='text-red-500'>{errors.birthDate.message}</p>
          )}

          {Error ? <div>{Error}</div> : ''}

          <input
            className='button select-none  text-center border border-gray-400 text-black rounded-full p-2 hover:bg-gray-200 hover:text-gray-600 transform ease-in duration-200 cursor-pointer '
            type='submit'
            value='Register'
          />
        </form>
      </div>
    </>
  );
}
