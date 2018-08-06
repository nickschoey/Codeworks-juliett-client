import { orderConstants } from '../_constants';
import { orderService } from '../_services';
import { alertActions } from './';


const getAll = () => {
  return dispatch => {
    dispatch(request());

    orderService.getAll()
      .then(
        orders => dispatch(success(orders)),
        error => dispatch(failure(error.toString()))
      );
  };
  
  function request () { return { type: orderConstants.GETALL_REQUEST } }
  function success (orders) { return { type: orderConstants.GETALL_SUCCESS, orders } }
  function failure (error) { return { type: orderConstants.GETALL_FAILURE, error } }
}

const _delete = (id) => {
  return dispatch => {
    dispatch(request(id));

    orderService.delete(id)
      .then(
        order => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request (id) { return { type: orderConstants.DELETE_REQUEST, id } }
  function success (id) { return { type: orderConstants.DELETE_SUCCESS, id } }
  function failure (id, error) { return { type: orderConstants.DELETE_FAILURE, id, error } }
}

const getTransactions = () => {
  return dispatch => {
    dispatch(request());

    orderService.getTransactions()
      .then(
        transactions => dispatch(success(transactions)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request () { return { type: orderConstants.GETTRANSACTIONS_REQUEST } }
  function success (transactions) { return { type: orderConstants.GETTRANSACTIONS_SUCCESS, transactions } }
  function failure (error) { return { type: orderConstants.GETTRANSACTIONS_FAILURE, error } }
}

    export const orderActions = {
      getAll,
      delete: _delete,
      getTransactions
    };