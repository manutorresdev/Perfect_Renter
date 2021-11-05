import React, { useContext } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
// Global comps
import { Home } from './Components/Global/Home';
import NavBar from './Components/Global/NavBar';
// User comps
import Tenants from './Components/Users/Tenants';
// Properties comps
import Properties from './Components/Properties/Properties';
import ManageBooking from './Components/Properties/ManageBooking';
// Form comps
import Register from './Components/Forms/Register';
import Login from './Components/Forms/Login';
import ContactUs from './Components/Forms/ContactUs';
import RecoverPass from './Components/Forms/RecoverPass';
import ResetPass from './Components/Forms/ResetPass';
import { TokenContext } from './Helpers/Hooks/TokenProvider';
import Footer from './Components/Global/Footer';
import UserProfile from './Components/Users/UserProfile';
import Profile from './Components/Users/Profile';
import VerifyUser from './Components/Users/VerifyUser';
import Filters from './Components/Properties/Filters';
import PropertyInfo from './Components/Properties/PropertyInfo';
import Nosotros from './Components/Global/Nosotros';

function App() {
  const [Token, setToken] = useContext(TokenContext);

  return (
    <>
      <Router>
        <NavBar token={Token} setToken={setToken} />
        <Switch>
          <Route path='/register'>
            {Token ? <Redirect to='/' /> : <Register token={Token} />}
          </Route>
          <Route path='/login'>{Token ? <Redirect to='/' /> : <Login />}</Route>
          <Route path='/inquilinos/:idUser' component={UserProfile}></Route>
          <Route path='/inquilinos'>
            {Token ? <Tenants /> : <Redirect to='/' />}
          </Route>
          <Route
            exact
            path='/alquileres/:idProperty'
            render={(routeProps) => (
              <PropertyInfo {...routeProps} token={Token} />
            )}
          />
          <Route exact path='/alquileres' component={Properties} />
          <Route
            exact
            path='/alquileres/:bookingCode/accept'
            component={ManageBooking}
          />
          <Route
            exact
            path='/alquileres/:bookingCode/cancel'
            component={ManageBooking}
          />
          <Route path='/contacto'>
            <ContactUs />
          </Route>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route
            exact
            path='/recuperar/:idUser/:recoverCode'
            component={ResetPass}
          />
          <Route
            exact
            path='/verificar/:registrationCode'
            component={VerifyUser}
          />
          <Route path='/recuperar'>
            <RecoverPass />
          </Route>
          <Route path='/perfil'>
            {Token ? (
              <Profile setToken={setToken} token={Token} />
            ) : (
              <Redirect to='/' />
            )}
          </Route>
          <Route path='/filters'>
            <Filters />
          </Route>
          <Route path='/nosotros'>
            <Nosotros />
          </Route>
        </Switch>
        <Footer token={Token} setToken={setToken} />
      </Router>
    </>
  );
}

export default App;
