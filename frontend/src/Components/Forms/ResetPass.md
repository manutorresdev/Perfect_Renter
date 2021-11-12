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

<>
  <section className='flex flex-col items-center justify-center gap-6 pt-10'>
    <h1>Recuperación de contraseña:</h1>
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
        className='w-full p-2 pr-6'
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
      <input
        className='button select-none  text-center border border-gray-400 text-black rounded-full p-2 hover:bg-gray-200 hover:text-gray-600  transform ease-in duration-200 cursor-pointer '
        type='submit'
        value='Cambiar contraseña'
      />
    </form>
  </section>
</>;
```
