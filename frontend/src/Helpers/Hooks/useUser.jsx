import { useEffect, useState } from 'react';
import { get, parseJwt } from '../Api';

export default function useUser(token) {
  const [User, setUser] = useState({});

  const userLogged = parseJwt(token);

  useEffect(() => {
    get(
      `http://192.168.5.103:4000/users/${userLogged.idUser}`,
      (data) => {
        if (data.message !== 'No hay conicidencias para su busqueda') {
          setUser(data.userInfo);
        }
        setUser({});
      },
      (error) => console.log(error),
      token
    );
  }, [userLogged.idUser, token]);

  return [User, setUser];
}
