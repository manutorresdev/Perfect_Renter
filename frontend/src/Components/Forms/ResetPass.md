```jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Password from './Inputs/Password';

const [ErrorRep, setError] = useState(false);

const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm();

const formFunctions = { register, errors };

const error = 'Las contraseñas deben coincidir.';
const buttonStyle =
  'select-none w-full self-center text-center bg-principal-1 text-principal-gris border border-yellow-300 text-black py-2 px-3 hover:bg-gray-Primary hover:text-principal-1 transform ease-in duration-200 cursor-pointer';

<>
  <section className='flex flex-col items-center justify-center gap-6 pt-10'>
    <h1 className='border-b-4 border-gray-600 text-3xl'>
      Recuperación de contraseña:
    </h1>
    <form
      className='flex flex-col gap-5'
      onSubmit={handleSubmit((data) => {
        if (data.password !== data.passwordRepeat) {
          setError(true);
        } else {
          alert(
            'Contraseña cambiada con éxito, se te redirigirá a la pantalla principal.'
          );
          reset();
        }
      })}
    >
      <Password {...formFunctions} />
      <input
        className='px-3 py-3  placeholder-gray-400 text-gray-600 relative bg-white text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full cursor-pointer'
        type={'password'}
        name='password'
        placeholder='Confirma la contraseña*'
        {...register('passwordRepeat', {
          required: `${error}`,
        })}
      />
      {errors.passwordRepeat && (
        <p className='text-red-500'>{errors.passwordRepeat.message}</p>
      )}
      {ErrorRep ? <p className='text-red-500'>{error}</p> : ''}
      <input className={buttonStyle} type='submit' value='Cambiar contraseña' />
    </form>
  </section>
</>;
```
