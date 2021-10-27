import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useProperties from '../../Helpers/Hooks/useProperties';

export default function PropertyInfo(props) {
  const [property, setProperty] = useState({});
  const [Properties] = useProperties();

  useEffect(() => {
    const prop = Properties.find(
      (property) =>
        property.idProperty === Number(props.match.params.idProperty)
    );

    if (prop) {
      setProperty(prop);
    }
  }, [Properties, props.match.params.idProperty]);

  return (
    <div className='pt-20 flex flex-col items-center justify-center'>
      <p>Descripción de la propiedad</p>
      <p>Property{property.idProperty ?? ''}</p>
      <p> {property.idUser ?? ''}</p>
      <p>{property.city ?? ''}</p>
      <p>{property.province ?? ''}</p>
      <p> {property.address ?? ''}</p>
      <p>{property.zipCode ?? ''}</p>
      <p>{property.nomber ?? ''}</p>
      <p>{property.type ?? ''}</p>
      <p>{property.stair ?? ''}</p>
      <p>{property.flat ?? ''}</p>
      <p>{property.gate ?? ''}</p>
      <p>{property.mts ?? ''}</p>
      <button>
        {Properties.length === Number(props.match.params.idProperty) ? (
          <span className='pointer-events-none'> No hay mas propiedades </span>
        ) : (
          <Link
            to={`/alquileres/${Number(props.match.params.idProperty) + 1}`}
            className='border-2 py-1 px-3 bg-yellow-400 hover:bg-gray-500 hover:text-white'
          >
            Siguiente Link
          </Link>
        )}
      </button>
    </div>
  );
}
