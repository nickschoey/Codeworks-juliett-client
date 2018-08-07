import config from 'config';
import { authHeader } from '../_helpers';

const getAll = () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

return fetch(`${config.apiUrl}/order`, requestOptions).then(handleResponse);
}

function _delete (id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/order/${id}`, requestOptions)
    .then(handleResponse);
}

function confirm (id) {
  console.log(JSON.stringify({id}));
  
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({id})
  };

  return fetch(`${config.apiUrl}/order/`, requestOptions)
    .then(handleResponse);
}

const getTransactions = () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/transactions`, requestOptions).then(handleResponse);
}

function handleResponse (response) {

  return response.text()
    .then(text => {
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
export const orderService = {
  getAll,
  delete: _delete,
  getTransactions,
  confirm,
}