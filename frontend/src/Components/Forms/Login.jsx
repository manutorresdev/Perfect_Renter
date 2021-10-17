import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { post } from '../../Helpers/Api';
import useLocalStorage from '../../Helpers/Hooks/useLocalStorage';
import Email from './Inputs/Email';
import Password from './Inputs/Password';

export default function Login() {
  const [, setToken] = useLocalStorage('Token', '');

  // States
  const { handleSubmit, register, formState: errors } = useForm();
  const formFunctions = { register, errors };
  const [Error, setError] = useState('');

  // Enviar datos a backend
  function onSubmit(body) {
    post(
      'http://localhost:4000/users/login',
      body,
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

  return (
    <>
      <section className='mt-20 flex flex-col items-center gap-5 m-0 p-0'>
        <div className='title underline text-5xl m-0 p-0'>
          <h2>LOGIN</h2>
        </div>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <Email className='p-2' {...formFunctions} />
          <Password {...formFunctions} />
          {Error ? <div>{Error}</div> : ''}
          <input
            className='button select-none  text-center border border-gray-400 text-black rounded-full p-2 hover:bg-gray-200 hover:text-gray-600  transform ease-in duration-200 cursor-pointer '
            type='submit'
            value='Entrar'
          />
        </form>
      </section>
    </>
  );
}
