import { React } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import '../../mediaQuery.css';
// import * as FaIcons from "react-icons/fa";

export function Home(props) {
  return (
    <>
      <Banner />
      <div className='main-body'>
        <HomeRenteresList />
        <HomeFlatList />

        <section className='description-section'>
          <h3>Titulo del Section</h3>
          <img src='/Images/flat.jpg' alt='' />
          <p>
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
        <section className='description-section'>
          <h3>Titulo del Section</h3>
          <img src='/Images/flat.jpg' alt='' />
          <p>
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

function HomeFlatList(props) {
  return (
    <div className='box-container-flex'>
      <h2>Titulo de los Flats</h2>
      <div className='box-container-grid'>
        <PropertyDescription />
        <PropertyDescription />
        <PropertyDescription />
        <PropertyDescription />
      </div>
      <Link to='/alquileres' className='btn-more-bgw'>
        <button>Ver Mas</button>
      </Link>
    </div>
  );
}

function PropertyDescription(props) {
  return (
    <div className='box-img-desc'>
      <img className='img-desc' src='/Images/flat.jpg' alt='' />
      <div className='desc-img'>
        <h2>Title Flat</h2>
        <p>Description del Flat</p>
      </div>
    </div>
  );
}

function Banner() {
  return (
    <div className='main-header'>
      <div className='header-text'>
        <h3>Encuentra tu</h3>
        <h1>Inquilino Perfecto</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          doloribus nostrum rerum quisquam libero fugiat quam, at tempora
          eligendi, dolores officia quos consequuntur facere, impedit aliquid
          blanditiis dolorum voluptates laudantium.
        </p>
        <Link to='/nosotros' className='btn-more'>
          Leer más
        </Link>
      </div>
    </div>
  );
}

function HomeRenteresList(props) {
  return (
    <div className='box-container-flex'>
      <h2>Titulo de los renters</h2>
      <div className='box-container-grid'>
        <RenterDescription />
        <RenterDescription />
        <RenterDescription />
        <RenterDescription />
      </div>
      <Link to='/inquilinos' className='btn-more-bgw'>
        Ver Mas
      </Link>
    </div>
  );
}
function RenterDescription(props) {
  return (
    <div className='box-img-desc'>
      <img src='/Images/renter.jpg' alt='' />
      <div className='desc-img'>
        <h2>Title renter</h2>
        <p>Description del Renter</p>
      </div>
    </div>
  );
}
