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
    <section className='flex flex-col items-center justify-center pt-24'>
      <h1>Recuperación de contraseña</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <label>
          <div>Escribe aquí tu email:</div>
          <Email {...formFunctions} />
        </label>
        <input
          className='button select-none  text-center border border-gray-400 text-black rounded-full p-2 hover:bg-gray-200 hover:text-gray-600  transform ease-in duration-200 cursor-pointer '
          type='submit'
          value='Recuperar'
        />
      </form>
    </section>
  );
}
