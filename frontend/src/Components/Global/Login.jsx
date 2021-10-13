import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { post } from '../../Helpers/Api';
import useLocalStorage from '../../Helpers/Hooks/useLocalStorage';

export default function Login() {
  const [, setToken] = useLocalStorage('Token', '');
  // States
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [Error, setError] = useState('');

  // Enviar datos a backend
  function onSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      console.error('Faltan campos.');
    } else {
      console.log('Enviando...');

      post(
        'http://localhost:4000/users/login',
        {
          email,
          password,
        },
        (data) => {
          console.log(data);
          setToken(data.token);
          console.log('Success');
          alert(data.message);
          <Redirect to='/home' />;
        },
        (data) => {
          setError(data.message);
        }
      );
    }
  }

  return (
    <>
      <div className='mt-20 flex flex-col items-center gap-5 m-0 p-0'>
        <div className='title underline text-5xl m-0 p-0'>
          <h2>LOGIN</h2>
        </div>
        <form className='flex flex-col gap-3' onSubmit={onSubmit}>
          <input
            type='email'
            name='email'
            placeholder='Email'
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            required
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />

          {Error ? <div>{Error}</div> : ''}

          <input
            className='button select-none  text-center border border-gray-400 text-black rounded-full p-2 hover:bg-gray-200 hover:text-gray-600  transform ease-in duration-200 cursor-pointer '
            type='submit'
            value='Entrar'
          />
        </form>
      </div>
    </>
  );
}
