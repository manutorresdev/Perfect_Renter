import React, { useContext, useEffect, useState } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  useLocation
} from 'react-router-dom'
// Global comps
import { Home } from './Components/Global/Home'
import NavBar from './Components/Global/NavBar'
// User comps
import Tenants from './Components/Users/Tenants'
// Properties comps
import Properties from './Components/Properties/Properties'
import ManageBooking from './Components/Properties/ManageBooking'
// Form comps
import Register from './Components/Forms/Register'
import Login from './Components/Forms/Login'
import ContactUs from './Components/Forms/ContactUs'
import RecoverPass from './Components/Forms/RecoverPass'
import ResetPass from './Components/Forms/ResetPass'
import { TokenContext } from './Helpers/Hooks/TokenProvider'
import Footer from './Components/Global/Footer'
import UserProfile from './Components/Users/UserProfile'
import Profile from './Components/Users/Profile'
import VerifyUser from './Components/Users/VerifyUser'
import Filters from './Components/Properties/Filters'
import PropertyInfo from './Components/Properties/PropertyInfo'
import Nosotros from './Components/Global/Nosotros'
import useUser from './Helpers/Hooks/useUser'

function ScrollToTop () {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App () {
  const [Token, setToken] = useContext(TokenContext)
  const [User] = useUser()
  const [IsFooterVisible, setIsFooterVisible] = useState(false)

  return (
    <>
      <Router>
        <ScrollToTop />
        <NavBar token={Token} setToken={setToken} />
        <Switch>
          <Route path='/registro'>
            {Token
              ? (
                <Redirect to='/' />
                )
              : (
                <Register token={Token} User={User} />
                )}
          </Route>
          <Route path='/login'>{Token ? <Redirect to='/' /> : <Login />}</Route>
          <Route path='/inquilinos/:idUser' component={UserProfile} />
          <Route path='/inquilinos'>
            {Token
              ? (
                <Tenants IsFooterVisible={IsFooterVisible} />
                )
              : (
                <Redirect to='/' />
                )}
          </Route>
          <Route
            exact
            path='/alquileres/:idProperty'
            render={(routeProps) => (
              <PropertyInfo
                {...routeProps}
                token={Token}
                User={User}
                IsFooterVisible={IsFooterVisible}
              />
            )}
          />
          <Route
            exact
            path='/alquileres'
            render={(props) => (
              <Properties IsFooterVisible={IsFooterVisible} {...props} />
            )}
          />

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
            {Token
              ? (
                <Profile setToken={setToken} token={Token} />
                )
              : (
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
        <Footer
          token={Token}
          setToken={setToken}
          setIsFooterVisible={setIsFooterVisible}
          IsFooterVisible={IsFooterVisible}
        />
      </Router>
    </>
  )
}

export default App
