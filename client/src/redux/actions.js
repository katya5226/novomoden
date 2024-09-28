export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const SAVE_ATT = 'SAVE_ATT';
//export const ADD_TO_CART = 'ADD_TO_CART';
//export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
//export const UPDATE_CART = 'UPDATE_CART';
//export const ADD_TO_ORDER = 'ADD_TO_ORDER';

export function logIn(name, uid) {
  return { type: LOG_IN, name: name, uid: uid };
}

export function logOut() {
  return { type: LOG_OUT };
}

export function saveAtt(att) {
    return { type: SAVE_ATT, att: att };
}

/*export const addToCart = (id) => {
    return { type: ADD_TO_CART, id: id }
}

export const removeFromCart = (id) => {
    return { type: REMOVE_FROM_CART, id: id }
}

export const updateCart = (items) => {
    return { type: UPDATE_CART, items: items }
}

export const addToOrder = (id) => {
    return { type: ADD_TO_ORDER, id: id }
}*/