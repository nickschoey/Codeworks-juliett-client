import config from 'config';
import { authHeader } from '../_helpers';

const getAll = () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/items`, requestOptions).then(handleResponse);
}
function addItem (item) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  };

  return fetch(`${config.apiUrl}/items/`, requestOptions).then(handleResponse);
}

function _delete (id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/items/${id}`, requestOptions).then(handleResponse);
}


function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
export const itemService = {
  getAll,
  delete: _delete,
  addItem
}