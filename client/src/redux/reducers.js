import { LOG_IN,
        LOG_OUT,
        SAVE_ATT } from './actions';


const initialState = {
    loggedInUser: 'guest',
    loggedInUserId: 0,
    saveAttempt: false,
    cartUpdate: false,
    page: 1
};

function rootReducer(state = initialState, action) {

  switch(action.type) {
    case LOG_IN:
      return { loggedInUser: action.name, loggedInUserId: action.uid };

    case LOG_OUT:
      return { loggedInUser: 'guest', loggedInUserId: 0 };

    case SAVE_ATT:
        return { saveAttempt: action.att };
    
    /*case ADD_TO_CART:
        //updatedCart = state.cart.push(action.id);
        return{
            cart: [...initialState.cart, action.id]
        }
    case REMOVE_FROM_CART:
        let updatedCart = initialState.cart.splice(state.cart.indexOf(action.id), 1 );
        return{
            cart: updatedCart
        }
    case UPDATE_CART:
        return{
            cart: action.items
        }
    case ADD_TO_ORDER:
        //updatedCart = state.cart.push(action.id);
        return{ order: action.id };*/

    default:
      return initialState;
  };
}

export default rootReducer;