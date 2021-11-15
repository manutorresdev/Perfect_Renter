import React from 'react';
import { useForm } from 'react-hook-form';
import { put } from '../../Helpers/Api';
import Email from './Inputs/Email';

export default function RecoverPass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formFunctions = { register, errors };

  function onSubmit(body, e) {
    e.preventDefault();

    put(
      'http://localhost:4000/users/password/recover',
      body,
      (data) => {
        console.log(data);
        alert('¡Revisa tu correo electrónico para cambiar la contraseña!');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <section className='flex flex-col gap-5 items-center justify-center pt-24'>
      <h1 className='border-b-4 border-gray-600 text-3xl'>
        Recuperación de contraseña
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <label>
          <div>Escribe aquí tu email:</div>
          <Email
            {...formFunctions}
            className='px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full cursor-pointer'
          />
        </label>
        <input
          className='select-none w-full self-center text-center bg-principal-1 text-principal-gris border border-yellow-300 text-black py-2 px-3 hover:bg-gray-Primary hover:text-principal-1 transform ease-in duration-200 cursor-pointer'
          type='submit'
          value='Recuperar'
        />
      </form>
    </section>
  );
}
