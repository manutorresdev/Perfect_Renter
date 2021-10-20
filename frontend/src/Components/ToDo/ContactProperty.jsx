import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import Email from '../Forms/Inputs/Email';
import FirstName from '../Forms/Inputs/FirstName';

export default function ContactProperty() {
  const [, setOverlay] = useState({ shown: false, propertyInfo: {} });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const propertyInfo = {
    city: 'Montmeló',
  };

  return (
    <div className='overlay z-10 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-20 overflow-scroll sm:overflow-hidden'>
      <section className='contact pt-2 border border-black flex flex-col gap-5  bg-white relative'>
        <button
          className='close-overlay absolute top-3 right-3'
          onClick={() => {
            setOverlay({ shown: false, propertyInfo: {} });
          }}
        >
          <FaPlus className='transform rotate-45' />
        </button>
        <h1 className='title self-center select-none'>Contacto</h1>
        <div className='contact-card-container flex justify-around flex-col-reverse gap-10 sm:flex-row '>
          <form
            className='flex flex-col gap-10 items-center'
            onSubmit={handleSubmit((data) => console.log(data))}
          >
            <label>
              <div className='select-none'> Nombre Completo*</div>

              <FirstName placeholder='Escribe aquí tu nombre....' />
            </label>
            <label>
              <div className='select-none'> Correo electrónico*</div>
              <Email className='p-2' placeholder='Escribe aquí tu email....' />
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
              {propertyInfo.city
                ? `Vivienda en ${propertyInfo.city}`
                : 'Vivienda en alquiler'}
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
