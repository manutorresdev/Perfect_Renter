```jsx
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaRegArrowAltCircleUp } from 'react-icons/fa';
import { CreateFormDataMultipleFiles, post, put } from '../../Helpers/Api';
import CircularProgress from '@mui/material/CircularProgress';

const [Error, setError] = useState('');
const [Button, setButton] = useState(false);
const [FileName, setFileName] = useState([]);
const [Message, setMessage] = useState({ status: '', message: '' });
const [TotalPhotos, setTotalPhotos] = useState(0);
const hiddenInput = useRef(null);
const [Loader, setLoader] = useState(false);
const { handleSubmit, register } = useForm();
const { ref, onChange, ...rest } = register('photo');
const photos = 0;
//
function editFile(body, e) {
  e.preventDefault();

  console.log('Sucess');
  setTimeout(() => {
    setButton(false);
    setLoader(false);
    setFileName('');
    window.location.reload();
  }, 500);
  setMessage({ status: 'ok', message: '¡Fotos subidas con éxito!' });
}

useEffect(() => {
  setTotalPhotos(photos + FileName.length);
}, [FileName.length, photos]);

// Return
<div className='overlay z-20 bg-white bg-opacity-75 justify-center w-full h-full left-0 top-0 flex flex-col items-center px-12 py-24 overscroll-scroll sm:overflow-hidden'>
  {Loader && (
    <div className='overlay z-50 fixed bg-gray-200 bg-opacity-50 w-full h-full left-0 top-0 flex flex-col items-center px-12 pt-24 pb-2 overflow-scroll sm:overflow-hidden'>
      <CircularProgress className='absolute top-0 left-0 right-0 bottom-0 m-auto' />{' '}
    </div>
  )}
  <section className=' pt-2 filter drop-shadow-xl  flex flex-col items-center gap-5 bg-white relative text-principal-gris overflow-y-auto md:w-3/4 max-w-3xl'>
    <button className='close-overlay absolute top-3 right-3'>
      <FaPlus className='transform rotate-45' />
    </button>
    <h1 className='title text-3xl p-4 border-b-4 self-center border-gray-700 flex justify-center w-5/6 select-none'>
      Añade las fotos de tu inmueble
    </h1>
    <div className='file-uploader-container flex justify-around flex-col-reverse gap-10 sm:flex-row sm:w-11/12'>
      <form className='flex flex-col gap-10 md:gap-3 pl-2 font-medium w-full pb-4'>
        <div className='flex flex-col gap-5 items-center'>
          <button
            className='font-medium flex items-center gap-2 bg-blue-600 text-white p-2'
            onClick={(e) => {
              e.preventDefault();
              setFileName([
                ...FileName,
                { Content: 'Foto', index: Math.random() },
              ]);
              setButton(true);
            }}
          >
            <FaRegArrowAltCircleUp className='animate-bounce' />
            Selecciona los archivos
          </button>
          <div className='photo-cont flex flex-col gap-2 justify-center sm:justify-start w-full'>
            {photos && (
              <div className='uploaded-photos-cont flex flex-col gap-1'>
                <span className='border-b-2 border-gray-600 w-1/2 sm:w- mb-2'>
                  Fotos subidas:
                </span>
                <div className='flex flex-wrap gap-2 justify-center'>
                  {photos.map((photo, index) => {
                    return (
                      <div key={Math.random()} className='relative'>
                        <button
                          className='delete-photo absolute top-0 right-0 bg-principal-1'
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <FaPlus className='transform rotate-45' />
                        </button>
                        <img
                          src={photo}
                          alt='prueba'
                          className='w-20 h-20 object-cover'
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {FileName ? (
              <div className='flex flex-col gap-1'>
                <span className='border-b-2 border-gray-600 w-1/2 mb-2'>
                  Fotos seleccionadas:
                </span>
                <div className='selected-photos-cont flex flex-wrap gap-2 justify-center'>
                  {FileName.map((file, index) => {
                    return (
                      <div key={Math.random()} className='relative w-20'>
                        <button
                          className='delete-photo absolute top-0 right-0 bg-principal-1'
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setLoader(true);
                            setFileName(
                              FileName.filter(
                                (fileToRemove, index) =>
                                  fileToRemove.index !== file.index
                              )
                            );
                            setTimeout(() => {
                              setLoader(false);
                            }, 1000);
                          }}
                        >
                          <FaPlus className='transform rotate-45' />
                        </button>
                        <div className='w-20 h-20 object-cover'>
                          {file.Content}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className='text-center'>Ningún archivo seleccionado.</p>
            )}
          </div>

          <input
            className='hidden'
            {...rest}
            onChange={(e) => {
              setLoader(true);
              const arrayPhotos = [];
              setButton(true);
              setTimeout(() => {
                setLoader(false);
              }, 5000);
            }}
            ref={(e) => {
              ref(e);
              hiddenInput.current = e;
            }}
            type='file'
            multiple='multiple'
            name='photo'
          />
        </div>
        {Error && (
          <p className='text-red-600 font-medium text-center'>{Error}</p>
        )}
        {Message.status === 'ok' && (
          <p className='font-medium text-green-700 text-center'>
            {Message.message}
          </p>
        )}

        <span
          className={`self-center ${
            TotalPhotos >= 30 &&
            FileName.length > 0 &&
            ' text-red-500 animate-pulse'
          }`}
        >
          Fotos: {TotalPhotos}/30
        </span>

        <button
          onClick={(e) => {
            setButton(false);
            setLoader(true);
          }}
          type='submit'
          className={`${
            Button
              ? 'bg-principal-1 text-principal-gris cursor-pointer'
              : 'text-gray-400 select-none pointer-events-none cursor-default'
          } ${
            (TotalPhotos >= 30 || FileName.length < 1) &&
            'text-gray-400 select-none pointer-events-none cursor-default '
          } select-none w-full self-center text-center bg-principal-1 text-principal-gris border border-yellow-300 text-black py-2 px-3 hover:bg-gray-Primary hover:text-principal-1 transform ease-in duration-200 cursor-pointer`}
        >
          Añadir
          {Loader && (
            <CircularProgress className='absolute top-0 left-0 right-0 bottom-0 m-auto' />
          )}
        </button>
      </form>
    </div>
  </section>
</div>;
```
