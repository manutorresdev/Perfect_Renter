import React, { useContext, useEffect, useState } from 'react';
import { get } from '../../Helpers/Api';
import { TokenContext } from '../../Helpers/Hooks/TokenProvider';
import ContactTenant from '../Forms/ContactTenant';
import LoadingSkeleton from './LoadingSkeleton';
import Tenant from './Tenant';
import VoteForm from '../Forms/VoteForm';

export default function UsersList() {
  const [Token] = useContext(TokenContext);
  const [Overlay, setOverlay] = useState({
    shown: false,
    form: '',
    userInfo: {},
  });
  const [Users, setUsers] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  // Necesario estar logueado
  useEffect(() => {
    get(
      'http://192.168.5.103:4000/users',
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
      {Overlay.form === 'contact' && (
        <ContactTenant
          setOverlay={setOverlay}
          userInfo={Overlay.userInfo}
          Token={Token}
        />
      )}
      {Overlay.form === 'vote' && (
        <VoteForm
          setOverlay={setOverlay}
          userInfo={Overlay.userInfo}
          Token={Token}
        />
      )}
      <section className='w-full flex flex-col gap-5 justify-center items-center pt-20'>
        <h1 className='text-4xl text-principal-gris shadow-lg pt-10 md:pt-10 bg-principal-1 w-full p-10 font-semibold'>
          Inquilinos
        </h1>
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
