import { React } from 'react';
import { Link } from 'react-router-dom';

// Styles
const sectionStyle =
  'h-max-content p-5 text-principal-1 overflow-y-auto bg-gray-Primary';
const sectionTitleStyle = 'pb-5 text-3xl font-medium';
const sectionImgStyle = 'w-2/5 float-right pl-3';
const boxContStyle = 'flex flex-col gap-5';
const boxContTitleStyle = 'w-full text-center pb-3 text-principal-1';
const boxItemContStyle =
  'grid grid-cols-1 grid-rows-auto gap-2 justify-items-center sm:grid-cols-2';
const boxReadMoreBtnStyle =
  'm-auto text-xl bg-gray-Primary text-principal-1 border-2 border-gray-800 max-w-max px-6 py-2 hover:bg-principal-1 hover:text-gray-700 duration-300';
const descBoxStyle = 'content-center w-3/4 h-full bg-principal-1';
const descBoxTextStyle = 'text-left p-4';
const descBoxTitleStyle = 'text-base text-gray-700 pb-3';
const descBoxPStyle = 'text-gray-700 text-sm';

export function Home() {
  return (
    <>
      <Banner />
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(16, 16, 16, 0.9),rgba(16, 16, 16, 0.3)),url('./Images/fondo-gris.jpeg')",
        }}
        className='bg-center bg-no-repeat bg-cover flex flex-col gap-7 sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:pt-5 sm:h-full sm:w-full'
      >
        <HomeRentersList />
        <HomePropertiesList />
        <section className={sectionStyle}>
          <h3 className={sectionTitleStyle}>Renters</h3>
          <img className={sectionImgStyle} src='/Images/flat.jpg' alt='' />
          <p className='text-justify'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis excepturi blanditiis quasi tempore qui et, aperiam,
            recusandae voluptatum illo, magni aliquid molestias vero ratione
            distinctio commodi hic deleniti autem quisquam? Repellendus,
            officia? Fuga quam, provident voluptate laudantium, quis error rem
            ipsam in labore nobis quaerat autem repellat praesentium excepturi
            quas possimus voluptates rerum qui mollitia velit nemo corrupti
            facilis quos. Ut delectus praesentium similique placeat, repellat
            deserunt quam consectetur neque numquam exercitationem, consequatur
          </p>
        </section>
        <section className={sectionStyle}>
          <h3 className={sectionTitleStyle}>Alquileres</h3>
          <img className={sectionImgStyle} src='/Images/flat.jpg' alt='' />
          <p className='text-justify'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis excepturi blanditiis quasi tempore qui et, aperiam,
            recusandae voluptatum illo, magni aliquid molestias vero ratione
            distinctio commodi hic deleniti autem quisquam? Repellendus,
            officia? Fuga quam, provident voluptate laudantium, quis error rem
            ipsam in labore nobis quaerat autem repellat praesentium excepturi
            quas possimus voluptates rerum qui mollitia velit nemo corrupti
            facilis quos. Ut delectus praesentium similique placeat, repellat
            deserunt quam consectetur neque numquam exercitationem, consequatur
          </p>
        </section>
      </div>
    </>
  );
}

function Banner() {
  return (
    <div
      className='bg-center bg-cover h-60vh max-w-full grid grid-cols-10 grid-rows-8'
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
          doloribus nostrum rerum quisquam libero fugiat quam, at tempora
          eligendi, dolores officia quos consequuntur facere, impedit aliquid
          blanditiis dolorum voluptates laudantium.
        </p>
        <Link
          to='/nosotros'
          className='btn-more text-xl bg-none p-2 border-yellow-400 border-2 max-w-max hover:bg-principal-1 hover:border-white hover:text-gray-600'
        >
          Leer más
        </Link>
      </div>
    </div>
  );
}

function HomePropertiesList() {
  return (
    <div className={boxContStyle}>
      <h2 className={boxContTitleStyle}>Titulo de los alquileres</h2>
      <div className={boxItemContStyle}>
        <PropertyDescription />
        <PropertyDescription />
        <PropertyDescription />
        <PropertyDescription />
      </div>
      <Link to='/alquileres' className={boxReadMoreBtnStyle}>
        <button>Ver Mas</button>
      </Link>
    </div>
  );
}

function PropertyDescription() {
  return (
    <div className={descBoxStyle}>
      <img className='w-full' src='/Images/flat.jpg' alt='' />
      <div className={descBoxTextStyle}>
        <h2 className={descBoxTitleStyle}>Title Flat</h2>
        <p className={descBoxPStyle}>Description del Alquiler</p>
      </div>
    </div>
  );
}

function HomeRentersList() {
  return (
    <div className={boxContStyle}>
      <h2 className={boxContTitleStyle}>Titulo de los renters</h2>
      <div className={boxItemContStyle}>
        <RenterDescription />
        <RenterDescription />
        <RenterDescription />
        <RenterDescription />
      </div>
      <Link to='/inquilinos' className={boxReadMoreBtnStyle}>
        Ver Mas
      </Link>
    </div>
  );
}
function RenterDescription() {
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
