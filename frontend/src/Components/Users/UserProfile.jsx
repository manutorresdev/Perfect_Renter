import React, { useContext, useEffect, useState } from 'react';
import { get } from '../../Helpers/Api';

import { FaStar } from 'react-icons/fa';
// import { parseJwt } from '../../Helpers/Api';
import { TokenContext } from '../../Helpers/Hooks/TokenProvider';

export default function UserProfile({match}) {
  const [Token] = useContext(TokenContext);
  const [user,setUser]=useState({});



  /* console.log(userInfo); */
useEffect(()=>{
    get(
     `http://localhost:4000/users/${match.params.idUser}`,
       (data)=>{
       
            setUser(data.userInfo);

       },
     (error) => {
       console.log(error);
     },
     Token
   );
},[Token,match]);

  

  return (
    <>
  
      <main className='perfil flex flex-col items-center justify-center'>
        <article>
          <img
            className='w-80 py-20 float-right '
            src={require('../../Images/defProfile.png').default}
            alt='imagen de perfil'
          />
          <section className='p-40'>
            <h1>
             {user.name}
              {/* {user.name ? user.name + ' ' + user.lastName : 'Nombre de tenant'} */}
            </h1>
            <div className='flex text-xs self-center'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className=''>
              {user.bio}
            </p>
          </section>
        </article>
        <section>historial viviendas</section>
        <section>viviendas en alquiler</section>
        <section>opiniones</section>
        <input
          className='button select-none text-center border border-gray-400 text-black rounded-full p-2 hover:bg-gray-200 hover:text-gray-600  transform ease-in duration-200 cursor-pointer '
          type='submit'
          value='Contactar'
        />
      </main>
    </>
  );
}