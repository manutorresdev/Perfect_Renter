import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreateFormData, post } from '../../Helpers/Api';
import Email from './Inputs/Email';
import FirstName from './Inputs/FirstName';
import { FaPlus } from 'react-icons/fa';

export default function ContactTenant({ userInfo, setOverlay, Token }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  function onSubmit(body, e) {
    e.preventDefault();

    post(
      `http://localhost:4000/users/${userInfo.idUser}/contact`,
      CreateFormData(body),
      (data) => {
        alert(data.message);
        window.location.reload();
      },
      (error) => {
        console.log(error);
      },
      Token
    );
  }

  return (
    <div className='overlay z-10 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-20 overflow-scroll sm:overflow-hidden'>
      <section className='contact pt-2 border border-black flex flex-col gap-5  bg-white relative'>
        <button
          className='close-overlay absolute top-3 right-3'
          onClick={() => {
            setOverlay({ shown: false, userInfo: {} });
          }}
        >
          <FaPlus className='transform rotate-45' />
        </button>
        <h1 className='title self-center select-none'>Contacto</h1>
        <div className='contact-card-container flex justify-around flex-col-reverse gap-10 sm:flex-row '>
          <form
            className='flex flex-col gap-10 items-center'
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
                    message:
                      'El nombre debe contener como mínimo 3 carácteres.',
                  },
                  maxLength: {
                    value: 30,
                    message: 'El nombre no puede tener más de 30 carácteres.',
                  },
                }}
                render={({ field: { onChange, name, ref } }) => {
                  return (
                    <FirstName
                      onChange={onChange}
                      inputRef={ref}
                      name={name}
                      className={''}
                    />
                  );
                }}
              />
              {errors.name && (
                <p className='text-red-500'>{errors.name.message}</p>
              )}
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
                    message:
                      'El email no puede contener más de 200 carácteres.',
                  },
                }}
                render={({ field: { onChange, name, ref } }) => {
                  return (
                    <Email
                      onChange={onChange}
                      inputRef={ref}
                      name={name}
                      className='px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full'
                    />
                  );
                }}
              />
              {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
              )}
            </label>
            <label>
              <div className='select-none'>Escoge el alquiler a ofrecer:</div>
              <select name='properties' {...register('property')}>
                <option default value='Ninguno' disabled>
                  Ninguno
                </option>
                {/* <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option> */}
              </select>
            </label>
            <label>
              <div className='select-none'>Teléfono</div>
              <input
                type='tel'
                name='phone'
                {...register('tel', {
                  pattern: {
                    value: /^\s?\+?\s?([0-9][\s]*){9,}$/,
                    message: 'Debes introducir un número de teléfono válido.',
                  },
                })}
              />
            </label>
            {errors.tel && <p className='text-red-500'>{errors.tel.message}</p>}
            <label>
              <div className='select-none'>Comentarios</div>
              <textarea
                className='w-10/12'
                name='comentarios'
                id='comentarios'
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

          <div className='perfil flex flex-col items-center justify-center'>
            <img
              className='w-40'
              src={require('../../Images/defProfile.png').default}
              alt='imagen de perfil'
            />
            <h2>
              {userInfo.name
                ? userInfo.name + ' ' + userInfo.lastName
                : 'Nombre de tenant'}
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
