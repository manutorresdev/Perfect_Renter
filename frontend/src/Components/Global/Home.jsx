import { React, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../Helpers/Api';
import useProperties from '../../Helpers/Hooks/useProperties';

// Styles
const sectionStyle =
  'h-max-content p-5 text-principal-1 overflow-y-auto bg-gray-Primary';
const sectionTitleStyle = 'pb-5 text-3xl font-medium';
const sectionImgStyle = 'w-2/5 float-right pl-3';
const boxContStyle = 'flex flex-col gap-5';
const boxContTitleStyle =
  'w-full text-center pb-3 text-principal-1 underline text-xl';
const boxItemContStyle =
  'grid grid-cols-1 grid-rows-auto gap-2 justify-items-center sm:grid-cols-2';
const boxReadMoreBtnStyle =
  'm-auto text-xl bg-gray-Primary text-principal-1 border-2 border-gray-800 max-w-max px-6 py-2 hover:bg-principal-1 hover:text-gray-700 duration-300';
const descBoxStyle = 'content-center w-3/4 h-full bg-principal-1';
const descBoxTextStyle = 'text-left p-4';
const descBoxTitleStyle = 'text-base text-gray-700 pb-3 font-medium';
const descBoxPStyle = 'text-gray-700 text-sm pl-2';

/**
 * Componente que devuelve la landing page de la app.
 * @component
 * @example
 *  return (
 *      <>
      <Banner />
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(16, 16, 16, 0.9),rgba(16, 16, 16, 0.3)),url('./Images/fondo-gris.jpeg')",
        }}
        className='bg-center bg-no-repeat bg-cover flex flex-col gap-7 sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:pt-5 sm:h-full sm:w-full pb-32'
      >
        <RentersList />
        <PropertiesList />
        <RenterDescription />
        <PropertyDescription />
      </div>
    </>
 * )
 *
 */
export function Home() {
  return (
    <>
      <Banner />
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(16, 16, 16, 0.9),rgba(16, 16, 16, 0.3)),url('./Images/fondo-gris.jpeg')",
        }}
        className='bg-center bg-no-repeat bg-cover flex flex-col gap-7 sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:pt-5 sm:h-full sm:w-full pb-32'
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
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis
        excepturi blanditiis quasi tempore qui et, aperiam, recusandae
        voluptatum illo, magni aliquid molestias vero ratione distinctio commodi
        hic deleniti autem quisquam? Repellendus, officia? Fuga quam, provident
        voluptate laudantium, quis error rem ipsam in labore nobis quaerat autem
        repellat praesentium excepturi quas possimus voluptates rerum qui
        mollitia velit nemo corrupti facilis quos. Ut delectus praesentium
        similique placeat, repellat deserunt quam consectetur neque numquam
        exercitationem, consequatur
      </p>
    </section>
  );
}

function RenterDescription() {
  return (
    <section className={sectionStyle}>
      <h3 className={sectionTitleStyle}>Renters</h3>
      <img className={sectionImgStyle} src='/Images/flat.jpg' alt='' />
      <p className='text-justify'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis
        excepturi blanditiis quasi tempore qui et, aperiam, recusandae
        voluptatum illo, magni aliquid molestias vero ratione distinctio commodi
        hic deleniti autem quisquam? Repellendus, officia? Fuga quam, provident
        voluptate laudantium, quis error rem ipsam in labore nobis quaerat autem
        repellat praesentium excepturi quas possimus voluptates rerum qui
        mollitia velit nemo corrupti facilis quos. Ut delectus praesentium
        similique placeat, repellat deserunt quam consectetur neque numquam
        exercitationem, consequatur
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          doloribus nostrum rerum quisquam libero fugiat quam.
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
        className='relative col-start-2 col-end-10 sm:col-start-4 sm:col-end-8 row-start-7 row-end-8 self-end w-full'
      >
        <input
          type='text'
          {...register('city', {
            pattern: {
              value:
                /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
              message:
                'La ciudad no puede contener carácteres especiales ni números.',
            },
            maxLength: {
              value: 30,
              message: 'La ciudad no puede tener más de 50 carácteres.',
            },
          })}
          placeholder='Escribe aquí tu ciudad favorita...'
          className='w-full pl-2 bg-gray-Primary border border-gray-300 border-opacity-20 text-white'
        />
        <FaSearch
          onClick={handleSubmit(onSubmit)}
          className='text-gray-300 absolute top-1 right-2 cursor-pointer'
        />
      </form>
    </div>
  );
}

function PropertiesList() {
  const [properties] = useProperties();
  const [Imgs, setImgs] = useState([]);

  useEffect(() => {
    setImgs([
      require('../../Images/defPicture.jpg').default,
      require('../../Images/defPicture2.jpg').default,
      require('../../Images/defPicture4.jpg').default,
      require('../../Images/defPicture3.jpg').default,
    ]);
  }, []);

  return (
    <div className={boxContStyle}>
      <h2 className={boxContTitleStyle}>ALQUILERES</h2>
      <div className={boxItemContStyle}>
        {properties.length > 1 &&
          properties.slice(0, 4).map((property, i) => {
            return (
              <Property key={i}>
                <Link to={`/alquileres/${property.idProperty}`}>
                  <img className='w-full' src={Imgs[i]} alt='' />
                </Link>
                <span>
                  {property.type && capitalizeFirstLetter(property.type)} en{' '}
                  {property.city}
                </span>
                <span>
                  {`${Number(property.mts)}m² - ${property.rooms} Hab - ${
                    property.toilets
                  } ${property.toilets > 1 ? 'Baños' : 'Baño'}`}
                </span>
              </Property>
            );
          })}
      </div>
      <Link to='/alquileres' className={boxReadMoreBtnStyle}>
        <button>Ver Mas</button>
      </Link>
    </div>
  );
}

function Property({ children }) {
  return (
    <div className={descBoxStyle}>
      {children[0]}
      <div className={descBoxTextStyle}>
        <h2 className={descBoxTitleStyle}>{children[1]}</h2>
        <p className={descBoxPStyle}>{children[2]}</p>
      </div>
    </div>
  );
}

function RentersList() {
  return (
    <div className={boxContStyle}>
      <h2 className={boxContTitleStyle}>INQUILINOS</h2>
      <div className={boxItemContStyle}>
        <Renter />
        <Renter />
        <Renter />
        <Renter />
      </div>
      <Link to='/inquilinos' className={boxReadMoreBtnStyle}>
        Ver Mas
      </Link>
    </div>
  );
}
function Renter() {
  return (
    <div className={descBoxStyle}>
      <img className=' w-full' src='/Images/renter.jpg' alt='' />
      <div className={descBoxTextStyle}>
        <h2 className={descBoxTitleStyle}>Title renter</h2>
        <p className={descBoxPStyle}>Description del Renter</p>
      </div>
    </div>
  );
}
