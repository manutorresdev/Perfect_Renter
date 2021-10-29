import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { post } from '../../Helpers/Api';
import Email from './Inputs/Email';
import FirstName from './Inputs/FirstName';
import { TokenContext } from '../../Helpers/Hooks/TokenProvider';
import { Link } from 'react-router-dom';

export default function ContactProperty({ form, property, setOverlay }) {
  const [Token] = useContext(TokenContext);
  const [message, setMessage] = useState({});
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const formFunctions = {
    register,
    errors,
  };

  function onSubmit(body, e) {
    e.preventDefault();
    post(
      `http://192.168.5.103:4000/properties/${property.idProperty}/book`,
      body,
      (data) => {
        alert(data.message);
        setMessage(data);
        setOverlay({ form: '', shown: false, propertyInfo: {} });
      },
      (error) => {
        console.log(error);
        setMessage(error);
      },
      Token
    );
  }
  if (message.status === 'ok') {
    return (
      <div className='fixed w-full h-full left-0 top-0 flex flex-col items-center py-20 overflow-scroll sm:overflow-hidden'>
        <section className='contact py-5 px-5 border border-black flex flex-col gap-5  bg-white relative items-center'>
          <h2>Ya esta listo!!!</h2>
          <h2>{message.message}</h2>
          <Link
            to='/'
            className='border-2 py-1 px-3 bg-yellow-400 hover:bg-gray-500 hover:text-white'
          >
            Cerrar
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className='overlay z-10 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-20 overflow-scroll sm:overflow-hidden'>
      <section className='contact pt-2 border border-black flex flex-col gap-5  bg-white relative'>
        <button
          className='close-overlay absolute top-3 right-3'
          onClick={() => {
            setOverlay({ form: '', shown: false, propertyInfo: {} });
          }}
        >
          <FaPlus className='transform rotate-45' />
        </button>
        <h1 className='title self-center select-none'>Contacto</h1>
        {message.status === 'error' ? (
          <h1 className='title self-center select-none text-red-700'>
            {message.message}
          </h1>
        ) : (
          ''
        )}
        <div className='contact-card-container flex justify-around flex-col-reverse gap-10 sm:flex-row '>
          <form
            className='flex flex-col gap-10 items-center'
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>
              <div className='select-none'> Nombre Completo*</div>

              <FirstName
                {...formFunctions}
                placeholder='Escribe aquí tu nombre....'
              />
            </label>
            <label>
              <div className='select-none'> Correo electrónico*</div>
              <Email
                {...formFunctions}
                className='p-2'
                placeholder='Escribe aquí tu email....'
              />
            </label>
            {form === 'reservar' ? (
              <label>
                <div className='select-none flex-col flex-center'>
                  Selecciona las fechas:
                </div>
                <input
                  type='date'
                  name='startDate'
                  {...register('startDate', {
                    pattern: { message: 'indica la fecha de inicio' },
                  })}
                />
                <input
                  type='date'
                  name='endDate'
                  {...register('endDate', {
                    pattern: {
                      massage: 'Ingresa la fecha final de la reserva',
                    },
                  })}
                />
              </label>
            ) : (
              ''
            )}
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
              {property.city
                ? `Vivienda en ${property.city}`
                : 'Vivienda en alquiler'}
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
