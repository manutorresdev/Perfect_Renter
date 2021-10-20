import React, { useState } from 'react';
import { Link} from "react-router-dom";
import PropertyInfo from './PropertyInfo';



export default function Property({children, property, match}) {



  if (!match) {
    return (
      <Link to={`/alquileres/${property.idProperty}`}>
      {children}
      </Link>
  );
  }
  else{
    return (
        <PropertyInfo match={match} />
     );
  }
  
}
