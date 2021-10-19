import { React, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { MenuElements } from './MenuElements';
import { Link } from 'react-router-dom';
import '../../index.css';
import '../../mediaQuery.css';

/**
 * Componente que construye el header.
 *
 * @component
 * @name Header
 * @returns Header de la página re-utilizable.
 */
export default function Header() {
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
          return (
            <li key={item.id}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className='menu-bar' id='menu-bar'>
        <FaIcons.FaBars onClick={showMenu} />
      </div>
      <Link className='user' to='/login'>
        Login
      </Link>
      <Link className='register' to='/register'>
        Register
      </Link>
    </nav>
  );
}
