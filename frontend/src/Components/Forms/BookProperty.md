```jsx
// import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaAngleLeft, FaAngleRight, FaPlus } from 'react-icons/fa';
import { CreateFormData, post, get } from '../../Helpers/Api';
import Email from './Inputs/Email';
import FirstName from './Inputs/FirstName';
import { TokenContext } from '../../Helpers/Hooks/TokenProvider';
import { Box, styled } from '@mui/system';
import DateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { addDays, format } from 'date-fns';
import esEsLocale from 'date-fns/locale/es';
import { useContext, useEffect, useState } from 'react';
import MuiDateRangePickerDay from '@mui/lab/DateRangePickerDay';
import CalendarPickerSkeleton from '@mui/lab/CalendarPickerSkeleton';
import Carousel from 'react-material-ui-carousel';

const Token = true;
const form = 'reservar',
  property = {
    idProperty: 1,
    idUser: 12,
    description:
      'Promoción de Obra nueva situada en Barcelona, exclusiva promoción de 22 viviendas con acabados de primera calidad, sistema de climatización de aerotermia de ahorro energético, suelos de parqué, piso de 90,30m² construidos, 2 habitaciones dobles y 1 individual, 2 baños completos, cocina independiente con salida al balcón, amplio comedor con salida al balcón, con parking opcional ! Ven a pedir información !',
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
  user = {
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
  },
  pictures = ['llaves-de-la-casa-10.jpg', 'portada-nosotros.jpg', 'flat.jpg'],
  setMessage = '',
  message = '',
  Slider = {
    SlideImgs: ['llaves-de-la-casa-10.jpg', 'portada-nosotros.jpg', 'flat.jpg'],
  };

const [Value, setPickerValue] = useState([null, null]);
const Bookings = [
  {
    address: 'Calle España',
    bookingCode: 'reserva5',
    city: 'Madrid',
    endBookingDate: '2021-10-20T00:00:00.000Z',
    idBooking: 5,
    idProperty: 5,
    number: 1,
    photo: 'flat.jpg',
    price: '2000.00',
    rooms: 3,
    startBookingDate: '2021-10-15T00:00:00.000Z',
    state: 'finalizada',
    type: 'duplex',
    votes: '2.0000',
  },
  {
    address: 'Calle España',
    bookingCode: 'reserva5',
    city: 'Madrid',
    endBookingDate: '2021-10-20T00:00:00.000Z',
    idBooking: 5,
    idProperty: 5,
    number: 1,
    photo: 'flat.jpg',
    price: '2000.00',
    rooms: 3,
    startBookingDate: '2021-10-15T00:00:00.000Z',
    state: 'finalizada',
    type: 'duplex',
    votes: '2.0000',
  },
];

const {
  handleSubmit,
  watch,
  register,
  setValue,
  formState: { errors },
  control,
} = useForm({
  defaultValues: {
    email: user.email,
    name: user.name,
    tel: user.tel,
  },
});

// ARRAY FECHAS MANU
const arrayFechas = [];
if (Bookings) {
  for (let i = 0; i < Bookings.length; i++) {
    let day = Bookings[i].startBookingDate;
    while (
      new Date(day).toLocaleDateString() <=
      new Date(Bookings[i].endBookingDate).toLocaleDateString()
    ) {
      arrayFechas.push(new Date(day).toLocaleDateString());

      day = addDays(new Date(day), 1);
    }
  }
}
// ARRAY FECHAS MANU

function onSubmit(body, e) {
  e.preventDefault();

  setMessage('Correo electrónico enviado con éxito');
}

// Styles
const inpStyle =
  'px-3 py-3 w-full placeholder-gray-400 text-gray-600 relative bg-white text-sm border border-gray-400 outline-none focus:outline-none focus:ring';
const comentarios = watch('comentarios');

function DatePicker({
  Value,
  setPickerValue,
  setValue,
  inpStyle,
  arrayFechas,
}) {
  const [TriggerDatePicker, setTriggerDatePicker] = useState(false);
  return (
    <LocalizationProvider locale={esEsLocale} dateAdapter={AdapterDateFns}>
      <DateRangePicker
        disablePast
        autoOk
        label='Advanced keyboard'
        value={Value}
        open={TriggerDatePicker}
        onClose={() => {
          setTriggerDatePicker(false);
        }}
        shouldDisableDate={(date) =>
          arrayFechas.includes(format(date, 'dd/MM/yyyy')) ||
          arrayFechas.includes(format(date, 'd/MM/yyyy'))
        }
        renderLoading={() => <CalendarPickerSkeleton />}
        inputFormat='dd/MM/yyyy'
        onChange={(newValue) => {
          if (
            new Date(newValue[0]).getTime() > new Date(newValue[1]).getTime()
          ) {
            console.error('Fecha de entrada mayor a fecha de salida');
          } else if (
            new Date(newValue[0]).getTime() === new Date(newValue[1]).getTime()
          ) {
            console.error('Selecciona fechas diferentes');
          } else {
            console.warn('FECHAS CORRECTAS');

            if (
              newValue[0] &&
              !isNaN(newValue[0].getTime()) &&
              newValue[1] &&
              !isNaN(newValue[1].getTime())
            ) {
              setPickerValue(newValue);
              setTriggerDatePicker(false);
            }
          }
        }}
        renderInput={(startProps, endProps) => (
          <div
            className='flex flex-col  sm:flex-row'
            onClick={(e) => {
              setTriggerDatePicker(true);
            }}
          >
            <input
              className={inpStyle}
              name='startDate'
              autoComplete='new-password'
              ref={startProps.inputRef}
              {...startProps.inputProps}
            />
            <Box className='p-2 font-medium self-center'> a </Box>
            <input
              className={inpStyle}
              name='endDate'
              autoComplete='new-password'
              ref={endProps.inputRef}
              {...endProps.inputProps}
            />
          </div>
        )}
      />
    </LocalizationProvider>
  );
}

<div className='overlay z-30 bg-white bg-opacity-70 w-full h-full left-0 top-0 flex flex-col items-center pt-32 pb-2 px-2 overflow-auto sm:overflow-hidden'>
  <section className='contact p-8 shadow-perfil pt-2 flex flex-col gap-5 bg-white relative text-principal-gris overflow-y-auto w-full md:w-full'>
    <button className='close-overlay absolute top-3 p-5 right-2'>
      <FaPlus className='transform scale-150 rotate-45' />
    </button>
    <h1 className='title text-3xl p-4 border-b-4 self-center border-gray-700 flex justify-center w-5/6 select-none'>
      {form === 'reservar' ? 'Reservar' : 'Contacto'}
    </h1>
    {message.status === 'error' && (
      <h1 className='title self-center select-none text-red-700'>
        {message.message}
      </h1>
    )}
    <div className='contact-card-container flex justify-around flex-col-reverse gap-2 lg:flex-row'>
      <form
        className='flex flex-col gap-10 md:gap-3 items-center font-medium w-full pb-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className=' w-11/12'>
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
                  className={inpStyle}
                />
              );
            }}
          />
        </label>
        <label className='w-11/12'>
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
                  className={inpStyle + ' w-full'}
                />
              );
            }}
          />
        </label>
        {form === 'reservar' && (
          <label className='flex flex-col w-11/12 gap-2'>
            <div className='select-none'>Selecciona las fechas:</div>
            <DatePicker
              Value={Value}
              setPickerValue={setPickerValue}
              setValue={setValue}
              inpStyle={inpStyle}
              arrayFechas={arrayFechas}
            />
          </label>
        )}
        <label className='w-11/12'>
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
        <label className='relative w-11/12 sm:w-11/12'>
          <div className='select-none'>Comentarios</div>
          <textarea
            className={`${inpStyle} resize-none w-full`}
            name='comments'
            cols='30'
            rows='10'
            maxLength='250'
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

      <div className='property-cont w-full self-center flex flex-col items-center justify-center'>
        <div className='slider w-full sm:max-w-custom md:max-w-none relative'>
          <Carousel
            navButtonsAlwaysVisible
            indicators={false}
            autoPlay={false}
            animation='slide'
            NavButton={({ onClick, className, style, next, prev }) => {
              if (next) {
                return (
                  <FaAngleRight
                    onClick={onClick}
                    className='absolute z-10 text-white text-3xl cursor-pointer hover:text-principal-1 hover:bg-gray-800 hover:bg-opacity-5 h-full shadow-md right-0 pr-2 duration-200'
                  >
                    {next && 'Next'}
                  </FaAngleRight>
                );
              } else {
                return (
                  <FaAngleLeft
                    onClick={onClick}
                    className='absolute z-10 text-white text-3xl cursor-pointer hover:text-principal-1 hover:bg-gray-800 hover:bg-opacity-5 h-full shadow-md left-0 pl-2 duration-200'
                  >
                    {prev && 'Previous'}
                  </FaAngleLeft>
                );
              }
            }}
            className='slider-cont min-w-xxs h-48 sm:h-96 transition-all transform ease-in'
          >
            {Slider.SlideImgs.length > 0 ? (
              Slider.SlideImgs.map((img, i) => {
                return (
                  <img
                    key={Math.random()}
                    className='object-cover w-full h-96'
                    src={img}
                    alt='default'
                  />
                );
              })
            ) : (
              <img
                className='object-cover w-full h-96'
                src='https://www.arquitecturaydiseno.es/medio/2020/10/19/casa-prefabricada-de-hormipresa-en-el-boecillo-valladolid-realizada-con-el-sistema-arctic-wall-de-paneles-estructurales-con-el-acabado-incorporado_6f2a28cd_1280x794.jpg'
                alt='default home'
              />
            )}
          </Carousel>
        </div>

        <h2 className='informacion w-full bg-gray-Primary bg-opacity-25 text-2xl text-principal-1 flex justify-center'>
          {property.city
            ? `Vivienda en ${property.city}`
            : 'Vivienda en alquiler'}
        </h2>
      </div>
    </div>
  </section>
</div>;
```
