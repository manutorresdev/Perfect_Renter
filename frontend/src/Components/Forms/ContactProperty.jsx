import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { CreateFormData, post } from '../../Helpers/Api';
import Email from './Inputs/Email';
import FirstName from './Inputs/FirstName';
import { TokenContext } from '../../Helpers/Hooks/TokenProvider';
import { Link } from 'react-router-dom';

export default function ContactProperty({
  form,
  property,
  setOverlay,
  user,
  pictures,
}) {
  const [Token] = useContext(TokenContext);
  const [message, setMessage] = useState({});
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: { email: user.email, name: user.name, tel: user.tel },
  });

  console.log('\x1b[43m########\x1b[30m', user, 'USUARIO');

  function onSubmit(body, e) {
    e.preventDefault();

    post(
      `http://localhost:4000/properties/${property.idProperty}/book`,
      CreateFormData(body),
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
          <h2>Ya esta listo!</h2>
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

  // Styles
  const inpStyle =
    'px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring';

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
        {message.status === 'error' && (
          <h1 className='title self-center select-none text-red-700'>
            {message.message}
          </h1>
        )}
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
                render={({ field: { onChange, name, ref, value } }) => {
                  return (
                    <FirstName
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
            {form === 'reservar' && (
              <label>
                <div className='select-none flex-col flex-center'>
                  Selecciona las fechas:
                </div>
                <input
                  className={inpStyle}
                  type='date'
                  name='startDate'
                  {...register('startDate', {
                    pattern: { message: 'indica la fecha de inicio' },
                  })}
                />
                <input
                  className={inpStyle}
                  type='date'
                  name='endDate'
                  {...register('endDate', {
                    pattern: {
                      massage: 'Ingresa la fecha final de la reserva',
                    },
                  })}
                />
              </label>
            )}
            <label>
              <div className='select-none'>Teléfono</div>
              <input
                className={inpStyle}
                type='tel'
                placeholder='Escribe aquí tu teléfono...'
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
                className={`${inpStyle} resize-none w-80`}
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
            <img className='w-40' src={pictures[0]} alt='imagen de perfil' />
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
