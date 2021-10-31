import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaStar } from 'react-icons/fa';
import { CreateFormData, post } from '../../Helpers/Api';

export default function VoteForm({ setOverlay, userInfo, Token }) {
  const [Rating, setRating] = useState(null);
  const [Hover, setHover] = useState(null);
  const [Error, setError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(body, e) {
    e.preventDefault();

    if (body.voteValueRenter && body.commentary) {
      post(
        `http://192.168.5.103:4000/users/${userInfo.idUser}/votes`,
        CreateFormData(body),
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          setError(error);
        },
        Token
      );
    } else {
      setError({ message: 'Debes rellenar los campos.' });
    }
  }
  const inpStyle =
    'px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring';
  const comentarios = watch('commentary');

  return (
    <div className='overlay z-20 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-24 overscroll-scroll sm:overflow-hidden'>
      <section className='contact pt-2 border-2 border-gray-700 flex flex-col gap-5 bg-gray-100 relative text-principal-gris overflow-y-scroll md:w-3/4'>
        <button
          className='close-overlay absolute top-3 p-5 right-2'
          onClick={() => {
            setOverlay({ shown: false, userInfo: {}, form: '' });
          }}
        >
          <FaPlus className='transform scale-150 rotate-45' />
        </button>
        <h1 className='title text-3xl p-4 border-b-4 self-center border-gray-700 flex justify-center w-5/6 select-none'>
          Valorar
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-3 w-full font-medium pb-5 pl-2'
        >
          <label className='flex flex-col gap-3'>
            <div>
              Escoge la puntuación que creas oportuna. ¡Tu opinión es muy
              importante!
            </div>
            <div className='flex'>
              {[1, 2, 3, 4, 5].map((value, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type='radio'
                      name='rating'
                      className='hidden'
                      value={ratingValue}
                      {...register('voteValueRenter')}
                      onClick={() => {
                        setRating(ratingValue);
                      }}
                    />
                    <FaStar
                      onMouseEnter={() => {
                        setHover(ratingValue);
                      }}
                      onMouseLeave={() => {
                        setHover(null);
                      }}
                      key={value}
                      className={`${
                        ratingValue <= (Hover || Rating)
                          ? 'text-principal-1'
                          : 'text-gray-400 opacity-30'
                      }  hover:text-principal-1 hover:opacity-100 duration-200 text-2xl cursor-pointer`}
                    />
                  </label>
                );
              })}
            </div>
          </label>
          <label className='relative w-min'>
            <div>Escribe algún comentario:</div>
            <textarea
              {...register('commentary')}
              name='commentary'
              cols='20'
              rows='10'
              className={`${inpStyle} resize-none w-80`}
              maxLength='250'
            ></textarea>
            <p className='absolute right-5 bottom-5'>
              {comentarios ? comentarios.length : 0}/250
            </p>
          </label>
          {errors.comentarios && (
            <p className='text-red-500'>{errors.comentarios.message}</p>
          )}
          {Error && <p className='text-red-500'>{Error.message}</p>}
          <input
            className='button select-none w-1/3 self-center text-center border border-gray-400 text-black rounded-full p-2 px-4 hover:bg-gray-200 hover:text-gray-600  transform ease-in duration-200 cursor-pointer '
            type='submit'
            value='Enviar'
          />
        </form>
      </section>
    </div>
  );
}
