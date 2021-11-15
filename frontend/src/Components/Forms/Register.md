```jsx
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreateFormData, post, put } from '../../Helpers/Api';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box } from '@mui/system';
import { format } from 'date-fns';
// Import inputs controlados
import Email from './Inputs/Email';
import Password from './Inputs/Password';
import FirstName from './Inputs/FirstName';
import {
  FaBookOpen,
  FaPlus,
  FaRegAddressCard,
  FaRegCalendarAlt,
  FaUserAlt,
} from 'react-icons/fa';

const usuario = {
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

const Token = false;

const {
  register,
  handleSubmit,
  formState: { errors },
  control,
  reset,
  watch,
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

const [DatePicker, setDatePicker] = useState(false);
const [Value, setDateValue] = useState([null, null]);
// Enviar datos a backend
function onSubmitRegister(body, e) {
  e.preventDefault();
  alert('Registrado con éxito.');
  reset();
}

function onSubmitEdited(body, e) {
  e.preventDefault();

  alert('Usuario editaado con éxito.');
}
const inpStyle =
  'px-3 py-3 placeholder-gray-400 text-gray-600 focus:cursor-default relative bg-white text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full cursor-pointer';
const buttonStyle =
  'select-none w-full self-center text-center bg-principal-1 text-principal-gris border border-yellow-300 text-black py-2 px-3 hover:bg-gray-Primary hover:text-principal-1 transform ease-in duration-200 cursor-pointer';

const registerComponentStyle = Token
  ? 'overlay z-20 bg-white bg-opacity-75 fixed w-full h-full min-h-full h-96 left-0 top-0 flex flex-col items-center pt-20 pb-10 overflow-auto sm:overflow-hidden'
  : 'bg-white bg-opacity-50';
const bio = watch('bio');

<div className={registerComponentStyle}>
  <section
    className={
      Token
        ? 'w-4/5 shadow-custom max-w-xl p-4 pt-14 border border-gray-700 flex  flex-col gap-5 mt-2 bg-gray-100 text-principal-gris overflow-y-auto relative'
        : 'pt-24 pb-32 flex flex-col items-center gap-5 p-2 text-principal-gris '
    }
  >
    {Token && (
      <button
        className='close-overlay absolute top-3 right-3 p-2'
        onClick={() => {
          setOverlay({ shown: false, userInfo: {} });
        }}
      >
        <FaPlus className='transform rotate-45 text-xl' />
      </button>
    )}
    <div className='title text-3xl p-4 border-b-4 self-center border-gray-700 flex justify-center w-5/6 select-none'>
      {Token ? <h2>EDITAR</h2> : <h2>REGISTRO</h2>}
    </div>
    <form
      className='flex flex-col gap-3 md:w-96 w-3/4'
      onSubmit={
        Token ? handleSubmit(onSubmitEdited) : handleSubmit(onSubmitRegister)
      }
    >
      {!Token && (
        <h3 className='flex gap-2 font-medium items-center'>
          <div className='p-2 rounded-full border-2 border-gray-600'>
            <FaUserAlt className='text-principal-1' />
          </div>
          Datos de ingreso:
        </h3>
      )}
      {Token && (
        <h3 className='flex gap-2 font-medium items-center'>
          <div className='p-2 rounded-full border-2 border-gray-800 bg-principal-1-hover'></div>
          Email:
        </h3>
      )}
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
      {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
      {!Token && <Password {...formFunctions} />}
      {!Token && (
        <h3 className='flex gap-2 font-medium items-center'>
          <div className='p-2 rounded-full border-2 border-gray-800'>
            <FaRegAddressCard className='text-principal-1' />
          </div>
          Información personal:
        </h3>
      )}
      {Token && (
        <h3 className='flex gap-2 font-medium items-center'>
          <div className='p-2 rounded-full border-2 border-gray-800 bg-principal-1-hover'></div>
          Nombre:
        </h3>
      )}
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
      {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
      {Token && (
        <h3 className='flex gap-2 font-medium items-center'>
          <div className='p-2 rounded-full border-2 border-gray-800 bg-principal-1-hover'></div>
          Apellidos:
        </h3>
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
            message: 'El apellido debe contener como mínimo 3 carácteres.',
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
      {Token && (
        <h3 className='flex gap-2 font-medium items-center'>
          <div className='p-2 rounded-full border-2 border-gray-800 bg-principal-1-hover'></div>
          Ciudad:
        </h3>
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
      {errors.city && <p className='text-red-500'>{errors.city.message}</p>}
      {Token && (
        <h3 className='flex gap-2 font-medium items-center'>
          <div className='p-2 rounded-full border-2 border-gray-800 bg-principal-1-hover'></div>
          Teléfono:
        </h3>
      )}
      <input
        className={inpStyle}
        type='tel'
        name='Teléfono'
        placeholder='Tlf'
        {...register('tel', {
          pattern: {
            value: /^\s?\+?\s?([0-9][0-9\s]*){9,}$/,
            message: 'Debes introducir un número de teléfono válido.',
          },
        })}
      />
      {errors.tel && <p className='text-red-500'>{errors.tel.message}</p>}
      {!Token && (
        <h3 className='flex gap-2 font-medium items-center'>
          <div className='p-2 rounded-full border-2 border-gray-800'>
            <FaBookOpen className='text-principal-1' />
          </div>
          Cuentanos algo sobre ti:
        </h3>
      )}
      {Token && (
        <h3 className='flex gap-2 font-medium items-center'>
          <div className='p-2 rounded-full border-2 border-gray-800 bg-principal-1-hover'></div>
          Biografía:
        </h3>
      )}
      <div className='relative'>
        <textarea
          className={inpStyle + ' h-40 resize-none'}
          type='text'
          name='bio'
          maxLength={250}
          placeholder='Bio'
          {...register('bio', {
            required: { value: false, message: 'Bio' },
            minLength: 0,
            maxLength: {
              value: 255,
              message: 'No puedes escribir más de 250 caracteres.',
            },
          })}
        />
        <p
          className={`${
            bio.length > 250 && 'text-red-500'
          } absolute right-5 bottom-5`}
        >
          {bio ? bio.length : 0}/250
        </p>
      </div>
      {!Token && (
        <h3 className='flex gap-2 font-medium items-center'>
          <div className='p-2 rounded-full border-2 border-gray-800'>
            <FaRegCalendarAlt className='text-principal-1' />
          </div>
          Fecha de nacimiento:
        </h3>
      )}
      {Token && (
        <h3 className='flex gap-2 font-medium items-center'>
          <div className='p-2 rounded-full border-2 border-gray-800 bg-principal-1-hover'></div>
          Fecha de nacimiento:
        </h3>
      )}

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label='Custom input'
          value={Value}
          open={DatePicker}
          onClose={(e) => {
            setDatePicker(false);
          }}
          onChange={(newValue) => {
            setDateValue(format(new Date(newValue), 'dd/MM/yyyy'));
            setValue('birthDate', format(new Date(newValue), 'yyyy/MM/dd'));
          }}
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <input
                className={inpStyle}
                ref={inputRef}
                readOnly={true}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                onClick={(e) => {
                  setDatePicker(true);
                }}
                autoComplete='new-password'
                {...inputProps}
                name='birthDate'
                placeholder='dd/mm/yyyy'
              />
            </Box>
          )}
        />
      </LocalizationProvider>

      {errors.birthDate && (
        <p className='text-red-500'>{errors.birthDate.message}</p>
      )}

      {Error ? <div className='text-red-500 font-medium'>{Error}</div> : ''}

      <input
        className='button select-none w-1/2 font-medium self-center text-center bg-principal-1 text-principal-gris border border-gray-400 text-black p-2 hover:bg-gray-200 hover:text-gray-600 transform ease-in duration-200 cursor-pointer'
        type='submit'
        value={Token ? 'Guardar' : 'Registrar'}
      />
    </form>
  </section>
</div>;
```
