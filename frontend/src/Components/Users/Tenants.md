```jsx
import React, { useContext, useEffect, useState, useRef } from 'react';
import { get, capitalizeFirstLetter } from '../../Helpers/Api';
import { TokenContext } from '../../Helpers/Hooks/TokenProvider';
import ContactTenant from '../Forms/ContactTenant';
import LoadingSkeleton from './LoadingSkeleton';
import Tenant from './Tenant';
import VoteForm from '../Forms/VoteForm';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { FaPlus, FaStar } from 'react-icons/fa';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { format } from 'date-fns';
import esEsLocale from 'date-fns/locale/es';
import { Box } from '@mui/system';

const [pickerValue, setPickerValue] = useState([null, null]);
const pMinVal = useRef();
function Filters({ setOverlay, Overlay }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      orden: '',
      direccion: '',
      ciudad: '',
    },
  });

  function onSubmit(body, e) {
    e.preventDefault();

    alert('Aquí no puedes filtrar ve a PerfectRenter.com.');
    if (window.innerWidth <= 650) {
      setOverlay({ show: false });
    }
  }

  const inputsLabelStyle = 'text-lg duration-200';
  const inputStyle =
    'bg-black bg-opacity-70 w-48 p-3 placeholder-yellow-300  mix-blend-multiply text-principal-1 font-light text-lg';
  return (
    <div
      className={`transform ${
        Overlay.show
          ? 'translate-y-0 opacity-100 '
          : '-translate-y-full opacity-0'
      }  lg:translate-y-0 bg-yellow-300 lg:bg-white lg:opacity-100 bg-opacity-70 overlay z-20 w-full h-full left-0 bottom-0 flex flex-col items-center pt-24 pb-14 overflow-scroll duration-300 lg:overflow-hidden lg:z-0 lg:mt-0 lg:static lg:py-10`}
    >
      <section className='filtros overflow-scroll overflow-x-hidden sm:overflow-hidden p-2 flex flex-col gap-5 w-10/12 sm:w-full bg-white sm:bg-none relative'>
        <button
          className='close-overlay absolute top-3 right-3 sm:hidden'
          onClick={() => {
            setOverlay({ show: false, form: '' });
          }}
        >
          <FaPlus className='transform rotate-45 ' />
        </button>
        <h1 className='title self-center select-none  font-semibold sm:text-gray-600 text-2xl underline'>
          Filtros
        </h1>
        <div className='filters-card-container flex justify-around flex-col-reverse gap-10 sm:flex-row'>
          <form
            className='flex flex-col gap-y-3 p-2 justify-start items-center'
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>
              <select
                name='orden'
                defaultValue=''
                {...register('orden')}
                className={inputStyle}
              >
                <option value='' disabled>
                  Filtrar por
                </option>
                <option value='edad' className='font-medium'>
                  Edad
                </option>
                <option value='creacion' className='font-medium'>
                  Fecha de ingreso
                </option>
                <option value='valoraciones' className='font-medium'>
                  Valoraciones
                </option>
              </select>
            </label>
            <label>
              <select
                name='direccion'
                {...register('direccion')}
                className={inputStyle}
              >
                <option value='' disabled>
                  Orden
                </option>
                <option value='ASC' className='font-medium'>
                  Ascendente
                </option>
                <option value='DESC' className='font-medium'>
                  Descendente
                </option>
              </select>
            </label>
            <div className={inputsLabelStyle}>Ciudad:</div>
            <label className='city'>
              <input
                {...register('ciudad', {
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
                type='text'
                name='ciudad'
                className={inputStyle}
                placeholder='Ciudad...'
              />
            </label>
            <div className='flex justify-center items-center self-center sticky bottom-0 w-full h-28 bg-white sm:bg-transparent'>
              <input
                type='submit'
                value='Aplicar filtros'
                className='btn-submit text-lg bg-none px-4 cursor-pointer font-medium text-principal-gris border-yellow-300 border-2 h-1/3 hover:bg-gray-Primary bg-principal-1 hover:border-white hover:text-principal-1 duration-300'
              />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

const Token = 1;
const [Overlay, setOverlay] = useState({
  shown: false,
  form: '',
  info: {},
});

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
const Users = [
  {
    idUser: 14,
    name: 'Julian',
    lastName: 'Rendon',
    city: 'Canarias',
    avatar: 'renter.jpg',
    votes: '5.0000',
    birthDate: '1990-01-01T00:00:00.000Z',
  },
  {
    idUser: 13,
    name: 'Perfect',
    lastName: 'Renter',
    city: 'Madrid',
    avatar: 'renter.jpg',
    votes: '3.0000',
    birthDate: '1990-01-01T00:00:00.000Z',
  },
  {
    idUser: 10,
    name: 'Marta',
    lastName: 'Nava',
    city: 'Taylorsville',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '2078-11-14T00:00:00.000Z',
  },
  {
    idUser: 18,
    name: 'Laura',
    lastName: 'Pausini',
    city: 'Telde',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '1990-06-01T00:00:00.000Z',
  },
  {
    idUser: 17,
    name: 'Fernando',
    lastName: 'Casas',
    city: 'Telde',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '1990-06-01T00:00:00.000Z',
  },
  {
    idUser: 16,
    name: 'Gloria',
    lastName: 'Valido',
    city: 'Telde',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '1990-06-01T00:00:00.000Z',
  },
  {
    idUser: 15,
    name: 'Rocio',
    lastName: 'Iglesias',
    city: 'A Coruña',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '1990-01-01T00:00:00.000Z',
  },
  {
    idUser: 12,
    name: 'Manu',
    lastName: 'Torres',
    city: 'Barcelona',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '1996-07-14T00:00:00.000Z',
  },
  {
    idUser: 11,
    name: 'Roser',
    lastName: 'Puente',
    city: 'Flower Mound',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '2048-06-24T00:00:00.000Z',
  },
  {
    idUser: 1,
    name: 'david',
    lastName: 'losas',
    city: 'A coruña',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '1900-01-30T00:00:00.000Z',
  },
];
const [Loaded, setLoaded] = useState(false);
const relation = [null, null, null];
const inputsLabelStyle = ' text-xl duration-200';
const inputStyle =
  'bg-black bg-opacity-70 w-48 p-3 placeholder-yellow-300  mix-blend-multiply text-principal-1 font-light text-lg';
const buttonStyle =
  'select-none w-1/2 self-center text-center bg-principal-1 text-principal-gris border border-yellow-300 text-black py-2 px-3 hover:bg-gray-Primary hover:text-principal-1 transform ease-in duration-200 cursor-pointer';
const IsFooterVisible = false;

<main className='pb-40 pt-20 flex w-full lg:max-w-customXL'>
  <section className='users-cont flex flex-col flex-grow'>
    <h1 className='text-4xl text-principal-gris shadow-lg pt-10 lg:pt-10 bg-principal-1 w-full p-10 font-semibold'>
      Inquilinos
    </h1>
    <div className='grid grid-cols-1 sm:grid-cols-2 grid-rows-auto gap-2 justify-items-center items-center pt-2'>
      {Users.length ? (
        Users.map((user) => {
          return (
            <article className='user-card lg:w-3/4 md:min-h-15rem xl:min-h-0 max-w-xs lg:max-w-lg lg:max-h-52 flex flex-col gap-2 text-xs shadow-lg p-4 bg-white bg-opacity-30'>
              <div className='flex flex-row flex-grow min-w-full'>
                <div className='user-info-cont flex items-center font-medium relative flex-grow-0 md:flex-grow'>
                  <button
                    className='user-avatar w-20 h-20 sm:w-32 sm:h-32 flex-grow'
                    to={`/inquilinos/${user.idUser}`}
                  >
                    <img
                      className='w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover'
                      src={'renter.jpg'}
                      alt={'perfil ' + user.name + user.lastName}
                    />
                    <div
                      className='flex text-xs self-center text-principal-1 justify-center'
                      id='calification'
                    >
                      {Array(parseInt(user.votes))
                        .fill(null)
                        .map((value, i) => {
                          return (
                            <FaStar
                              key={i}
                              className='text-principal-1'
                            ></FaStar>
                          );
                        })}
                    </div>
                  </button>
                </div>
                <div className='user-info flex flex-col w-40 sm:w-32 md:w-full'>
                  <button
                    className='self-start w-40 sm:w-32 md:w-full'
                    to={`/inquilinos/${user.idUser}`}
                  >
                    <div className='font-bold text-base  text-principal-gris py-1 pl-1 border-b-2 flex-grow'>
                      {capitalizeFirstLetter(user.name)}{' '}
                      {capitalizeFirstLetter(user.lastName)},{' '}
                      {new Date().getFullYear() -
                        new Date(user.birthDate).getFullYear()}
                    </div>
                    <span className='pl-2 font-medium text-sm'>
                      {user.city}
                    </span>
                  </button>
                  <p className='self-center p-1'>
                    {
                      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum amet natus eaque rem ad, minima iure.'
                    }
                  </p>
                </div>
              </div>
              {relation ? (
                <div className='buttons-cont flex gap-2 items-center justify-around w-full h-full'>
                  <button
                    className={buttonStyle}
                    onClick={() => {
                      setOverlay({ shown: true, info: user, form: 'contact' });
                    }}
                  >
                    Contactar
                  </button>
                  {relation.length > 0 && (
                    <button
                      className={buttonStyle}
                      onClick={() => {
                        setOverlay({
                          shown: true,
                          info: { ...user, relation: relation },
                          form: 'vote',
                        });
                      }}
                    >
                      Valorar
                    </button>
                  )}
                </div>
              ) : (
                ''
              )}
            </article>
          );
        })
      ) : (
        <div className='p-5 font-medium'>No hay inquilinos que mostrar.</div>
      )}
    </div>
  </section>
</main>;
```
