// import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaAngleLeft, FaAngleRight, FaPlus } from 'react-icons/fa';
import { CreateFormData, post, get } from '../../Helpers/Api';
import Email from './Inputs/Email';
import FirstName from './Inputs/FirstName';
import { TokenContext } from '../../Helpers/Hooks/TokenProvider';
import { Box } from '@mui/system';
import DateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { addDays, format } from 'date-fns';
import esEsLocale from 'date-fns/locale/es';
import { useContext, useEffect, useState } from 'react';

export default function ContactProperty({
  form,
  property,
  setOverlay,
  user,
  pictures,
  setMessage,
  message,
  Slider,
}) {
  const [curr, setCurr] = useState(0);
  const [Value, setPickerValue] = useState([null, null]);
  const [Token] = useContext(TokenContext);

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
  const [Bookings, setBookings] = useState();
  const [days, setDays] = useState([]);

  useEffect(() => {
    get(
      `http://192.168.5.103:4000/properties/${property.idProperty}/bookings`,
      (data) => {
        setBookings(data);
      },
      (error) => {
        console.log(error);
      },
      Token
    );
  }, [Token, property.idProperty]);

  // ARRAY FECHAS MANU
  const arrayFechas = [];
  if (Bookings) {
    console.log(Bookings);
    for (const book of Bookings.bookings) {
      let day = book.startBookingDate;
      arrayFechas.push('START BOOKING ' + book.idBooking);
      while (
        new Date(day).toLocaleDateString() <=
        new Date(book.endBookingDate).toLocaleDateString()
      ) {
        // setDays([...days, new Date(day).toLocaleDateString()]);
        arrayFechas.push(new Date(day).toLocaleDateString());

        day = addDays(new Date(day), 1);
      }
      arrayFechas.push(`FIN BOOKING ${book.idBooking}`);
    }
  }
  // ARRAY FECHAS MANU

  function onSubmit(body, e) {
    e.preventDefault();
    if (form === 'reservar') {
      post(
        `http://192.168.5.103:4000/properties/${property.idProperty}/book`,
        CreateFormData(body),
        (data) => {
          setMessage(data);
          setOverlay({ form: '', shown: false, propertyInfo: {} });
        },
        (error) => {
          console.log(error);
          setMessage(error);
        },
        Token
      );
    } else if (form === 'contact') {
      post(
        `http://192.168.5.103:4000/properties/${property.idProperty}/contact`,
        CreateFormData(body),
        (data) => {
          setMessage({ status: data.status, message: data.message });
          setOverlay({ form: '', show: false, propertyInfo: {} });
        },
        (error) => {
          console.log(error);
          setMessage(error);
        },
        Token
      );
    }
  }

  function right() {
    setCurr(curr === Slider.SlideImgs.length - 1 ? 0 : curr + 1);
  }

  function left() {
    setCurr(curr === 0 ? Slider.SlideImgs.length - 1 : curr - 1);
  }

  if (message.status === 'ok') {
    return (
      <div className='z-20 fixed w-full h-full left-0 top-0 flex flex-col items-center py-24 overflow-scroll sm:overflow-hidden'>
        <section className='contact py-5 px-5 border border-black flex flex-col gap-5  bg-white relative items-center'>
          <h2>Ya esta listo!</h2>
          <h2>{message.message}</h2>
          <button
            className='border-2 py-1 px-3 bg-yellow-400 hover:bg-gray-500 hover:text-white'
            onClick={() => {
              setOverlay({ form: '', shown: false, propertyInfo: {} });
            }}
          >
            Cerrar
          </button>
        </section>
      </div>
    );
  }

  // Styles
  const inpStyle =
    'px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring';
  const comentarios = watch('comentarios');

  return (
    <div className='overlay z-20 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center pt-24 pb-2 px-2 overscroll-scroll sm:overflow-hidden'>
      <section className='contact shadow-custom pt-2 border-2 border-gray-700 flex flex-col gap-5 bg-gray-100 relative text-principal-gris overflow-y-scroll w-full md:w-3/4'>
        <button
          className='close-overlay absolute top-3 p-5 right-2'
          onClick={() => {
            setOverlay({ form: '', shown: false, propertyInfo: {} });
          }}
        >
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
        <div className='contact-card-container flex justify-around flex-col-reverse gap-10 lg:flex-row'>
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
            <label className='max-w-sm'>
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
                      className={inpStyle + ' w-full'}
                    />
                  );
                }}
              />
            </label>
            {form === 'reservar' && (
              <label className='flex flex-col gap-2'>
                <div className='select-none'>Selecciona las fechas:</div>

                <LocalizationProvider
                  locale={esEsLocale}
                  dateAdapter={AdapterDateFns}
                >
                  <DateRangePicker
                    disablePast
                    autoOk={true}
                    label='Advanced keyboard'
                    value={Value}
                    shouldDisableDate={(date) =>
                      date.getTime() === new Date('2021-11-13').getTime()
                    }
                    inputFormat='dd/MM/yyyy'
                    onChange={(newValue) => {
                      if (
                        new Date(newValue[0]).getTime() >
                        new Date(newValue[1]).getTime()
                      ) {
                        console.error(
                          'Fecha de entrada mayor a fecha de salida'
                        );
                      } else if (
                        new Date(newValue[0]).getTime() ===
                        new Date(newValue[1]).getTime()
                      ) {
                        console.error('Selecciona fechas diferentes');
                      } else {
                        console.warn('FECHAS CORRECTAS');
                        setPickerValue(newValue);

                        // console.log(format(newValue[0], 'yyyy/MM/dd'));
                        setValue(
                          'startDate',
                          format(newValue[0], 'yyyy/MM/dd')
                        );
                        setValue('endDate', format(newValue[1], 'yyyy/MM/dd'));
                      }
                    }}
                    renderInput={(startProps, endProps) => (
                      <div className='flex flex-col  sm:flex-row'>
                        <input
                          className={inpStyle}
                          name='startDate'
                          ref={startProps.inputRef}
                          {...startProps.inputProps}
                        />
                        <Box className='p-2 font-medium self-center'> a </Box>
                        <input
                          className={inpStyle}
                          name='endDate'
                          ref={endProps.inputRef}
                          {...endProps.inputProps}
                        />
                      </div>
                    )}
                  />
                </LocalizationProvider>
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
            <label className='relative w-full sm:w-min pr-2'>
              <div className='select-none'>Comentarios</div>
              <textarea
                className={`${inpStyle} resize-none w-full sm:w-80`}
                name='comments'
                id='comments'
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

          <div className='perfil w-full self-center flex flex-col items-center justify-center'>
            <div className='slider flex flex-col items-center justify-center '>
              <div
                className={`slider-cont ${
                  Slider.Photo ? 'h-full' : 'h-96'
                }  transition-all transform ease-linear duration-300`}
              >
                <button
                  onClick={right}
                  className={`${Slider.sliderButtonStyle} right-0`}
                >
                  <FaAngleRight />
                </button>
                <button
                  onClick={left}
                  className={`${Slider.sliderButtonStyle} left-0`}
                >
                  <FaAngleLeft />
                </button>
                <div
                  ref={Slider.slider}
                  className={`slider-cont overflow-hidden h-full flex transition-all transform ease-in}`}
                >
                  {/* Hacer un map con los path que nos llegan pintando img */}
                  {Slider.SlideImgs.map((img, i) => {
                    return (
                      <img
                        key={i}
                        className={`${
                          i === curr ? '' : 'absolute opacity-0'
                        } object-cover w-full duration-300 cursor-pointer`}
                        src={img}
                        alt='default'
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <h2 className='informacion w-full bg-gray-Primary bg-opacity-25 text-2xl text-principal-1 flex justify-center'>
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
