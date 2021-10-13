import React, { useContext, useEffect, useState } from 'react';
import { get } from '../../Helpers/Api';
import { TokenContext } from '../../Helpers/Hooks/TokenProvider';
import LoadingSkeleton from './LoadingSkeleton';
import Tenant from './Tenant';

export default function UsersList() {
  const [Token] = useContext(TokenContext);
  const [Users, setUsers] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  // Necesario estar logueado
  useEffect(() => {
    get(
      'http://localhost:4000/users',
      (data) => {
        setTimeout(() => {
          setUsers(data.users);
          setLoaded(true);
        }, 500);
      },
      (error) => console.log(error),
      Token
    );
  }, [Token]);

  return (
    <section className='w-full flex flex-col gap-5 justify-center items-center mt-14'>
      <h2 className='text-2xl'>Inquilinos</h2>
      {Loaded
        ? Users.map((user) => <Tenant user={user} />)
        : Array(10)
            .fill(null)
            .map((el, i) => <LoadingSkeleton key={i} />)}
    </section>
  );
}
