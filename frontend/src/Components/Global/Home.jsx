import { React, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import useProperties from '../../Helpers/Hooks/useProperties';
import Property from '../Properties/Property';
import { TokenContext } from '../../Helpers/Hooks/TokenProvider';
import { get } from '../../Helpers/Api';

// Styles
const sectionStyle =
  'h-max-content p-5 text-principal-1 overflow-y-auto bg-gray-Primary';
const sectionTitleStyle = 'pb-5 text-3xl font-medium';
const sectionImgStyle = 'w-2/5 float-right pl-3';
const boxContStyle = 'row-span-2 flex flex-col gap-5 b';
const boxContTitleStyle =
  'w-full text-center pt-4 pb-3 text-principal-1 underline text-xl';
const boxItemContStyle =
  'grid grid-cols-1 grid-rows-auto gap-2 justify-items-center sm:grid-cols-2';
const boxReadMoreBtnStyle =
  'm-auto text-xl bg-gray-Primary text-principal-1 border-2 border-gray-800 max-w-max px-6 py-2 hover:bg-principal-1 hover:text-gray-700 duration-300';
const descBoxStyle = 'content-center w-3/4 h-full bg-principal-1-hover';
const descBoxTextStyle = 'text-left p-4';
const descBoxTitleStyle = 'text-base text-gray-700 pb-3 font-medium';
const descBoxPStyle = 'text-gray-700 text-sm pl-2';

export function Home() {
  return (
    <>
      <Banner />
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(16, 16, 16, 0.9),rgba(16, 16, 16, 0.3)),url('./Images/fondo-gris.jpeg')",
        }}
        className='bg-center bg-no-repeat bg-cover flex flex-col gap-7 sm:grid sm:grid-cols-2 sm:grid-rows-3 sm:pt-5  sm:w-full pb-32'
      >
        <RentersList />
        <PropertiesList />
        <RenterDescription />
        <PropertyDescription />
      </div>
    </>
  );
}

function PropertyDescription() {
  return (
    <section className={sectionStyle}>
      <h3 className={sectionTitleStyle}>Alquileres</h3>
      <img className={sectionImgStyle} src='/Images/flat.jpg' alt='' />
      <p className='text-justify'>
        Si tienes una vivienda y quieres ponerla en alquiler... ¡Te damos la
        bienvenida a Perfect Renter! Encontrarás personas interesadas en una
        vivienda vacacional y personas que lo que buscan es un hogar. Todas con
        un historial de votaciones que te ayudarán a tomar la mejor decisión.
        ¡Estamos aquí para que encuentres a tu inquilino perfecto!
      </p>
    </section>
  );
}

function RenterDescription() {
  return (
    <section className={sectionStyle}>
      <h3 className={sectionTitleStyle}>Renters</h3>
      <img className={sectionImgStyle} src='/Images/familia.jpg' alt='' />
      <p className='text-justify'>
        Sabemos que encontrar una vivienda puede ser complicado y queremos
        ponértelo fácil. Tanto si necesitas un lugar en el que pasar unos días,
        como si lo que buscas es un hogar para ti o tu familia, en Perfect
        Renter tenemos lo que necesitas. Un catálogo de viviendas con un
        historial de votaciones de antiguos inquilinos que te ayudarán a
        encontrar tu vivivienda perfecta.
      </p>
    </section>
  );
}

function Banner() {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  function onSubmit(body, e) {
    e.preventDefault();
    history.push(`/alquileres?ciudad=${body.city}`);
  }
  return (
    <div
      className='header bg-center bg-cover sm:h-60vh h-1/3  max-w-full grid grid-cols-10 grid-rows-8'
      style={{
        backgroundImage:
          "linear-gradient(rgba(16, 16, 16, 0.3),rgba(16, 16, 16, 0.9)),url('./Images/bgheader.jpg')",
      }}
    >
      <div className='header-text col-start-2 col-end-10 sm:col-start-7 sm:col-end-11 row-start-3 row-end-6 text-white h-30vh flex flex-col gap-2'>
        <h3 className='text-xl font-light'>Encuentra tu</h3>
        <h1 className='text-4xl text-principal-1'>Inquilino Perfecto</h1>
        <p className='w-4/5 text-base font-light'>
          Porque tú o tu propiedad merecen ser valorados. Busca pisos e
          inquilinos, mira sus reseñas y contacta con solo unos Click's.
        </p>
        <Link
          to='/nosotros'
          className='btn-more text-xl bg-none p-2 border-yellow-400 border-2 max-w-max hover:bg-principal-1 hover:border-white hover:text-gray-600 duration-300'
        >
          Leer más
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative col-start-2 col-end-10 mt-14 sm:col-start-4 sm:col-end-8 row-start-7 row-end-8 self-end w-full'
      >
        <input
          type='text'
          {...register('city', {
            pattern: {
              value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
              message:
                'La ciudad no puede contener carácteres especiales ni números.',
            },
            maxLength: {
              value: 30,
              message: 'La ciudad no puede tener más de 50 carácteres.',
            },
          })}
          placeholder='Escribe aquí tu ciudad favorita...'
          className='w-full pl-2 p-2 bg-gray-300 outline-contras'
        />
        {/* className='w-full pl-2 bg-gray-Primary border border-gray-300 border-opacity-20 text-white' */}
        <FaSearch
          onClick={handleSubmit(onSubmit)}
          className='text-gray-900 absolute top-3 right-2 cursor-pointer'
        />
      </form>
    </div>
  );
}

