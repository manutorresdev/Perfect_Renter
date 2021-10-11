export const post = (url, body, callback, errorCallback, token) => {
  console.log('Enviado.');
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      console.log('Respuesta de api.js/fetch', res);
      return res.json();
    })
    .then((data) => {
      if (data.status !== 'error') {
        callback(data);
      } else {
        console.log('Data de api.js/fetch', data);
        errorCallback(data);
      }
      return data;
    });
};

export const get = (url, onSuccess, token) => {
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.statusText === 'Unauthorized') {
        throw new Error('Debes iniciar sesión para cargar los mensajes.');
      } else {
        window.alert(
          res.json().then((text) => {
            return text;
          })
        );
        return res.json().then((text) => {
          throw new Error(text);
        });
      }
    })
    .then((data) => onSuccess(data))
    .catch((e) => {
      console.error(e);
    });
};
// Do something with the successful response
export function parseJwt(token) {
  if (!token) {
    return;
  } else if (typeof token !== 'string') {
    return;
  }
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}
