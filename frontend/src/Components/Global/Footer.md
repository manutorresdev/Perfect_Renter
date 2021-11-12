```jsx
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { MenuElements } from './MenuElements';
const token = 1;

<footer className='text-principal-1 bg-gray-Primary h-28 w-full flex items-center justify-evenly md:justify-between md:px-20'>
  <div className='logo+name h-full flex flex-col items-center justify-center'>
    <button to='/' className='logo p-1'>
      <img
        className='w-10'
        src='logo-pr-amarillo.png'
        alt='logo Perfect renter'
        id='logo'
      />
    </button>
    <span>Perfect Renter</span>
  </div>
  <div className='links'>
    <ul className=' md:flex md:gap-5'>
      {MenuElements.map((item) => {
        if (item.id === 1) {
          return '';
        }
        if (item.id === 3 && !token) {
          return (
            <li
              key={Math.random()}
              className='text-gray-400 select-none pointer-events-none cursor-default sm:w-auto text-center sm:p-0'
            >
              <button to={item.path}>{item.title}</button>
            </li>
          );
        } else {
          return (
            <li
              key={Math.random()}
              className='text-principal-1 cursor-pointer hover:text-white duration-300 ease-in-out w-full sm:w-auto text-center sm:p-0'
            >
              <button to={item.path}>{item.title}</button>
            </li>
          );
        }
      })}
    </ul>
  </div>
  <div className='redes sociales flex flex-col gap-2'>
    <h3>Siguenos en:</h3>
    <div className='flex gap-2 text-white'>
      <a
        rel='noreferrer'
        target='_blank'
        href='https://www.instagram.com/perfectrenter/'
      >
        <FaInstagram />
      </a>
      <a
        rel='noreferrer'
        target='_blank'
        href='https://github.com/manutowersdev/Perfect_Renter'
      >
        <FaGithub />
      </a>
    </div>
  </div>
</footer>;
```
