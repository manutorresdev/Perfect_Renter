import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { post } from '../../Helpers/Api';

export default function Register() {
  // States
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [Error, setError] = useState('');

  // Enviar datos a backend
  function onSubmit(e) {
    e.preventDefault();

    if (!email || !password || !name || !lastName) {
      console.error('Faltan campos.');
    } else {
      console.log('Enviando...');

      post(
        'http://localhost:4000/users',
        {
          name,
          lastName,
          email,
          password,
          bio,
          city,
          birthDate,
        },
        (data) => {
          console.log('Success');
          alert(data.message);
          <Redirect to='/' />;
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
          <h2>REGISTER</h2>
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
          <input
            type='text'
            name='name'
            placeholder='First Name'
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />

          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            required
            onChange={(e) => {
              console.log(e.target.value);
              setLastName(e.target.value);
            }}
          />
          <input
            type='text'
            name='city'
            placeholder='City'
            required
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <input
            className='h-20'
            type='text'
            name='bio'
            placeholder='Bio'
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
          <input
            type='date'
            name='birthDate'
            placeholder='BirthDate'
            required
            onChange={(e) => {
              console.log(e.target.value);
              setBirthDate(e.target.value);
            }}
          />

          {Error ? <div>{Error}</div> : ''}

          <input
            className='button select-none  text-center border border-gray-400 text-black rounded-full p-2 hover:bg-gray-200 hover:text-gray-600  transform ease-in duration-200 cursor-pointer '
            type='submit'
            value='Register'
          />
        </form>
      </div>
    </>
  );
}
