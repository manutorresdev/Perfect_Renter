import React from 'react';
import Header from './Components/Header';
import LoadingSkeleton from './Components/Users/LoadingSkeleton';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import Register from './Components/Register';
import Logo from './Components/global/Logo';

function App() {
  // const users = Array(15).fill(null);

  return (
    <Router>
      <Header>
        <Link to='/home'>
          <Logo />
        </Link>
      </Header>
      <ul>
        <li>
          <Link to='/register'>Register</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path='/home'>
          <main className='flex item-center justify-center'>
            <h1 className='text-4xl'>Perfect Renter</h1>
          </main>
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/'>
          <Redirect to='/home'></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
