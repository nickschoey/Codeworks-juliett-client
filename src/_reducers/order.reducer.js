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

    case orderConstants.DELETE_REQUEST:
    // remove deleted item from state
      return {
        ...state,
        loading: true
      };
      case orderConstants.DELETE_SUCCESS:
      // remove deleted item from state
      return {
        ...state,
        unmatchedOrders: state.unmatchedOrders.filter(order => order.id !== action.id),
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
    case orderConstants.CONFIRM_SUCCESS:

      
      return {
        ...state,
        matchedOrders: state.matchedOrders.filter(order => order.id !== action.id),
        loading: false
      };
    case orderConstants.CONFIRM_FAILURE:
       
      return {
        ...state,
        loading: false
      }

    case orderConstants.GETTRANSACTIONS_REQUEST:
      return {
        loading: true
      };

    case orderConstants.GETTRANSACTIONS_SUCCESS:
    
      return {...state,
        loading: false,
        matchedOrders: action.transactions.matchedOrders,
        unmatchedOrders: action.transactions.unmatchedOrders,
        unmatchedTxs: action.transactions.unmatchedTxs,
      }


    case orderConstants.GETTRASANCTIONS_FAILURE:
      return {
        error: action.error
      };

  
    default:
      return state;
  }
}