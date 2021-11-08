import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaRegArrowAltCircleUp } from 'react-icons/fa';
import { CreateFormData, post } from '../../Helpers/Api';

export default function FileProperty({ setOverlay, idProperty, Token }) {
  const [Error, setError] = useState('');
  const [FileName, setFileName] = useState('');
  const hiddenInput = useRef(null);
  const { handleSubmit, register } = useForm();
  const { ref, onChange, ...rest } = register('photo');

  function uploadFile(body, e) {
    e.preventDefault();
    console.log(body);
    console.log(body.photo[0]);
    console.log(idProperty);
    if (body.photo[0]) {
      post(
        `http://192.168.5.103:4000/properties/11/photos`,
        CreateFormData({ photos: body.photo[0] }),
        (data) => {
          console.log('Success');
          alert(data.message);
          window.location.reload();
        },
        (error) => {
          setError(error.message);
        },
        Token
      );
    } else {
      setError('Debes seleccionar un archivo.');
    }
  }

  /*  const registerComponentStyle = Token
    ? 'overlay z-10 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-20 overflow-scroll sm:overflow-hidden'
    : ''; */

  return (
    <div className='overlay z-20 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center px-12 py-24 overscroll-scroll sm:overflow-hidden'>
      <section className=' pt-2 border-2 border-gray-700 flex flex-col items-center gap-5 bg-gray-100 relative text-principal-gris overflow-y-scroll md:w-3/4'>
        <button
          className='close-overlay absolute top-3 right-3'
          onClick={() => {
            setOverlay({ shown: false, form: '' });
          }}
        >
          <FaPlus className='transform rotate-45' />
        </button>
        <h1 className='title text-3xl p-4 border-b-4 self-center border-gray-700 flex justify-center w-5/6 select-none'>
          Añade las fotos de tu inmueble
        </h1>

        <div className='contact-card-container flex justify-around flex-col-reverse gap-10 sm:flex-row '>
          <form
            onSubmit={handleSubmit(uploadFile)}
            className='flex flex-col gap-10 md:gap-3 pl-2 font-medium w-full pb-4'
          >
            <div className='flex flex-col gap-5'>
              <button
                className='font-medium flex items-center gap-2 bg-blue-600 text-white p-1 rounded'
                onClick={(e) => {
                  e.preventDefault();
                  hiddenInput.current.click();
                }}
              >
                <FaRegArrowAltCircleUp className='animate-bounce' />
                Selecciona los archivo
              </button>
              <p className='text-center'>
                {FileName ?? 'Ningún archivo seleccionado.'}
              </p>

              <input
                className='hidden'
                /*  multiple='multiple' */
                {...rest}
                onChange={(e) => {
                  onChange(e);
                  setFileName(hiddenInput.current.files[0].name);
                }}
                ref={(e) => {
                  ref(e);
                  hiddenInput.current = e;
                }}
                type='file'
                name='photo'
              />
            </div>
            {Error && (
              <p className='text-red-600 font-medium text-center'>{Error}</p>
            )}
            <button
              type='submit'
              className='button font-medium select-none w-1/2 self-center text-center bg-principal-1 text-principal-gris border border-gray-400 text-black p-2 hover:bg-gray-200 hover:text-gray-600 transform ease-in duration-200 cursor-pointer'
            >
              Subir
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
