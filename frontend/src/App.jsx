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
import Property from './Components/Properties/Property';
import VoteForm from './Components/ToDo/VoteForm';
import RegisterEdit from './Components/Forms/RegisterEdit';

function App() {
  const [Token, setToken] = useContext(TokenContext);
  return (
    <>
      <Router>
        <NavBar token={Token} />
        <Switch>
          <Route path='/register'>
            {Token ? <Redirect to='/' /> : <RegisterEdit token={Token} />}
          </Route>
          <Route path='/login'>{Token ? <Redirect to='/' /> : <Login />}</Route>
          <Route path='/inquilinos/:idUser' component={UserProfile}></Route>
          <Route path='/inquilinos'>
            {Token ? <Tenants /> : <Redirect to='/' />}
          </Route>
          <Route path='/alquileres/:idProperty' component={Property} />
          <Route path='/alquileres'>
            <Properties />
          </Route>
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
          <Route path='/voteForm'>
            <VoteForm />
          </Route>
          {/* <Route path='/editar'>
            <Register token={Token} /> : <Redirect to='/' />
          </Route> */}
        </Switch>
        <Footer token={Token} setToken={setToken} />
      </Router>
    </>
  );
}

export default App;
