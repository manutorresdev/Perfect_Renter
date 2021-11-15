import { React, useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { MenuElements } from './MenuElements';
import { Link, useHistory } from 'react-router-dom';

export default function NavBar({ token, setToken }) {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const showMenu = () => setMostrarMenu(!mostrarMenu);
  const [width, setWidth] = useState(window.innerWidth);
  const [selectedLocation, setSelectedLocation] = useState();
  const history = useHistory();

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    const path = history.location.pathname.split('/')[1];
    if (path) {
      setSelectedLocation(path);
    } else {
      setSelectedLocation('');
    }
  }, [history.location.pathname, selectedLocation]);

  const buttonStyle =
    'select-none w-full self-center text-center bg-principal-1 text-principal-gris border border-yellow-300 text-black py-2 px-3 hover:bg-gray-Primary hover:text-principal-1 transform ease-in duration-200 cursor-pointer';

  return (
    <nav className='navbar flex-grow-0 bg-gray-Primary grid grid-cols-9 gap-5 items-center font-light h-20 fixed top-0 w-full z-50 '>
      <Link
        to='/'
        className='logo w-10 p-1 sm:col-start-1 sm:col-end-2 col-start-2 justify-self-end xl:justify-self-center'
      >
        <img
          src='/Images/logo-amarillo-primary.png'
          alt='logo Perfect renter'
          id='logo'
        />
      </Link>
      {width <= 637 && (
        <div
          onClick={() => {
            setMostrarMenu(false);
          }}
          className={`Menu toggler animate-fadeIn ${
            mostrarMenu ? 'static' : 'hidden'
          } absolute h-screen w-screen bg-gray-700 top-0 left-0 bottom-0 right-0 bg-opacity-20 duration-300 z-10 cursor-pointer`}
        ></div>
      )}
      <ul
        className={`navBar
        sm:text-lg sm:static sm:flex-row sm:justify-self-start sm:col-start-2 sm:col-end-8 sm:bg-transparent sm:p-0 sm:justify-around sm:w-full
        lg:text-xl lg:justify-self-center lg:col-start-2 lg:col-end-8 lg:justify-evenly
        xl:col-start-2 xl:col-end-8 xl:justify-self-end xl:justify-around
        ${
          mostrarMenu ? 'right-0' : '-right-full'
        } text-2xl flex flex-col p-5 items-center bg-gray-Primary duration-300 absolute top-20 z-20`}
        id='menu'
      >
        {MenuElements.map((item) => {
          if (item.id === 3 && !token) {
            return (
              <li
                key={item.id}
                className='text-gray-400 select-none pointer-events-none cursor-default py-10 w-full sm:w-auto text-center sm:p-0'
              >
                <Link to={item.path} onClick={showMenu}>
                  {item.title}
                </Link>
              </li>
            );
          } else {
            return (
              <li
                // onClick={(e) => {
                //   setSelectedLocation(item.title);
                // }}
                key={item.id}
                className={`text-principal-1 ${
                  selectedLocation === item.title.toLocaleLowerCase()
                    ? 'underline'
                    : ''
                } cursor-pointer hover:text-white duration-300 ease-in-out py-6 w-full sm:w-auto text-center sm:p-0`}
              >
                <Link to={item.path} onClick={showMenu}>
                  {item.title}
                </Link>
              </li>
            );
          }
        })}
        {token && (
          <button
            className={`block sm:hidden text-white p-1 hover:text-principal-1 sm:col-start-8 md:col-start-9 md:col-end-10 justify-self-start py-10 w-full sm:w-auto sm:justify-self-end md:justify-self-center`}
            onClick={() => {
              setToken('');
              window.location.reload();
            }}
          >
            Salir
          </button>
        )}
      </ul>
      <div
        className='text-gray-300 block sm:hidden absolute top-6 right-4 text-3xl cursor-pointer'
        id='menu-bar'
      >
        <FaIcons.FaBars onClick={showMenu} />
      </div>
      {token ? (
        <div
          className={` col-start-4 col-end-7 justify-between flex gap-2 row-start-1 sm:col-start-8 sm:col-end-10 sm:justify-self-center md:justify-self-auto`}
        >
          <Link
            to='/perfil'
            className={`${buttonStyle} relative pr-5 flex items-center gap-3 justify-between`}
          >
            <FaIcons.FaUser className='' />
            <span className='flex-grow font-medium'>Perfil</span>
          </Link>
          <button
            className={`hidden sm:block text-white  hover:text-principal-1 w-full justify-self-start sm:justify-self-end lg:justify-self-center`}
            onClick={() => {
              setToken('');
              window.location.reload();
            }}
          >
            Salir
          </button>
        </div>
      ) : (
        <div
          className={` col-start-3 col-end-8 justify-between flex gap-2 row-start-1 sm:col-start-8 sm:col-end-10 sm:justify-self-center md:justify-self-auto`}
        >
          <Link className={`${buttonStyle} `} to='/login'>
            Acceso
          </Link>
          <Link className={`${buttonStyle} `} to='/registro'>
            Registro
          </Link>
        </div>
      )}
    </nav>
  );
}
