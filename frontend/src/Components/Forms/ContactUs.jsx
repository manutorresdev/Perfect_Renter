import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreateFormData, post } from '../../Helpers/Api';
import Email from './Inputs/Email';
import FirstName from './Inputs/FirstName';

export default function ContactUs() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();

  function onSubmit(body, e) {
    e.preventDefault();
    post(
      'http://localhost:4000/contact',
      CreateFormData(body),
      (data) => {
        console.log(data);
        alert(data.message);
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Styles
  const inpStyle =
    'px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border-2 border-gray-400 outline-none focus:outline-none focus:ring';

  return (
    <section className='pt-20 sm:pb-40 bg-gray-200 bg-opacity-20'>
      <h1 className='sm:text-5xl text-3xl p-4 w-full bg-principal-1 text-principal-gris sm:p-10'>
        Perfect Renter
      </h1>
      <div className='flex justify-center flex-col md:flex-row-reverse gap-5 px-10 pb-32 sm:pb-2'>
        <div className='p-5 w-full'>
          <h1 className='w-3/4 self-center font-medium text-3xl border-b-4 border-gray-700'>
            Contacto
          </h1>
          <p className='pt-4 text-xl max-w-xl'>
            El equipo de Perfect Renter está encantado de que te pongas en
            contacto con nosotros para cualquier duda o sugerencia que quieras
            transmitirnos.
            <br /> Intentaremos responderte en la mayor brevedad posible.
          </p>
        </div>
        <form
          className='font-medium flex flex-col w-3/4 pt-2 sm:pt-5 m-auto max-w-xl'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>
            <div className='select-none'> Nombre Completo*</div>
            <Controller
              name='name'
              control={control}
              rules={{
                required: 'Debes escribir un nombre.',
                pattern: {
                  value:
                    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                  message:
                    'El nombre no puede contener carácteres especiales ni números.',
                },
                minLength: {
                  value: 3,
                  message: 'El nombre debe contener como mínimo 3 carácteres.',
                },
                maxLength: {
                  value: 30,
                  message: 'El nombre no puede tener más de 30 carácteres.',
                },
              }}
              render={({ field: { onChange, name, ref, value } }) => {
                return (
                  <FirstName
                    value={value}
                    onChange={onChange}
                    inputRef={ref}
                    name={name}
                    className={`${inpStyle}`}
                  />
                );
              }}
            />
          </label>
          <label>
            <div className='select-none'> Correo electrónico*</div>
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
              render={({ field: { onChange, name, ref, value } }) => {
                return (
                  <Email
                    value={value}
                    onChange={onChange}
                    inputRef={ref}
                    name={name}
                    className={inpStyle}
                  />
                );
              }}
            />
          </label>
          <label>
            <div>Asunto</div>
            <input
              className={inpStyle}
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
              className={`${inpStyle} w-full h-60 resize-none`}
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
            className='button select-none w-1/2 self-center text-center bg-principal-1 text-principal-gris border border-gray-400 text-black p-2 hover:bg-gray-200 hover:text-gray-600 transform ease-in duration-200 cursor-pointer '
            type='submit'
            value='Contactar'
          />
        </form>
      </div>
    </section>
  );
}
