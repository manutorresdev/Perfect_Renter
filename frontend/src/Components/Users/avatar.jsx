/* import React, { useState } from 'react';




const Avatar= () => {
  const [file, setFile] = useState([]);

  async function uploadFile() {
    let data = new FormData();
    data.append('image', file);
    const response = await fetch(`http://localhost:4000/users/${user.idUser}`, {
      method: 'POST',
      body: data,
    });
    try {
      const response = await fetch('http://localhost:3050/files', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
        if (response.ok) {
          const body = await response.json();
    
          callback(body);
          console.log(callback);
          // respuesta correcta, hacer algo con body
        } else {
          onError(response);
          console.log(
            'Codigo de estado no esperado',
            response.status,
            response.statusText
          );
          // respuesta erronea, informar al usuario?
        }
    } catch (msg) {
      // fallo de comunicación, informar al usuario?
      console.error('Errorísimo!!!!', msg);
    }
  }

  const newFile = (e) => {
    e.preventDefault();
    const f = e.target.files[0];
    setFile(f);
  };

  /* if (token) {
    return <Redirect to='/' />;
  } 

  return (
    <form onSubmit={uploadFile} className='SelectFile'>
      <div>
        <h1>File</h1>
        <label>Selecciona un archivo</label>
        <input type='file' onChange={newFile} />
      </div>
      <button type='submit'>Subir</button>
    </form>
  );
};

export default Avatar; */
