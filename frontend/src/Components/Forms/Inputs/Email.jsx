import React from 'react';

export default function Email({ className, register, errors, placeholder }) {
  return (
    <>
      <input
        className={className}
        name='email'
        type='email'
        placeholder={placeholder ?? 'Email*'}
        {...register('email', {
          required: 'Debes escribir un email.',
          maxLength: {
            value: 200,
            message: 'El email no puede contener más de 200 carácteres.',
          },
        })}
      />
      {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
    </>
  );
}
