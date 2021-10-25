import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaStar } from 'react-icons/fa';

export default function VoteForm() {
  const [Rating, setRating] = useState(null);
  const [Hover, setHover] = useState(null);
  const { register, handleSubmit } = useForm();

  function onSubmit(body, e) {
    e.preventDefault();
    console.log('\x1b[43m%\x1b[30m', body);
  }

  return (
    <>
      <section className='flex flex-col items-center justify-center mt-24 w-2/3 m-auto shadow-xl rounded-sm p-5'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
          <label>
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
                      {...register('rating')}
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
          <label>
            <div>Escribe algún comentario:</div>
            <textarea
              {...register('comments')}
              name='comments'
              cols='20'
              rows='10'
              maxLength='250'
              className='h-28 w-full resize-none '
            ></textarea>
          </label>
          <input
            className='button select-none w-1/3 self-center text-center border border-gray-400 text-black rounded-full p-2 px-4 hover:bg-gray-200 hover:text-gray-600  transform ease-in duration-200 cursor-pointer '
            type='submit'
            value='Enviar'
          />
        </form>
      </section>
    </>
  );
}
