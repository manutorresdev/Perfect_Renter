import { React, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { MenuElements } from './MenuElements';
import { Link } from 'react-router-dom';

export default function NavBar({ token, setToken }) {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const showMenu = () => setMostrarMenu(!mostrarMenu);

  const buttonStyle =
    'text-center bg-principal-1 min-w-min p-1 cursor-pointer hover:text-white hover:font-bold hover:p-2 duration-300';

  return (
    <nav className='navbar bg-gray-Primary grid grid-cols-9 gap-5 items-center font-light h-20 fixed top-0 w-full z-50'>
      <Link to='/' className='logo w-10 p-1 col-start-2 col-end-3'>
        <img
          src='/Images/logo-pr-amarillo.png'
          alt='logo Perfect renter'
          id='logo'
        />
      </Link>
      <ul
        className={`sm:text-base sm:static sm:flex-row sm:justify-around sm:gap-0 sm:col-start-3 sm:col-end-7 sm:bg-transparent sm:p-0 absolute top-20 ${
          mostrarMenu ? 'right-0' : '-right-full'
        } text-2xl flex flex-col gap-20 p-5 items-center max-w-full bg-gray-Primary duration-300`}
        id='menu'
      >
        {MenuElements.map((item) => {
          if (item.id === 3 && !token) {
            return (
              <li
                key={item.id}
                className='text-gray-400 select-none pointer-events-none cursor-default '
              >
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          } else {
            return (
              <li
                key={item.id}
                className='text-principal-1 cursor-pointer hover:text-white duration-300 ease-in-out'
              >
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          }
        })}
      </ul>
      <div
        className='block sm:hidden absolute top-6 right-6 text-3xl cursor-pointer'
        id='menu-bar'
      >
        <FaIcons.FaBars onClick={showMenu} />
      </div>
      {token ? (
        <>
          <Link
            to='/perfil'
            className={`${buttonStyle} flex items-center justify-around`}
          >
            <FaIcons.FaUser />
            <span>Perfil</span>
          </Link>
        </>
      ) : (
        <>
          <Link
            className={`${buttonStyle} col-start-4 col-end-6 row-start-1 sm:col-start-7 sm:col-end-8  `}
            to='/login'
          >
            Login
          </Link>

          <Link
            className={`${buttonStyle} col-start-6 col-end-8 row-start-1 sm:col-start-8 sm:col-end-9`}
            to='/register'
          >
            Register
          </Link>
        </>
      )}
    </nav>
  );
}
