import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './Components/Global/Login';
import NavBar from './Components/Global/NavBar';
import Tenants from './Components/Users/Tenants';
import Properties from './Components/Properties/Properties';
import Register from './Components/Global/Register';
import { Home } from './Components/Global/Home';
// import { TokenContext } from './Helpers/Hooks/TokenProvider';

function App() {
  // const users = Array(15).fill(null);

  return (
    <>
      <Router>
        <NavBar />
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
    </>
  );
}


export default App;
