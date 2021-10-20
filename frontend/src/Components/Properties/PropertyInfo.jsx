import { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { get } from '../../Helpers/Api';

export default function PropertyInfo({ match }) {
  const [property, setProperty] = useState({});

  const [idProp] = useState(match.params.idProperty);

  useEffect(() => {
    get(
      `http://localhost:4000/properties/${idProp}`,
      (data) => {
        setProperty(data.property);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [idProp]);

  //    const sigProp = () => setIdProp(idProp+1);
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <p>Descripción de la propiedad</p>
      <p>Property{property.idProperty}</p>
      <p> {property.idUser}</p>
      <p>{property.city}</p>
      <p>{property.province}</p>
      <p> {property.address}</p>
      <p>{property.zipCode}</p>
      <p>{property.nomber}</p>
      <p>{property.type}</p>
      <p>{property.stair}</p>
      <p>{property.flat}</p>
      <p>{property.gate}</p>
      <p>{property.mts}</p>
      {/* <button onClick={sigProp}>Siguiente</button> */}
    </div>
  );
}
