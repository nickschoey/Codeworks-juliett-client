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
    export const orderActions = {
      getAll,
    };