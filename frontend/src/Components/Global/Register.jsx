import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { get, post } from '../../Helpers/Api';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // States
  const [Error, setError] = useState('');

  // Enviar datos a backend
  function onSubmit(body, e) {
    // e.preventDefault();
    console.log(body);
    post(
      'http://localhost:4000/users',
      body,
      (data) => {
        console.log('Success');
        alert(data.message);
      },
      (data) => {
        setError(data.message);
        e.target.reset();
      }
    );
  }

  return (
    <>
      <div className='mt-20 flex flex-col items-center gap-5 m-0 p-0'>
        <div className='title underline text-5xl m-0 p-0'>
          <h2>REGISTER</h2>
        </div>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <input
            type='email'
            name='email'
            placeholder='Email'
            {...register('email', { required: 'El email es obligatorio' })}
          />
          {errors.email && (
            <p className='text-red-500'>{errors.email.message}</p>
          )}
          <input
            type='password'
            name='password'
            placeholder='Password'
            {...register('password', {
              required: 'La contraseña es obligatoria.',
              minLength: {
                value: 8,
                message: 'Debe contener mínimo 8 carácteres',
              },
            })}
          />
          {errors.password && (
            <p className='text-red-500'>{errors.password.message}</p>
          )}
          <input
            type='text'
            name='name'
            placeholder='First Name'
            {...register('name')}
          />

          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            // required
            {...register('lastName')}
          />
          <input
            type='text'
            name='city'
            placeholder='City'
            // required
            {...register('city')}
          />
          <input
            className='h-20'
            type='text'
            name='bio'
            placeholder='Bio'
            {...register('bio', { required: false })}
          />
          <input
            type='date'
            name='birthDate'
            placeholder='BirthDate'
            // required
            {...register('birthDate')}
          />

          {Error ? <div>{Error}</div> : ''}

          <input
            className='button select-none  text-center border border-gray-400 text-black rounded-full p-2 hover:bg-gray-200 hover:text-gray-600  transform ease-in duration-200 cursor-pointer '
            type='submit'
            value='Register'
          />
        </form>
      </div>
    </>
  );
}
