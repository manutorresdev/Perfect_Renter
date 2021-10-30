import React, { useContext, useEffect, useState } from 'react';
import { get } from '../../Helpers/Api';
import { TokenContext } from '../../Helpers/Hooks/TokenProvider';
import ContactTenant from '../Forms/ContactTenant';
import LoadingSkeleton from './LoadingSkeleton';
import Tenant from './Tenant';

export default function UsersList() {
  const [Token] = useContext(TokenContext);
  const [Overlay, setOverlay] = useState({ shown: false, userInfo: {} });
  const [Users, setUsers] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  // Necesario estar logueado
  useEffect(() => {
    get(
      'http://localhost:4000/users',
      (data) => {
        setUsers(data.users);
        setLoaded(true);
      },
      (error) => console.log(error),
      Token
    );
  }, [Token]);

  return (
    <section className='pb-28'>
      {Overlay.shown ? (
        <ContactTenant
          setOverlay={setOverlay}
          userInfo={Overlay.userInfo}
          Token={Token}
        />
      ) : (
        ''
      )}
      <section className='w-full flex flex-col gap-5 justify-center items-center mt-14 '>
        <h2 className='text-2xl'>Inquilinos</h2>

        {!Loaded &&
          Array(10)
            .fill(null)
            .map((el, i) => <LoadingSkeleton key={i} />)}

        {Users.length ? (
          Users.map((user) => (
            <Tenant user={user} key={user.idUser} setOverlay={setOverlay} />
          ))
        ) : (
          <div>No hay resultados.</div>
        )}
      </section>
    </section>
  );
}
