import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MenuElements } from './MenuElements';

export function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}

export default function Footer({
  token,
  setToken,
  setIsFooterVisible,
  IsFooterVisible,
}) {
  const footer = useRef();
  const isVisible = useOnScreen(footer);

  useEffect(() => {
    setIsFooterVisible(isVisible);
  }, [isVisible, setIsFooterVisible]);

  return (
    <footer
      ref={footer}
      className='text-principal-1 bottom-0 bg-gray-Primary h-28 absolute w-full flex items-center justify-evenly md:justify-between '
    >
      <div className='logo+name h-full flex flex-col items-center justify-center'>
        <Link to='/' className='logo p-1'>
          <img
            className='w-10'
            src='/Images/logo-amarillo-primary.png'
            alt='logo Perfect renter'
            id='logo'
          />
        </Link>
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
                  key={item.id}
                  className='text-gray-400 select-none pointer-events-none cursor-default sm:w-auto text-center sm:p-0'
                >
                  <Link to={item.path}>{item.title}</Link>
                </li>
              );
            } else {
              return (
                <li
                  key={item.id}
                  className='text-principal-1 cursor-pointer hover:text-white duration-300 ease-in-out w-full sm:w-auto text-center sm:p-0'
                >
                  <Link to={item.path}>{item.title}</Link>
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
    </footer>
  );
}
