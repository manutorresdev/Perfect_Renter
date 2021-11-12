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

  const inputsLabelStyle =
    'sm:text-gray-600 sm:hover:text-principal-1 text-xl duration-200';
  const inputStyle =
    'bg-gray-Primary px-2 placeholder-yellow-300 border border-gray-600 border-opacity-40 text-principal-1 font-medium';
  return (
    <div
      className={`transform ${
        Overlay.show
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0'
      } sm:translate-y-0 sm:opacity-100 overlay z-20 w-full h-full fixed left-0 top-0 flex flex-col items-center py-24 overflow-scroll duration-300 sm:overflow-hidden sm:z-0 sm:mt-0 sm:static sm:py-10`}
    >
      <section className='filtros sm:bg-transparent overflow-scroll overflow-x-hidden sm:overflow-hidden pt-2 border-black sm:border-transparent flex flex-col gap-5 w-10/12 sm:w-full bg-white relative'>
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
        <div className='filters-card-container flex justify-around flex-col-reverse gap-10 sm:flex-row '>
          <form
            className='flex flex-col gap-4 p-2'
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
                  Asc
                </option>
                <option value='DESC' className='font-medium'>
                  Desc
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
                className='btn-submit text-xl bg-none p-2 font-medium text-principal-gris border-gray-700 border-2 h-2/4 hover:bg-gray-Primary bg-principal-1 hover:border-white hover:text-principal-1 duration-300'
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
    name: 'Marta Nieves Sr.',
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
    name: 'Roser Puente',
    lastName: 'Colunga',
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
  {
    idUser: 9,
    name: 'Jordi Carbajal',
    lastName: 'Bonilla',
    city: 'Poinciana',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '2050-08-31T00:00:00.000Z',
  },
  {
    idUser: 8,
    name: 'Laura Prado V',
    lastName: 'Saavedra',
    city: 'Citrus Heights',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '2003-10-03T00:00:00.000Z',
  },
  {
    idUser: 7,
    name: 'Matilde Abeyta',
    lastName: 'Espinal',
    city: 'Lynchburg',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '2084-07-19T00:00:00.000Z',
  },
  {
    idUser: 6,
    name: 'Lorena Lerma',
    lastName: 'Alaníz',
    city: 'Decatur',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '2024-04-27T00:00:00.000Z',
  },
  {
    idUser: 5,
    name: 'Anni Paredes',
    lastName: 'Rivas',
    city: 'Pine Bluff',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '2060-07-10T00:00:00.000Z',
  },
  {
    idUser: 4,
    name: 'Manuel Casas',
    lastName: 'Barajas',
    city: 'Eagan',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '2081-08-18T00:00:00.000Z',
  },
  {
    idUser: 3,
    name: 'Matilde Casillas',
    lastName: 'Solís',
    city: 'Lawrence',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '2008-11-10T00:00:00.000Z',
  },
  {
    idUser: 2,
    name: 'Manuel Carrión',
    lastName: 'Partida',
    city: 'Conroe',
    avatar: 'renter.jpg',
    votes: '0.0000',
    birthDate: '2036-12-25T00:00:00.000Z',
  },
];
const [Loaded, setLoaded] = useState(false);
const relation = [null, null, null];
const inputsLabelStyle = ' text-xl duration-200';
const inputStyle =
  'bg-gray-Primary px-2 placeholder-yellow-300 border border-gray-600 border-opacity-40 text-principal-1 font-medium';

