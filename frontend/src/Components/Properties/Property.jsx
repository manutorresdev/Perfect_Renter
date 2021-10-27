import React from 'react';
<<<<<<< HEAD

import { Link } from 'react-router-dom';

export default function Property({ property }) {
  return (
    <>
      <div className='my-5 border border-black'>
        <Link to={`/properties/${property.idProperty}`}>
          <div>
            {property.city}
            <br />
            {property.province}
            <br />
            {property.adress}
          </div>
        </Link>
      </div>
    </>
=======
import { Link} from "react-router-dom";
import PropertyInfo from './PropertyInfo';



export default function Property({children, property, match}) {

  if (!match) {
    return (
      <Link to={`/alquileres/${property.idProperty}`}>
      {children}
      </Link>
>>>>>>> origin
  );
  }
  else{
    return (
        <PropertyInfo match={match} />
     );
  }
  
}
