import { useEffect, useState } from 'react';
import { get } from '../Api';

export default function useProperties(match) {
  const [properties, setProperty] = useState([]);
  console.log('\x1b[43m########\x1b[30m', properties);
  useEffect(() => {
    get(
      'http://localhost:4000/properties',
      (data) => {
        if (data.message !== 'No hay conicidencias para su busqueda') {
          setProperty(data.properties);
        }
      },
      (error) => console.log(error)
    );
  }, []);

  return [properties, setProperty];
}
