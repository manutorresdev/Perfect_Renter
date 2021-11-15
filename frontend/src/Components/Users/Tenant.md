```jsx
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../Helpers/Api';

user, setOverlay, relation;

const user = {
  avatar: 'renter.jpg',
  birthDate: '1990-01-01T00:00:00.000Z',
  city: 'Madrid',
  idUser: 13,
  lastName: 'Renter',
  name: 'Perfect',
  votes: '3.0000',
};
const setOverlay = () => {};

const relation = [1, 2, 3];
const buttonStyle =
  'select-none w-1/2 self-center text-center bg-principal-1 text-principal-gris border border-yellow-300 text-black py-2 px-3 hover:bg-gray-Primary hover:text-principal-1 transform ease-in duration-200 cursor-pointer';

<article className='user-card lg:w-3/4 md:min-h-15rem xl:min-h-0 max-w-xs lg:max-w-lg lg:max-h-52 flex flex-col gap-2 text-xs shadow-lg p-4 bg-white bg-opacity-30'>
  <div className='flex flex-row flex-grow min-w-full'>
    <div className='user-info-cont flex items-center font-medium relative flex-grow-0 md:flex-grow'>
      <button
        className='user-avatar w-20 h-20 sm:w-32 sm:h-32 flex-grow'
        to={`/inquilinos/${user.idUser}`}
      >
        <img
          className='w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover'
          src={user.avatar}
          alt={'perfil ' + user.name + user.lastName}
        />
        <div
          className='flex text-xs self-center text-principal-1 justify-center'
          id='calification'
        >
          {Array(parseInt(user.votes))
            .fill(null)
            .map((value, i) => {
              return (
                <FaStar
                  key={Math.random()}
                  className='text-principal-1'
                ></FaStar>
              );
            })}
        </div>
      </button>
    </div>
    <div className='user-info flex flex-col w-40 sm:w-32 md:w-full'>
      <button
        className='self-start w-40 sm:w-32 md:w-full'
        to={`/inquilinos/${user.idUser}`}
      >
        <div className='font-bold text-base  text-principal-gris py-1 pl-1 border-b-2 flex-grow w-max'>
          {capitalizeFirstLetter(user.name)}{' '}
          {capitalizeFirstLetter(user.lastName)},{' '}
          {Math.abs(
            new Date().getFullYear() - new Date(user.birthDate).getFullYear()
          )}
        </div>
        <span className='pl-2 font-medium text-sm'>{user.city}</span>
      </button>
      <p className='self-center p-1'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum amet
        natus eaque rem ad, minima iure.
      </p>
    </div>
  </div>

  {relation ? (
    <div className='buttons-cont flex gap-2 items-center justify-around w-full h-full'>
      <button className={buttonStyle}>Contactar</button>
      {relation.length > 0 && <button className={buttonStyle}>Valorar</button>}
    </div>
  ) : (
    ''
  )}
</article>;
```
