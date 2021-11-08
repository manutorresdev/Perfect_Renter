import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { put } from '../../Helpers/Api';
import Password from './Inputs/Password';

export default function ResetPass({ match }) {
  const [ErrorRep, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formFunctions = { register, errors };

  const error = 'Las contraseñas deben coincidir.';

  return (
    <>
      <section className='flex flex-col items-center justify-center gap-6 pt-10'>
        <h1>Recuperación de contraseña:</h1>
        <form
          className='flex flex-col gap-5'
          onSubmit={handleSubmit((data) => {
            console.log(data);
            if (data.password !== data.passwordRepeat) {
              setError(true);
            } else {
              put(
                `http://localhost:4000/users/password/recover/${match.params.idUser}/${match.params.recoverCode}`,
                { password: data.password },
                (data) => {
                  console.log(data);
                  alert(
                    'Contraseña cambiada con éxito, se te redirigirá a la pantalla principal.'
                  );
                  window.location.reload();
                },
                (error) => {
                  console.log(error);
                }
              );
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
    </>
  );
}
