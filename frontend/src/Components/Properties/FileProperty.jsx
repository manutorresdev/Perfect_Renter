import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaRegArrowAltCircleUp } from 'react-icons/fa';
import { CreateFormDataMultipleFiles, post, put } from '../../Helpers/Api';
import CircularProgress from '@mui/material/CircularProgress';
import Compressor from 'compressorjs';

export default function FileProperty({
  setOverlay,
  idProperty,
  Token,
  editProperty,
  setFile,
  photos,
  deletePhoto,
  setLoaderDiv,
}) {
  const [Error, setError] = useState('');
  const [Button, setButton] = useState(false);
  const [FileName, setFileName] = useState([]);
  const [Message, setMessage] = useState({ status: '', message: '' });
  const [TotalPhotos, setTotalPhotos] = useState(0);
  const hiddenInput = useRef(null);
  const [Loader, setLoader] = useState(false);
  const { handleSubmit, register } = useForm();
  const { ref, onChange, ...rest } = register('photo');

  function uploadFile(body, e) {
    e.preventDefault();

    const photos = [];

    Object.keys(body.photo).map((pic, index) => {
      return photos.push(body.photo[index]);
    });
    post(
      `http://192.168.5.103:4000/properties/${idProperty}/photos`,
      CreateFormDataMultipleFiles({
        photo: [...photos],
      }),
      (data) => {
        console.log('Success');
      },
      (error) => {
        setError(error.message);
      },
      Token
    );
  }

  function editFile(body, e) {
    e.preventDefault();

    const photos = [];

    Object.keys(body.photo).map((pic, index) => {
      return photos.push(body.photo[index]);
    });

    put(
      `http://192.168.5.103:4000/properties/${editProperty}`,
      CreateFormDataMultipleFiles({ photos: [...photos] }),
      (data) => {
        if (data.status === 'ok') {
          console.log('Sucess');
          setTimeout(() => {
            setButton(false);
            setLoader(false);
            setFileName('');
            window.location.reload();
          }, 500);
          setMessage({ status: 'ok', message: '¡Fotos subidas con éxito!' });
        }
      },
      (error) => {
        setButton(true);
        setLoader(false);
        setError(error.message);
      },
      Token
    );
  }

  useEffect(() => {
    setTotalPhotos(photos.length + FileName.length);
  }, [FileName.length, photos.length]);

  return (
    <div className='overlay z-20 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center px-12 py-24 overscroll-scroll sm:overflow-hidden'>
      {Loader && (
        <div className='overlay z-50 fixed bg-gray-200 bg-opacity-50 w-full h-full left-0 top-0 flex flex-col items-center px-12 pt-24 pb-2 overflow-scroll sm:overflow-hidden'>
          <CircularProgress className='absolute top-0 left-0 right-0 bottom-0 m-auto' />{' '}
        </div>
      )}
      <section className=' pt-2 shadow-custom border-2 border-gray-700 flex flex-col items-center gap-5 bg-gray-100 relative text-principal-gris overflow-y-auto md:w-3/4'>
        <button
          className='close-overlay absolute top-3 right-3'
          onClick={() => {
            setFile({ shown: false, form: '' });
          }}
        >
          <FaPlus className='transform rotate-45' />
        </button>
        <h1 className='title text-3xl p-4 border-b-4 self-center border-gray-700 flex justify-center w-5/6 select-none'>
          Añade las fotos de tu inmueble
        </h1>
        <div className='contact-card-container flex justify-around flex-col-reverse gap-10 sm:flex-row '>
          <form
            onSubmit={
              editProperty ? handleSubmit(editFile) : handleSubmit(uploadFile)
            }
            className='flex flex-col gap-10 md:gap-3 pl-2 font-medium w-full pb-4'
          >
            <div className='flex flex-col gap-5 items-center'>
              <button
                className='font-medium flex items-center gap-2 bg-blue-600 text-white p-1 rounded'
                onClick={(e) => {
                  e.preventDefault();
                  hiddenInput.current.click();
                }}
              >
                <FaRegArrowAltCircleUp className='animate-bounce' />
                Selecciona los archivos
              </button>

              <div className='photo-cont flex flex-col gap-2 justify-center'>
                {photos && (
                  <div className='uploaded-photos-cont flex flex-col gap-1'>
                    <span className='border-b-2 border-gray-600 w-1/2 mb-2'>
                      Fotos subidas:
                    </span>
                    <div className='flex flex-wrap gap-2 justify-center'>
                      {photos.map((photo, index) => {
                        return (
                          <div key={photo.name} className='relative'>
                            <button
                              className='delete-photo absolute top-0 right-0 bg-principal-1'
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setLoaderDiv(true);
                                deletePhoto(photo.name);
                              }}
                            >
                              <FaPlus className='transform rotate-45' />
                            </button>
                            <img
                              src={
                                'http://192.168.5.103:4000/photo/' + photo.name
                              }
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
                          <div key={file.name} className='relative w-20'>
                            <button
                              className='delete-photo absolute top-0 right-0 bg-principal-1'
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setLoader(true);
                                setFileName(
                                  FileName.filter(
                                    (fileToRemove) =>
                                      fileToRemove.name !== file.name
                                  )
                                );
                                setTimeout(() => {
                                  setLoader(false);
                                }, 1000);
                              }}
                            >
                              <FaPlus className='transform rotate-45' />
                            </button>
                            <img
                              src={URL.createObjectURL(file)}
                              alt='prueba'
                              className='w-20 h-20 object-cover'
                            />
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
                  onChange(e);
                  for (const photo of hiddenInput.current.files) {
                    console.log(photo);
                    arrayPhotos.push(photo);
                  }
                  setFileName(arrayPhotos);
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
                TotalPhotos >= 30 &&
                'text-gray-400 select-none pointer-events-none cursor-default '
              } font-medium relative flex justify-center gap-2 select-none w-1/2 self-center text-center border border-gray-400 text-black p-2 hover:bg-gray-200 hover:text-gray-600 transform ease-in duration-200`}
            >
              Añadir
              {Loader && (
                <CircularProgress className='absolute top-0 left-0 right-0 bottom-0 m-auto' />
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
