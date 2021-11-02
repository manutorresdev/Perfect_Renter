import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { put } from '../../Helpers/Api';

export default function FileProperty({ setOverlay, usuario, Token }) {
  const [Error, setError] = useState('');

  const { handleSubmit, reset, register } = useForm();
  console.log(usuario);
  async function uploadFile(body, e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photos', body.photos[0]);
    put(
      `http://localhost:4000/properties/:12/photos`,
      formData,
      (data) => {
        console.log('Success');
        alert(data.message);
        reset();
      },
      (error) => {
        setError(error.message);
      },
      Token
    );
  }

  const registerComponentStyle = Token
    ? 'overlay z-10 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-20 overflow-scroll sm:overflow-hidden'
    : '';

  return (
    <div className={registerComponentStyle}>
      <form
        onSubmit={handleSubmit(uploadFile)}
        className='contact pt-2 p-20 border border-black flex flex-col gap-5  bg-white relative'
      >
        <div>
          <button
            className='close-overlay absolute top-3 right-3'
            onClick={() => {
              setOverlay({ shown: false, form: '' });
            }}
          >
            <FaPlus className='transform rotate-45' />
          </button>
          <label>Selecciona un archivo</label>
          <input type='file' name='photo' /*  {...register('avatar')} */ />
        </div>

        <button type='submit'>Subir</button>
      </form>
    </div>
  );
}
