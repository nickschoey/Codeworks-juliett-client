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

    case orderConstants.DELETE_SUCCESS:
      // remove deleted item from state
      return {
        orders: state.orders.filter(order => order._id !== action.id),
        loading: false
      };
    case orderConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to order 
      return {
        ...state,
        orders: state.orders.map(order => {
          if (order.id === action.id) {
            // make copy of order without 'deleting:true' property
            const { deleting, ...orderCopy } = order;
            // return copy of order with 'deleteError:[error]' property
            return { ...orderCopy, deleteError: action.error };
          }

          return order;
        })
      };

  
    default:
      return state;
  }
}