import { itemConstants } from '../_constants';

export function items (state = {}, action) {
  switch (action.type) {
    case itemConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case itemConstants.GETALL_SUCCESS:
      return {
        items: action.items
      }

    case itemConstants.GETALL_FAILURE:
      return {
        error: action.error
      };

    case itemConstants.ADD_REQUEST:
      return { adding: true };
    case itemConstants.ADD_SUCCESS:
      return {};
    case itemConstants.ADD_FAILURE:
      return {};


    case itemConstants.DELETE_REQUEST:
      // add 'deleting:true' property to item being deleted
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.id
            ? { ...item, deleting: true }
            : item
        )
      };
    case itemConstants.DELETE_SUCCESS:
      // remove deleted item from state
      return {
        items: state.items.filter(item => item._id !== action.id)
      };
    case itemConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to item 
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.id) {
            // make copy of item without 'deleting:true' property
            const { deleting, ...itemCopy } = item;
            // return copy of item with 'deleteError:[error]' property
            return { ...itemCopy, deleteError: action.error };
          }

          return item;
        })
      };

    default:
      return state;
  }
}