<main className='pb-28 pt-20 flex w-full'>
  {Overlay.form === 'contact' && (
    <ContactTenant setOverlay={setOverlay} info={Overlay.info} Token={Token} />
  )}
  {Overlay.form === 'vote' && (
    <VoteForm setOverlay={setOverlay} info={Overlay.info} Token={Token} />
  )}
  <aside
    className={`bg-gray-Primary w-min sm:bg-transparent relative flex-grow-0 sm:static right-0 top-20 mt-5 sm:top-0 ${
      Overlay.form ? 'z-0' : 'z-20'
    }`}
  >
    <button
      className='text-white text-xl w-10 min-w-min h-full p-2 sm:hidden'
      onClick={() => {
        setOverlay({ show: true });
      }}
    >
      Filtros
    </button>

    <div className='relative'>
      <div
        className={`transform w-full h-full flex flex-col items-center pt-24 overflow-scroll duration-300 sm:overflow-hidden sm:z-0 sm:mt-0 sm:static sm:py-10`}
      >
        <section className='filtros shadow-custom sm:shadow-none overflow-scroll overflow-x-hidden sm:overflow-hidden pt-2 border border-black sm:border-transparent flex flex-col gap-5 w-10/12 sm:w-full bg-white sm:bg-none relative'>
          <button
            className='close-overlay absolute top-3 right-3 sm:hidden'
            onClick={() => {
              setOverlay({ show: false, form: '' });
            }}
          >
            <FaPlus className='transform rotate-45 ' />
          </button>
          <h1 className='title self-center select-none font-semibold text-principal-gris  text-2xl underline'>
            Filtros
          </h1>
          <div className='filters-card-container flex justify-around flex-col-reverse gap-10 sm:flex-row '>
            <form
              className='flex flex-col gap-4 p-2'
              onSubmit={() => {
                alert('No puedes filtrar aquí.');
              }}
            >
              <label>
                <select name='orden' defaultValue='' className={inputStyle}>
                  <option value='' disabled>
                    Filtrar por
                  </option>
                  <option value='creacion' className='font-medium'>
                    Fecha de creacion
                  </option>
                  <option value='valoraciones' className='font-medium'>
                    Valoraciones
                  </option>
                </select>
              </label>
              <label>
                <select name='direccion' className={inputStyle}>
                  <option value='' disabled>
                    Orden
                  </option>
                  <option value='ASC' className='font-medium'>
                    Asc
                  </option>
                  <option value='DESC' className='font-medium'>
                    Desc
                  </option>
                </select>
              </label>
              <div className={inputsLabelStyle}>Ciudad:</div>
              <label className='city'>
                <input
                  type='text'
                  name='ciudad'
                  className={inputStyle}
                  placeholder='Ciudad...'
                />
              </label>
              <div className='flex justify-center items-center self-center sticky bottom-0 w-full h-28 bg-white sm:bg-transparent'>
                <input
                  type='submit'
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  value='Aplicar filtros'
                  className='btn-submit text-xl bg-none p-2 font-medium text-principal-gris border-gray-700 border-2 h-2/4 hover:bg-gray-Primary bg-principal-1 hover:border-white hover:text-principal-1 duration-300'
                />
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  </aside>
  <section className='users-cont flex flex-col flex-grow'>
    <h1 className='text-4xl text-principal-gris shadow-lg pt-10 md:pt-10 bg-principal-1 w-full p-10 font-semibold'>
      Inquilinos
    </h1>
    <div className='flex flex-col gap-5 justify-center items-center pt-2'>
      {Users.length ? (
        Users.map((user) => {
          return (
            <article
              key={Math.random()}
              className='user-card max-w-3xl flex gap-2 text-xs shadow-custom items-center p-1 bg-gray-100 bg-opacity-30'
            >
              <div className='user-info-cont flex items-center font-medium relative flex-grow-0 md:flex-grow w-9/12'>
                <button
                  className='user-avatar '
                  to={`/inquilinos/${user.idUser}`}
                >
                  <img
                    className='w-32 h-28 rounded-full object-scale-down'
                    src={user.avatar}
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
                            key={Math.random()}
                            className='text-principal-1'
                          ></FaStar>
                        );
                      })}
                  </div>
                </button>
              </div>
              <div className='user-info flex flex-col flex-grow min-w-min'>
                <button
                  className='self-start w-full'
                  to={`/inquilinos/${user.idUser}`}
                >
                  <div className='font-bold text-base  text-principal-gris py-1 pl-1 border-b-2 flex-grow w-max'>
                    {capitalizeFirstLetter(user.name)}{' '}
                    {capitalizeFirstLetter(user.lastName)},{' '}
                    {Math.abs(
                      new Date().getFullYear() -
                        new Date(user.birthDate).getFullYear()
                    )}
                  </div>
                  <span className='pl-2 font-medium text-sm'>{user.city}</span>
                </button>
                <p className='self-center p-1'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum amet natus eaque rem ad, minima iure.
                </p>
              </div>

              {relation ? (
                <div className='buttons-cont flex flex-col gap-1 items-end justify-around w-full h-full'>
                  <button className='bg-principal-1 px-5 hover:px-7 duration-300  py-2 font-medium rounded-bl-md rounded-tl-md'>
                    Contactar
                  </button>
                  {relation.length > 0 && (
                    <button className='bg-principal-1 px-7 hover:px-8 duration-300 py-2 fm font-medium rounded-bl-md rounded-tl-md'>
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
