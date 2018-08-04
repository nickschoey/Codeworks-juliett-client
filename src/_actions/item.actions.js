import { itemConstants } from '../_constants';
import { itemService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';


const getAll = () => {
  return dispatch => {
    dispatch(request());

    itemService.getAll()
      .then(
        items => dispatch(success(items)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request () { return { type: itemConstants.GETALL_REQUEST } }
  function success (items) { return { type: itemConstants.GETALL_SUCCESS, items } }
  function failure (error) { return { type: itemConstants.GETALL_FAILURE, error } }
}

const addItem = (item) => {
  return dispatch => {
    dispatch(request(item));

    itemService.addItem(item)
      .then(
        item => {
          dispatch(success());
          dispatch(alertActions.success('Item added Successfully'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request (item) { return { type: itemConstants.ADD_REQUEST, item } }
  function success (item) { return { type: itemConstants.ADD_SUCCESS, item } }
  function failure (error) { return { type: itemConstants.ADD_FAILURE, error } }
}

const _delete = (id) => {
  return dispatch => {
    dispatch(request(id));

    itemService.delete(id)
      .then(
        item => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request (id) { return { type: itemConstants.DELETE_REQUEST, id } }
  function success (id) { return { type: itemConstants.DELETE_SUCCESS, id } }
  function failure (id, error) { return { type: itemConstants.DELETE_FAILURE, id, error } }
}


export const itemActions = {
  getAll,
  addItem,
  delete: _delete
}