function PropertiesList() {
  const [Properties] = useProperties();

  return (
    <div className={boxContStyle}>
      <h2 className={boxContTitleStyle}>ALQUILERES</h2>
      <div className={boxItemContStyle}>
        {Properties.length > 0 &&
          Properties.slice(0, 4).map((property) => (
            <Property
              key={property.idProperty}
              property={property}
              mountOn={'home'}
            />
          ))}
      </div>

      <Link to='/alquileres' className={boxReadMoreBtnStyle}>
        <button>Ver Mas</button>
      </Link>
    </div>
  );
}

function RentersList() {
  const [Token] = useContext(TokenContext);
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    get(
      'http://192.168.5.103:4000/users',
      (data) => {
        setUsers(data.users);
      },
      (error) => console.log(error),
      Token
    );
  }, [Token]);

  return (
    <div className={boxContStyle}>
      <h2 className={boxContTitleStyle}>INQUILINOS</h2>
      <div className={boxItemContStyle}>
        {Users.length
          ? Users.slice(0, 4).map((user) => (
              <Renter key={user.idUser} user={user} />
            ))
          : ''}
      </div>
    </div>
  );
}
function Renter({ user }) {
  return (
    <div className={descBoxStyle}>
      <img
        className=' w-full'
        src={'http://192.168.5.103:4000/photo/' + user.avatar}
        alt=''
      />
      <div className={descBoxTextStyle}>
        <h2 className={descBoxTitleStyle}>{user.name}</h2>
        <p className={descBoxPStyle}>{user.city}</p>
      </div>
    </div>
  );
}

// import { React, useContext, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaSearch } from 'react-icons/fa';
// import { Link, useHistory } from 'react-router-dom';
// import useProperties from '../../Helpers/Hooks/useProperties';
// import Property from '../Properties/Property';
// import { TokenContext } from '../../Helpers/Hooks/TokenProvider';
// import { get } from '../../Helpers/Api';

// // Styles
// const sectionStyle =
//   'h-max-content p-5 text-principal-1 overflow-y-auto bg-gray-Primary';
// const sectionTitleStyle = 'pb-5 text-3xl font-medium';
// const sectionImgStyle = 'w-2/5 float-right pl-3';
// const boxContStyle = 'row-span-2 flex flex-col gap-5 b';
// const boxContTitleStyle =
//   'w-full text-center pt-4 pb-3 text-principal-1 underline text-xl';
// const boxItemContStyle =
//   'grid grid-cols-1 grid-rows-auto gap-2 justify-items-center sm:grid-cols-2';
// const boxReadMoreBtnStyle =
//   'm-auto text-xl bg-gray-Primary text-principal-1 border-2 border-gray-800 max-w-max px-6 py-2 hover:bg-principal-1 hover:text-gray-700 duration-300';
// const descBoxStyle = 'content-center w-3/4 h-full bg-principal-1-hover';
// const descBoxTextStyle = 'text-left p-4';
// const descBoxTitleStyle = 'text-base text-gray-700 pb-3 font-medium';
// const descBoxPStyle = 'text-gray-700 text-sm pl-2';

// export function Home() {
//   return (
//     <>
//       <Banner />
//       <div
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(16, 16, 16, 0.9),rgba(16, 16, 16, 0.3)),url('./Images/fondo-gris.jpeg')",
//         }}
//         className='bg-center bg-no-repeat bg-cover flex flex-col gap-7 sm:grid sm:grid-cols-2 sm:grid-rows-3 sm:pt-5  sm:w-full pb-32'
//       >
//         <RentersList />
//         <PropertiesList />
//         <RenterDescription />
//         <PropertyDescription />
//       </div>
//     </>
//   );
// }

// function PropertyDescription() {
//   return (
//     <section className={sectionStyle}>
//       <h3 className={sectionTitleStyle}>Alquileres</h3>
//       <img className={sectionImgStyle} src='/Images/flat.jpg' alt='' />
//       <p className='text-justify'>
//         Si tienes una vivienda y quieres ponerla en alquiler... ¡Te damos la
//         bienvenida a Perfect Renter! Encontrarás personas interesadas en una
//         vivienda vacacional y personas que lo que buscan es un hogar. Todas con
//         un historial de votaciones que te ayudarán a tomar la mejor decisión.
//         ¡Estamos aquí para que encuentres a tu inquilino perfecto!
//       </p>
//     </section>
//   );
// }

