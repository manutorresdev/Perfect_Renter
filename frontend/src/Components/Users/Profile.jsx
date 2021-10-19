import React, { useEffect, useState } from 'react';
import { get, parseJwt } from '../../Helpers/Api';

export default function Profile({ token }) {
  const [User, setUser] = useState({});

  const user = parseJwt(token);

  useEffect(() => {
    get(
      `http://localhost:4000/users/${user.idUser}`,
      (data) => {
        setUser(data.userInfo);
      },
      (error) => console.log(error),
      token
    );
  }, [token, user.idUser]);

  return (
    <section className='pt-20 flex flex-col items-center justify-center'>
      <img
        className='w-40'
        src={User.avatar ? '' : require('../../Images/defProfile.png').default}
        alt='perfil de usuario'
      />
      <h3>
        Nombre:
        <br />
        {User.name}
      </h3>
      <h4>
        Email: <br /> {User.email}
      </h4>
      <h5>
        Bio: <br /> {User.bio}
      </h5>
    </section>
  );
}
