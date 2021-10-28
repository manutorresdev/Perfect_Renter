import React from 'react';

export default function FirstName({
  register,
  errors,
  className,
  placeholder,
}) {
  return (
    <>
      <input
        className={className}
        type='text'
        name='name'
        placeholder={placeholder ?? 'First Name*'}
        {...register('name', {
          required: 'Debes escribir un nombre.',
          pattern: {
            value:
              /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
            message:
              'El nombre no puede contener carácteres especiales ni números.',
          },
          minLength: {
            value: 3,
            message: 'El nombre debe contener como mínimo 3 carácteres.',
          },
          maxLength: {
            value: 30,
            message: 'El nombre no puede tener más de 30 carácteres.',
          },
        })}
      />
      {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
    </>
  );
}