// function RenterDescription() {
//   return (
//     <section className={sectionStyle}>
//       <h3 className={sectionTitleStyle}>Renters</h3>
//       <img className={sectionImgStyle} src='/Images/familia.jpg' alt='' />
//       <p className='text-justify'>
//         Sabemos que encontrar una vivienda puede ser complicado y queremos
//         ponértelo fácil. Tanto si necesitas un lugar en el que pasar unos días,
//         como si lo que buscas es un hogar para ti o tu familia, en Perfect
//         Renter tenemos lo que necesitas. Un catálogo de viviendas con un
//         historial de votaciones de antiguos inquilinos que te ayudarán a
//         encontrar tu vivivienda perfecta.
//       </p>
//     </section>
//   );
// }

// function Banner() {
//   const history = useHistory();
//   const { register, handleSubmit } = useForm();

//   function onSubmit(body, e) {
//     e.preventDefault();
//     history.push(`/alquileres?ciudad=${body.city}`);
//   }
//   return (
//     <div
//       className='header bg-center bg-cover sm:h-60vh h-1/3  max-w-full grid grid-cols-10 grid-rows-8'
//       style={{
//         backgroundImage:
//           "linear-gradient(rgba(16, 16, 16, 0.3),rgba(16, 16, 16, 0.9)),url('./Images/bgheader.jpg')",
//       }}
//     >
//       <div className='header-text col-start-2 col-end-10 sm:col-start-7 sm:col-end-11 row-start-3 row-end-6 text-white h-30vh flex flex-col gap-2'>
//         <h3 className='text-xl font-light'>Encuentra tu</h3>
//         <h1 className='text-4xl text-principal-1'>Inquilino Perfecto</h1>
//         <p className='w-4/5 text-base font-light'>
//           Porque tú o tu propiedad merecen ser valorados. Busca pisos e
//           inquilinos, mira sus reseñas y contacta con solo unos Click's.
//         </p>
//         <Link
//           to='/nosotros'
//           className='btn-more text-xl bg-none p-2 border-yellow-400 border-2 max-w-max hover:bg-principal-1 hover:border-white hover:text-gray-600 duration-300'
//         >
//           Leer más
//         </Link>
//       </div>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className='relative col-start-2 col-end-10 mt-14 sm:col-start-4 sm:col-end-8 row-start-7 row-end-8 self-end w-full'
//       >
//         <input
//           type='text'
//           {...register('city', {
//             pattern: {
//               value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
//               message:
//                 'La ciudad no puede contener carácteres especiales ni números.',
//             },
//             maxLength: {
//               value: 30,
//               message: 'La ciudad no puede tener más de 50 carácteres.',
//             },
//           })}
//           placeholder='Escribe aquí tu ciudad favorita...'
//           className='w-full pl-2 bg-gray-300 outline-contras'
//         />
//         {/* className='w-full pl-2 bg-gray-Primary border border-gray-300 border-opacity-20 text-white' */}
//         <FaSearch
//           onClick={handleSubmit(onSubmit)}
//           className='text-gray-900 absolute top-1 right-2 cursor-pointer'
//         />
//       </form>
//     </div>
//   );
// }

// function PropertiesList() {
//   const [Properties] = useProperties();

//   return (
//     <div className={boxContStyle}>
//       <h2 className={boxContTitleStyle}>ALQUILERES</h2>
//       <div className={boxItemContStyle}>
//         {Properties.length > 0 &&
//           Properties.slice(0, 4).map((property) => (
//             <Property
//               key={property.idProperty}
//               property={property}
//               mountOn={'propertiesList'}
//             />
//           ))}
//       </div>

//       <Link to='/alquileres' className={boxReadMoreBtnStyle}>
//         <button>Ver Mas</button>
//       </Link>
//     </div>
//   );
// }

// function RentersList() {
//   const [Token] = useContext(TokenContext);
//   const [Users, setUsers] = useState([]);

//   useEffect(() => {
//     console.log('hhhooolllaaaaaa');
//     get(
//       'http://192.168.5.103:4000/users',
//       (data) => {
//         console.log('esta es la data: ', data);
//         setUsers(data.users);
//       },
//       (error) => console.log(error),
//       Token
//     );
//   }, [Token]);

//   console.log('Users', Users);

//   return (
//     <div className={boxContStyle}>
//       <h2 className={boxContTitleStyle}>INQUILINOS</h2>
//       <div className={boxItemContStyle}>
//         {Users.length
//           ? Users.slice(0, 4).map((user) => <Renter user={user} />)
//           : ''}
//       </div>
//     </div>
//   );
// }
// function Renter({ user }) {
//   return (
//     <div className={descBoxStyle}>
//       <img
//         className=' w-full'
//         src={'http://192.168.5.103:4000/photo/' + user.avatar}
//         alt=''
//       />
//       <div className={descBoxTextStyle}>
//         <h2 className={descBoxTitleStyle}>{user.name}</h2>
//         <p className={descBoxPStyle}>{user.city}</p>
//       </div>
//     </div>
//   );
// }
