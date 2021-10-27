import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { post, put } from '../../Helpers/Api';

// Import inputs controlados
import Email from './Inputs/Email';
import Password from './Inputs/Password';
import FirstName from './Inputs/FirstName';
import { FaPlus } from 'react-icons/fa';

export default function Register({ Token, usuario, setOverlay }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm(
    Token
      ? {
          defaultValues: {
            email: usuario.email,
            name: usuario.name,
            lastName: usuario.lastName,
            city: usuario.ciudad,
            tel: usuario.tel,
            bio: usuario.bio,
            birthDate: new Date(usuario.birthDate).toISOString().substr(0, 10),
          },
        }
      : {
          defaultValues: {
            email: '',
            name: '',
            lastName: '',
            city: '',
            tel: '',
            bio: '',
            birthDate: '',
          },
        }
  );
  const formFunctions = { register, errors };

  // States
  const [Error, setError] = useState('');

  // Enviar datos a backend
  function onSubmitRegister(body, e) {
    e.preventDefault();

    post(
      'http://localhost:4000/users',
      body,
      (data) => {
        console.log('Success');
        alert(data.message);
        window.location.reload();
        reset();
        setOverlay({ shown: false, userInfo: {} });
      },
      (data) => {
        setError(data.message);
      },
      Token
    );
  }

  function onSubmitEdited(body, e) {
    e.preventDefault();
    console.log(body);
    put(
      `http://localhost:4000/users/${usuario.idUser}`,
      body,
      (data) => {
        console.log('Success');
        alert(data.message);
        reset();
      },
      (error) => {
        setError(error.message);
      },
      Token
    );
  }
  const inpStyle =
    'px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full';

  const registerComponentStyle = Token
    ? 'overlay z-10 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-20 overflow-scroll sm:overflow-hidden'
    : '';
  return (
    <>
      <div className={registerComponentStyle}>
        <section
          className={
            Token
              ? 'contact pt-2 p-20 border border-black flex flex-col gap-5  bg-white relative'
              : 'mt-20 flex flex-col items-center gap-5 p-2'
          }
        >
          {Token ? (
            <button
              className='close-overlay absolute top-3 right-3'
              onClick={() => {
                setOverlay({ shown: false, userInfo: {} });
              }}
            >
              <FaPlus className='transform rotate-45' />
            </button>
          ) : (
            ''
          )}
          <div className='title underline text-5xl m-0 p-0'>
            {Token ? <h2>Editar</h2> : <h2>REGISTER</h2>}
          </div>

          <form
            className='flex flex-col gap-3'
            onSubmit={
              Token
                ? handleSubmit(onSubmitEdited)
                : handleSubmit(onSubmitRegister)
            }
          >
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
                    defaultValue={Token ? usuario.email : ''}
                    onChange={onChange}
                    inputRef={ref}
                    name={name}
                    className={inpStyle}
                  />
                );
              }}
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
            {Token ? '' : <Password {...formFunctions} />}
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
                    className={inpStyle}
                  />
                );
              }}
            />
            {errors.name && (
              <p className='text-red-500'>{errors.name.message}</p>
            )}
            <input
              className={inpStyle}
              type='text'
              name='lastName'
              placeholder='Apellidos*'
              {...register('lastName', {
                required: 'Debes escribir un apellido.',
                pattern: {
                  value:
                    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                  message:
                    'El apellido no puede contener carácteres especiales ni números.',
                },
                minLength: {
                  value: 3,
                  message:
                    'El apellido debe contener como mínimo 3 carácteres.',
                },
                maxLength: {
                  value: 30,
                  message: 'El apellido no puede tener más de 30 carácteres.',
                },
              })}
            />
            {errors.lastName && (
              <p className='text-red-500'>{errors.lastName.message}</p>
            )}
            <input
              className={inpStyle}
              type='text'
              name='city'
              placeholder='City*'
              {...register('city', {
                required: 'Debes escribir la ciudad donde resides.',
                pattern: {
                  value:
                    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                  message:
                    'La ciudad no puede contener carácteres especiales ni números.',
                },
                maxLength: {
                  value: 30,
                  message: 'La ciudad no puede tener más de 50 carácteres.',
                },
              })}
            />
            {errors.city && (
              <p className='text-red-500'>{errors.city.message}</p>
            )}
            <input
              className={inpStyle}
              type='tel'
              name='Teléfono'
              placeholder='Tlf'
              {...register('tel', {
                pattern: {
                  value: /^\s?\+?\s?([0-9\s]*){9,}$/,
                  message: 'Debes introducir un número de teléfono válido.',
                },
              })}
            />
            {errors.tel && <p className='text-red-500'>{errors.tel.message}</p>}
            <input
              className={inpStyle + ' h-20'}
              type='text'
              name='bio'
              placeholder='Bio'
              {...register('bio', {
                required: { value: false, message: 'Bio' },
                minLength: 0,
                maxLength: {
                  value: 255,
                  message: 'No puedes escribir más de 250 carácteres.',
                },
              })}
            />
            <input
              className={inpStyle}
              type='date'
              name='birthDate'
              placeholder='Fecha de nacimiento*'
              {...register('birthDate', {
                required: 'Debes añadir la fecha de nacimiento.',
                pattern: {
                  value: /^[0-9].*$/,
                  message: 'Debes añadir una fecha de nacimiento correcta.',
                },
              })}
            />
            {errors.birthDate && (
              <p className='text-red-500'>{errors.birthDate.message}</p>
            )}

            {Error ? <div>{Error}</div> : ''}

            <input
              className='button select-none  text-center border border-gray-400 text-black rounded-full p-2 hover:bg-gray-200 hover:text-gray-600 transform ease-in duration-200 cursor-pointer '
              type='submit'
              value={Token ? 'Guardar' : 'Registrar'}
            />
          </form>
        </section>
      </div>
    </>
  );
}
