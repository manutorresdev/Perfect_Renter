```jsx
import React, { useContext, useEffect, useState } from 'react';
import Password from '../Forms/Inputs/Password';
import { useForm } from 'react-hook-form';
import {
  FaCamera,
  FaHome,
  FaPencilAlt,
  FaPlus,
  FaPlusSquare,
  FaStar,
  FaTrash,
  FaUser,
  FaAngleRight,
  FaAngleLeft,
} from 'react-icons/fa';
const [CanDelete, setCanDelete] = useState(false);
const [Error, setError] = useState('');
const Overlay = { form: 'deleteAccount' };
const {
  setValue,
  handleSubmit,
  register,
  formState: { errors },
} = useForm();

function onSubmit(body) {
  if (body.password === 'fooBar123') {
    setCanDelete(true);
  } else {
    setError('Contraseña incorrecta');
  }
}

<div className='overlay z-20 bg-white bg-opacity-75 justify-center w-full h-full left-0 top-0 flex flex-col items-center sm:px-12 sm:py-24 pt-24 px-2 overscroll-scroll sm:overflow-hidden'>
  <h1>Password: fooBar123</h1>
  <section className='delete p-4 filter drop-shadow-xl  flex flex-col items-center gap-5 bg-white relative text-principal-gris overflow-y-auto md:w-3/4'>
    <button className='close-overlay absolute top-3 p-5 right-2'>
      <FaPlus className='transform scale-150 rotate-45' />
    </button>
    <h1 className='title text-3xl p-4 border-b-4 self-center border-gray-700 flex justify-center w-5/6 select-none'>
      {Overlay.form === 'deleteAccount' ? (
        <span className='flex items-center gap-2'>
          <FaUser /> Eliminar cuenta
        </span>
      ) : (
        <span className='flex items-center gap-2'>
          <FaHome /> Eliminar propiedad
        </span>
      )}
    </h1>
    <p>
      {Overlay.form === 'deleteAccount'
        ? 'Para eliminar su cuenta definitivamente, por favor, introduzca su contraseña:'
        : 'Para eliminar la propiedad, por favor, inserte la contraseña de su cuenta:'}
    </p>
    {!CanDelete && (
      <form
        className='flex flex-col gap-3 max-w-sm'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Password register={register} errors={errors} />
        {Error ? (
          <div className='text-red-600 font-medium text-center'>{Error}</div>
        ) : (
          ''
        )}
        <input
          className='button select-none w-1/2 self-center text-center bg-principal-1 text-principal-gris border border-gray-400 text-black p-2 hover:bg-gray-200 hover:text-gray-600 transform ease-in duration-200 cursor-pointer '
          type='submit'
          value='Validar'
        />
      </form>
    )}
    <button
      className={`${
        CanDelete
          ? 'bg-red-600'
          : 'bg-gray-500 text-gray-400 select-none pointer-events-none cursor-default'
      } button select-none w-5/12 self-center text-center  text-white border border-gray-400 font-medium p-2 hover:bg-gray-200 hover:text-gray-600 transform ease-in duration-200 cursor-pointer`}
      onClick={(e) => {
        alert('Cuena eliminada.');
        window.location.reload();
      }}
    >
      Eliminar
    </button>
  </section>
</div>;
```
