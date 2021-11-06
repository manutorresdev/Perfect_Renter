import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { CreateFormData, post } from '../../Helpers/Api';
import useLocalStorage from '../../Helpers/Hooks/useLocalStorage';
import Email from './Inputs/Email';
import Password from './Inputs/Password';

export default function Login() {
  const [, setToken] = useLocalStorage('Token', '');

  // States
  const { handleSubmit, register, formState: errors, control } = useForm();
  const formFunctions = { register, errors };
  const [Error, setError] = useState('');

  // Enviar datos a backend
  function onSubmit(body) {
    post(
      'http://192.168.5.103:4000/users/login',
      CreateFormData(body),
      (data) => {
        setToken(data.token);
        window.location.reload();
      },
      (data) => {
        setError(data.message);
      }
    );
  }

  return (
    <>
      <section className='pt-24 flex flex-col items-center gap-5 m-0 p-0 bg-gray-200 bg-opacity-50 h-screen'>
        <div className='title text-3xl p-4  bg-principal-1 flex justify-center w-3/6 select-none'>
          <h2>LOGIN</h2>
        </div>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='email'
            control={control}
            rules={{
              required: 'Debes escribir un email.',
              maxLength: {
                value: 200,
                message: 'El email no puede contener más de 200 carácteres.',
              },
            }}
            render={({ field: { onChange, name, ref } }) => {
              return (
                <Email
                  onChange={onChange}
                  inputRef={ref}
                  name={name}
                  className='px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full cursor-pointer'
                />
              );
            }}
          />
          {errors.email && (
            <p className='text-red-500'>{errors.email.message}</p>
          )}
          <Password {...formFunctions} />
          {Error ? <div>{Error}</div> : ''}
          <input
            className='button select-none w-1/2 self-center text-center bg-principal-1 text-principal-gris border border-gray-400 text-black p-2 hover:bg-gray-200 hover:text-gray-600 transform ease-in duration-200 cursor-pointer '
            type='submit'
            value='Entrar'
          />
        </form>
        <Link
          className='p-4 font-medium hover:text-blue-900 hover:underline duration-200'
          to='/recuperar'
        >
          Recuperar contraseña
        </Link>
        <div className='flex gap-1'>
          ¿Aún no tienes cuenta? Registrate
          <Link className='hover:text-blue-900 font-medium hover:underline duration-200'>
            aquí
          </Link>
        </div>
      </section>
    </>
  );
}
