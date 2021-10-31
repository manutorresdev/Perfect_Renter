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
    watch,
    formState: { errors },
    control,
  } = useForm();

  function onSubmit(body, e) {
    e.preventDefault();

    post(
      `http://192.168.5.103:4000/users/${userInfo.idUser}/contact`,
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
  // Styles
  const inpStyle =
    'px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring';
  const comentarios = watch('comentarios');

  return (
    <div className='overlay z-20 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-24 overscroll-scroll sm:overflow-hidden'>
      <section className='contact pt-2 border-2 border-gray-700 flex flex-col gap-5 bg-gray-100 relative text-principal-gris overflow-y-scroll md:w-3/4'>
        <button
          className='close-overlay absolute top-3 p-5 right-2'
          onClick={() => {
            setOverlay({ shown: false, userInfo: {} });
          }}
        >
          <FaPlus className='transform scale-150 rotate-45' />
        </button>
        <h1 className='title text-3xl p-4 border-b-4 self-center border-gray-700 flex justify-center w-5/6 select-none'>
          Contacto
        </h1>
        <div className='contact-card-container flex justify-around flex-col-reverse gap-10 sm:flex-row '>
          <form
            className='flex flex-col gap-10 md:gap-3 pl-2 font-medium w-full pb-4'
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
                      className={inpStyle}
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
                      className={`${inpStyle} pr-20`}
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
              <select
                name='properties'
                className={inpStyle}
                {...register('property')}
              >
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
                className={inpStyle}
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
            <label className='relative w-min'>
              <div className='select-none'>Comentarios</div>
              <textarea
                className={`${inpStyle} resize-none w-80`}
                name='comentarios'
                id='comentarios'
                cols='30'
                maxLength='250'
                rows='10'
                {...register('comentarios', {
                  required: 'Debes añadir algún comentario.',
                  maxLength: {
                    value: 250,
                    message: 'No puedes escribir más de 250 carácteres.',
                  },
                })}
              ></textarea>
              <p className='absolute right-5 bottom-5'>
                {comentarios ? comentarios.length : 0}/250
              </p>
            </label>
            {errors.comentarios && (
              <p className='text-red-500'>{errors.comentarios.message}</p>
            )}

            <input
              className='button select-none w-1/2 self-center text-center bg-principal-1 text-principal-gris border border-gray-400 text-black p-2 hover:bg-gray-200 hover:text-gray-600 transform ease-in duration-200 cursor-pointer'
              type='submit'
              value='Contactar'
            />
          </form>

          <div className='perfil w-full self-center flex flex-col items-center justify-center'>
            <img
              className=''
              src={require('../../Images/defProfile.png').default}
              alt='imagen de perfil'
            />
            <h2 className='informacion w-full bg-gray-Primary bg-opacity-25 text-2xl text-principal-1 flex justify-center'>
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
