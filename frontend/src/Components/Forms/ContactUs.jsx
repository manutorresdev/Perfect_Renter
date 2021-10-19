import React from 'react';
import { useForm } from 'react-hook-form';
import { post } from '../../Helpers/Api';
import Email from './Inputs/Email';
import FirstName from './Inputs/FirstName';

export default function ContactUs() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const formFunctions = { register, errors };

  function onSubmit(body, e) {
    e.preventDefault();

    console.log(body);

    post(
      'http://localhost:4000/contact',
      body,
      (data) => {
        console.log(data);
        alert(data.message);
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (
    <section className='flex flex-col items-center justify-center pt-20'>
      <h1 className='text-3xl mb-20'>Perfect Renter</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <div>Nombre:</div>
          <FirstName
            {...formFunctions}
            placeholder='Escribe aquí tu nombre completo...'
          />
        </label>
        <label>
          <div className='select-none'> Correo electrónico*</div>
          <Email
            className='p-2'
            {...formFunctions}
            placeholder='Escribe aquí tu email....'
          />
        </label>
        <label>
          <div>Asunto</div>
          <input
            type='text'
            {...register('asunto', { required: 'Debes escribir un asunto.' })}
          />
        </label>
        {errors.asunto && (
          <p className='text-red-500'>{errors.asunto.message}</p>
        )}
        <label>
          <div className='select-none'>Comentarios</div>
          <textarea
            className='w-10/12'
            name='comments'
            id='comments'
            cols='30'
            rows='10'
            {...register('comentarios', {
              required: 'Debes añadir algún comentario.',
              maxLength: {
                value: 250,
                message: 'No puedes escribir más de 250 carácteres.',
              },
            })}
          ></textarea>
        </label>
        {errors.comentarios && (
          <p className='text-red-500'>{errors.comentarios.message}</p>
        )}
        <input
          className='button select-none  text-center border border-gray-400 text-black rounded-full p-2 hover:bg-gray-200 hover:text-gray-600  transform ease-in duration-200 cursor-pointer '
          type='submit'
          value='Contactar'
        />
      </form>
    </section>
  );
}
