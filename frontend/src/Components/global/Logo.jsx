import React from 'react';
// import { Redirect } from 'react-router';
import { Link, Redirect } from 'react-router-dom';

export default function Logo() {
  function onClick() {
    console.log('Home');
  }

  return (
    <>
      <img
        onClick={onClick}
        className='w-20 object-cover h-10 rounded cursor-pointer'
        src='logo.jpeg'
        alt='PerfectRenter'
      />
    </>
  );
}
