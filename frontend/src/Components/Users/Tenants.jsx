import React, { useContext, useEffect, useState } from 'react';
import { get, parseJwt } from '../../Helpers/Api';
import { TokenContext } from '../../Helpers/Hooks/TokenProvider';
import ContactTenant from '../Forms/ContactTenant';
import LoadingSkeleton from './LoadingSkeleton';
import Tenant from './Tenant';
import VoteForm from '../Forms/VoteForm';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { FaChevronRight, FaPlus } from 'react-icons/fa';

export default function UsersList() {
  const [Bookings, setBookings] = useState([]);
  const [Token] = useContext(TokenContext);
  const [Overlay, setOverlay] = useState({
    shown: false,
    form: '',
    userInfo: {},
  });
  const [Users, setUsers] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const location = useLocation();

  // Necesario estar logueado
  useEffect(() => {
    if (location.search) {
      get(
        `http://192.168.5.103:4000/users${location.search}`,
        (data) => {
          if (data.message !== 'No hay conicidencias para su busqueda') {
            setUsers(data.users);
            setLoaded(true);
          } else {
            setUsers([]);
          }
        },
        (error) => console.log(error),
        Token
      );
    } else {
      get(
        'http://192.168.5.103:4000/users',
        (data) => {
          if (data.message !== 'No hay conicidencias para su busqueda') {
            setUsers(data.users);
            setLoaded(true);
          } else {
            setUsers([]);
          }
          // setUsers(data.users);
          // setLoaded(true);
        },
        (error) => console.log(error),
        Token
      );
    }

    get(
      `http://192.168.5.103:4000/users/${
        parseJwt(Token).idUser
      }/bookings/renter`,
      (data) => {
        setBookings(data.bookings);
      },
      (error) => {
        console.log(error);
      },
      Token
    );
  }, [Token, location.search]);

  return (
    <main className='pb-28 pt-20 flex'>
      {Overlay.form === 'contact' && (
        <ContactTenant
          setOverlay={setOverlay}
          userInfo={Overlay.userInfo}
          Token={Token}
        />
      )}
      {Overlay.form === 'vote' && (
        <VoteForm setOverlay={setOverlay} info={Overlay.info} Token={Token} />
      )}
      <aside
        className={`bg-gray-Primary w-min sm:bg-transparent flex-grow-0 sm:static absolute left-0 top-20 sm:top-0`}
      >
        <FaChevronRight
          className='text-white text-xl w-10 h-full p-2 sm:hidden'
          onClick={() => {
            setOverlay({ show: true });
          }}
        />
        <Filters setOverlay={setOverlay} Overlay={Overlay} />
      </aside>
      <section className='users-cont flex flex-col'>
        <h1 className='text-4xl text-principal-gris shadow-lg pt-10 md:pt-10 bg-principal-1 w-full p-10 font-semibold'>
          Inquilinos
        </h1>
        <div className='flex flex-col gap-5 justify-center items-center'>
          {!Loaded &&
            Array(10)
              .fill(null)
              .map((el, i) => <LoadingSkeleton key={i} />)}
          {Users.length ? (
            Users.map((user) => {
              return (
                <Tenant
                  relation={Bookings.filter(
                    (bookings) => bookings.idTenant === user.idUser
                  )}
                  user={user}
                  key={user.idUser}
                  setOverlay={setOverlay}
                />
              );
            })
          ) : (
            <div className='p-5 font-medium'>
              No hay inquilinos que mostrar.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Filters({ setOverlay, Overlay }) {
  const history = useHistory();

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

    const queryString = Object.keys(body)
      .filter((val) => body[val].length > 1)
      .map((key) => {
        return `${key}=${body[key]}`;
      })
      .join('&');

    console.log(history.location);
    if (history.location.pathname.length > 12) {
      history.replace('/inquilinos?' + queryString);
    }
    history.push('?' + queryString);

    if (window.innerWidth <= 650) {
      setOverlay({ show: false });
    }
  }

  /**
   * copy of form whit bg white, input gray and text yellow
   * const inputsLabelStyle =
    'sm:text-gray-600 sm:hover:text-principal-1 text-xl duration-200';
  const inputStyle =
    'bg-gray-Primary px-2 placeholder-yellow-300 border border-gray-600 border-opacity-40 text-principal-1 font-medium';
   */
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
      <section className='filtros sm:bg-transparent overflow-scroll overflow-x-hidden sm:overflow-hidden pt-2 border border-black sm:border-transparent flex flex-col gap-5 w-10/12 sm:w-full bg-white relative'>
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
                defaultValue={Filters.ciudad ?? ''}
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
              {errors.city && (
                <p className='text-red-500'>{errors.city.message}</p>
              )}
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
