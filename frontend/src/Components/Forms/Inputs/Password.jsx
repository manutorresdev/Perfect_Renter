import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Password({ register, errors }) {
  const [ShowPass, setShowPass] = useState(false);

  return (
    <>
      <div className='flex relative items-center'>
        <input
          className='w-full p-2 pr-6'
          type={ShowPass ? 'text' : 'password'}
          name='password'
          placeholder='Contraseña*'
          {...register('password', {
            required: 'Debes escribir una contraseña.',
            minLength: {
              value: 8,
              message: 'La contraseña debe contener mínimo 8 carácteres',
            },
            maxLength: {
              value: 100,
              message: 'La contraseña no puede tener más de 100 carácteres.',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d].{8,}$/,
              message:
                'La contraseña debe contener una letra minúscula, una letra mayúscula y un numero.',
            },
          })}
        />
        {ShowPass ? (
          <FaEye
            className='absolute right-1'
            onClick={() => {
              setShowPass(!ShowPass);
            }}
          />
        ) : (
          <FaEyeSlash
            className='absolute right-1'
            onClick={() => {
              setShowPass(!ShowPass);
            }}
          />
        )}
      </div>
      {errors.password && (
        <p className='text-red-500'>{errors.password.message}</p>
      )}
    </>
  );
}
