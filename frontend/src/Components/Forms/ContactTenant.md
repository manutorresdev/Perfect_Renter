```jsx
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  capitalizeFirstLetter,
  CreateFormData,
  parseJwt,
  post,
} from '../../Helpers/Api';
import Email from './Inputs/Email';
import FirstName from './Inputs/FirstName';
import { FaPlus } from 'react-icons/fa';
import useProperties from '../../Helpers/Hooks/useProperties';

const User = {
  avatar: 'manu.jpg',
  bio: 'Biografia',
  birthDate: '1996-07-14T00:00:00.000Z',
  ciudad: 'Barcelona',
  createdAt: '2021-11-10T19:26:11.000Z',
  email: 'manutorres1996@gmail.com',
  idUser: 12,
  lastName: 'Torres',
  name: 'Manu',
  role: 'renter',
  tel: '666 666 666',
};

const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
  control,
  reset,
} = useForm();
const userProperties = [
  {
    idProperty: 1,
    idUser: 12,
    description:
      'Promoción de Obra nueva situada en Barcelona, exclusiva promoción de 22 viviendas con acabados de primera calidad, sistema de climatización de aerotermia de ahorro energético, suelos de parqué, piso de 90,30m² construidos, 2 habitaciones dobles y 1 individual, 2 baños completos, cocina independiente con salida al balcón, amplio comedor con salida al balcón, con parking opcional ! Ven a pedir bookingrmación !',
    city: 'Barcelona',
    province: 'Barcelona',
    address: 'Carrer del Riu',
    zipCode: '08480',
    number: 9,
    type: 'piso',
    stair: '0',
    elevator: null,
    flat: 1,
    gate: '3',
    mts: '90.00',
    rooms: 3,
    garage: 0,
    terrace: 0,
    toilets: 2,
    energyCertificate: 0,
    availabilityDate: '2021-11-10T00:00:00.000Z',
    price: '650.00',
    state: 'disponible',
    votes: '3.0000',
    createdAt: '2021-11-10T19:26:11.000Z',
  },
  {
    idProperty: 2,
    idUser: 12,
    description:
      'Últimos apartamentos en nuestra promoción Santa Clara 11.Se encuentra instalada en una de las mejores zonas del casco antiguo de Girona, frente al río Onyar. El objetivo de Zenit Houses es transformar el edificio denso de oficinas de los años 70 en una nueva tipología de vida dinámica. Se propone un nuevo patio de luces. Se piensa como un espacio moderno, transparente y luminoso, abierto al cielo. Como corazón de construcción, proporciona luz, ventilación y carácter a las viviendas y al público. Se define en bloques de vidrio siguiendo la tradición de la galería norte-europea, tal como sucede en la Viennese Otto Wagner modernist DS. Las tipologías de viviendas variadas están abiertas tanto en la calle como en el patio. Los diferentes niveles están ocupados con múltiples experiencias de vida. La antigua estructura flexible se adapta a los nuevos tiempos, y también desarrolla una nueva fachada en la calle, que muestra el carácter renovado de Girona. Los apartamentos están listos para entrar a vivir, cocinas totalmente completas con los electrodomésticos integrados incluidos.',
    city: 'Girona',
    province: 'Girona',
    address: 'Carrer de Costa Rica',
    zipCode: '17001',
    number: 9,
    type: 'duplex',
    stair: '1',
    elevator: 1,
    flat: 2,
    gate: '2',
    mts: '85.00',
    rooms: 2,
    garage: 0,
    terrace: 0,
    toilets: 1,
    energyCertificate: 0,
    availabilityDate: '2021-11-10T00:00:00.000Z',
    price: '300.00',
    state: 'disponible',
    votes: '0.0000',
    createdAt: '2021-11-10T19:26:11.000Z',
  },
];

function onSubmit(body, e) {
  e.preventDefault();
  alert('Correo enviado con éxito.');
  reset();
}

// Styles
const inpStyle =
  'px-3 py-3 w-full placeholder-gray-400 text-gray-600 relative bg-white text-sm border border-gray-400 outline-none focus:outline-none focus:ring';
const comentarios = watch('comentarios');
const buttonStyle =
  'select-none w-full self-center text-center bg-principal-1 text-principal-gris border border-yellow-300 text-black py-2 px-3 hover:bg-gray-Primary hover:text-principal-1 transform ease-in duration-200 cursor-pointer';

<div className='overlay z-30 bg-white bg-opacity-75 w-full h-full left-0 top-0 flex flex-col items-center pt-24 pb-2 overscroll-scroll sm:overflow-hidden'>
  <section className='contact drop-shadow-2xl filter pt-2 flex flex-col gap-5 bg-white relative text-principal-gris overflow-y-auto sm:w-3/4 w-11/12'>
    <button className='close-overlay absolute top-3 p-5 right-2'>
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
                message: 'El nombre debe contener como mínimo 3 carácteres.',
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
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
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
            defaultValue='Ninguno'
            className={inpStyle}
            {...register('property')}
          >
            <option default value='Ninguno' disabled>
              Ninguno
            </option>
            {userProperties.length > 0 &&
              userProperties.map((property) => {
                return (
                  <option
                    key={property.idProperty}
                    value={`${property.idProperty}`}
                  >
                    {capitalizeFirstLetter(property.type)} en {property.city},{' '}
                    {property.address} {property.number}{' '}
                  </option>
                );
              })}
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
        <label className='relative '>
          <div className='select-none'>Comentarios</div>
          <textarea
            className={`${inpStyle} resize-none`}
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

        <input className={buttonStyle} type='submit' value='Contactar' />
      </form>

      <div className='perfil w-full self-center flex flex-col items-center justify-center'>
        <img
          className='w-2/4 rounded-full'
          src={User.avatar}
          alt='imagen de perfil'
        />
        <h2 className='informacion w-5/6 bg-gray-Primary bg-opacity-25 text-2xl text-principal-1 flex justify-center'>
          {User.name ? User.name + ' ' + User.lastName : 'Nombre de tenant'}
        </h2>
      </div>
    </div>
  </section>
</div>;
```
