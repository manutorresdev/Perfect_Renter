import { React, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { MenuElements } from './MenuElements';
import { Link } from 'react-router-dom';
import '../../index.css';
import '../../mediaQuery.css';

export default function NavBar({ token }) {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const showMenu = () => setMostrarMenu(!mostrarMenu);

  return (
    <nav className='navbar'>
      <Link to='/' className='logo'>
        <img
          src='/Images/logo-pr-amarillo.png'
          alt='logo Perfect renter'
          id='logo'
        />
      </Link>
      <ul className={mostrarMenu ? 'menu menu-toggle' : 'menu'} id='menu'>
        {MenuElements.map((item) => {
          if (item.id === 3 && !token) {
            return (
              <li
                key={item.id}
                className='text-gray-400 select-none pointer-events-none cursor-default'
              >
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          } else {
            return (
              <li key={item.id} className='text-principal-1'>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          }
        })}
      </ul>
      <div className='menu-bar' id='menu-bar'>
        <FaIcons.FaBars onClick={showMenu} />
      </div>
      {token ? (
        <>
          <Link to='/perfil' className='user flex items-center justify-around'>
            <FaIcons.FaUser />
            <span>Perfil</span>
          </Link>
        </>
      ) : (
        <>
          <Link className='user' to='/login'>
            Login
          </Link>

          <Link className='register' to='/register'>
            Register
          </Link>
        </>
      )}
    </nav>
  );
}
