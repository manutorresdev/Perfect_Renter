import { React, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { MenuElements } from './MenuElements';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Tenants from '../Users/Tenants';
import Properties from '../Properties/Properties';
import { Home } from './Home';
import '../../index.css';
import '../../mediaQuery.css';

export default function NavBar() {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const showMenu = () => setMostrarMenu(!mostrarMenu);

  return (
    <Router>
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
      <Switch>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/inquilinos'>
          <Tenants />
        </Route>
        <Route path='/alquileres'>
          <Properties />
        </Route>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/load'></Route>
      </Switch>
    </Router>
  );
}
