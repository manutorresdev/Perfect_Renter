import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../Helpers/Api';

export default function Tenant({ user, setOverlay, relation }) {
  return (
    <article className='user-card max-w-3xl flex gap-2 text-xs shadow-custom items-center p-1 bg-gray-100 bg-opacity-30'>
      <div className='user-info-cont flex items-center font-medium relative flex-grow-0 md:flex-grow w-9/12'>
        <Link className='user-avatar ' to={`/inquilinos/${user.idUser}`}>
          <img
            className='w-32 h-28 rounded-full object-scale-down'
            src={
              user.avatar
                ? `http://localhost:4000/photo/${user.avatar}`
                : require('../../Images/defProfile.png').default
            }
            alt={'perfil ' + user.name + user.lastName}
          />
          <div
            className='flex text-xs self-center text-principal-1 justify-center'
            id='calification'
          >
            {Array(parseInt(user.votes))
              .fill(null)
              .map((value, i) => {
                return <FaStar key={i} className='text-principal-1'></FaStar>;
              })}
          </div>
        </Link>
      </div>
      <div className='user-info flex flex-col flex-grow min-w-min'>
        <Link className='self-start w-full' to={`/inquilinos/${user.idUser}`}>
          <div className='font-bold text-base  text-principal-gris py-1 pl-1 border-b-2 flex-grow w-max'>
            {capitalizeFirstLetter(user.name)}{' '}
            {capitalizeFirstLetter(user.lastName)},{' '}
            {Math.abs(
              new Date().getFullYear() - new Date(user.birthDate).getFullYear()
            )}
          </div>
          <span className='pl-2 font-medium text-sm'>{user.city}</span>
        </Link>
        <p className='self-center p-1'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum amet
          natus eaque rem ad, minima iure.
        </p>
      </div>
      {/* <div className='buttons-cont flex flex-col items-end justify-around w-full h-full'>
        <button
          className='bg-principal-1 px-5 hover:pl-7 duration-300  py-2 font-medium rounded-bl-md rounded-tl-md'
          onClick={() => {
            setOverlay({ shown: true, info: user, form: 'contact' });
          }}
        >
          Contactar
        </button>
        {relation.length > 0 && (
          <button
            className='bg-principal-1 px-7 hover:pl-8 duration-300 py-2 fm font-medium rounded-bl-md rounded-tl-md' */}
      {relation ? (
        <div className='buttons-cont flex flex-col items-end justify-around w-full h-full'>
          <button
            className='bg-principal-1 px-5 hover:px-7 duration-300  py-2 font-medium rounded-bl-md rounded-tl-md'
            onClick={() => {
              setOverlay({ shown: true, info: user, form: 'contact' });
            }}
          >
            Contactar
          </button>
          {relation.length > 0 && (
            <button
              className='bg-principal-1 px-7 hover:px-8 duration-300 py-2 fm font-medium rounded-bl-md rounded-tl-md'
              onClick={() => {
                setOverlay({
                  shown: true,
                  info: { ...user, relation: relation },
                  form: 'vote',
                });
              }}
            >
              Valorar
            </button>
          )}
        </div>
      ) : (
        ''
      )}
    </article>
  );
}
