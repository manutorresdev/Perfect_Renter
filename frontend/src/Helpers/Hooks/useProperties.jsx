import { useEffect, useState } from 'react';
import { get } from '../Api';

export default function useProperties() {
  const [properties, setProperty] = useState([]);

  useEffect(() => {
    get(
      'http://localhost:4000/properties',
      (data) => {
        if (data.message !== 'No hay conicidencias para su busqueda') {
          setTimeout(() => {
            setProperty(data.properties);
          }, 500);
        }
        setProperty([]);
      },
      (error) => console.log(error)
    );
  }, []);

  return [properties, setProperty];
}
