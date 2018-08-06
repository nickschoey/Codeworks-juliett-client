import { orderConstants } from '../_constants';

export function orders (state = [], action) {
  switch (action.type) {
    case orderConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case orderConstants.GETALL_SUCCESS:
      return {
        orders: action.orders,
        loading: false
      }
      

    case orderConstants.GETALL_FAILURE:
      return {
        error: action.error
      };

  
    default:
      return state;
  }
}