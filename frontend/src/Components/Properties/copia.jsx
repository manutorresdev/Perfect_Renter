import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useProperties from '../../Helpers/Hooks/useProperties';
import ContactProperty from '../Forms/ContactProperty';

export default function PropertyInfo(props) {
  const [property, setProperty] = useState({});
  const [Properties] = useProperties();
  const [overlay, setOverlay] = useState({
    form: '',
    show: false,
    propertyInfo: {},
  });

  useEffect(() => {
    const prop = Properties.find(
      (property) =>
        property.idProperty === Number(props.match.params.idProperty)
    );
    if (prop) {
      setProperty(prop);
    }
  }, [props.match.params.idProperty, property, Properties]);

  return (
    <>
      {overlay.show ? (
        <ContactProperty
          form={overlay.form}
          setOverlay={setOverlay}
          property={overlay.propertyInfo}
        />
      ) : (
        ''
      )}
      <div className='pt-20 flex flex-col items-center justify-center'>
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
        <button>
          {Properties.length === Number(props.match.params.idProperty) ? (
            <span className='pointer-events-none'>
              {' '}
              No hay mas propiedades{' '}
            </span>
          ) : (
            <Link
              to={`/alquileres/${Number(props.match.params.idProperty) + 1}`}
              className='border-2 py-1 px-3 bg-yellow-400 hover:bg-gray-500 hover:text-white'
            >
              Siguiente Link
            </Link>
          )}
        </button>
        <button
          className='border-2 py-1 px-3 bg-yellow-400 hover:bg-gray-500 hover:text-white'
          onClick={() => {
            setOverlay({
              form: 'contact',
              show: true,
              propertyInfo: property,
            });
          }}
        >
          Contactar
        </button>
        <button
          className='border-2 py-1 px-3 bg-yellow-400 hover:bg-gray-500 hover:text-white'
          onClick={() => {
            setOverlay({
              form: 'reservar',
              show: true,
              propertyInfo: property,
            });
          }}
        >
          Reservar
        </button>
      </div>
    </>
  );
}
