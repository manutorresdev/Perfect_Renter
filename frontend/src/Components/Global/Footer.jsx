import React from 'react';

export default function Footer({ token, setToken }) {
  return (
    <footer className='absolute bottom-0 right-0 bg-gray-Primary  h-40 w-screen flex items-center justify-center'>
      {token ? (
        <button
          className='p-10 bg-white'
          onClick={() => {
            setToken('');
            window.location.reload();
          }}
        >
          Salir
        </button>
      ) : (
        ''
      )}
    </footer>
  );
}
