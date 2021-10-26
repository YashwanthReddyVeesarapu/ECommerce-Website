import cartTypes from './cart.types';

export const addProduct = (nextCartItem, size, colour) => ({
  type: cartTypes.ADD_TO_CART,
  payload1: nextCartItem,
  payload2: size,
  payload3: colour
});

export const removeCartItem = (cartItem) => ({
  type: cartTypes.REMOVE_CART_ITEM,
  payload: cartItem
});

export const reduceCartItem = (cartItem) => ({
  type: cartTypes.REDUCE_CART_ITEM,
  payload: cartItem
});

export const clearCart = () => ({
  type: cartTypes.CLEAR_CART
});

export const handleSize = (s, product) => ({
  type: cartTypes.SELECT_SIZE,
  payload1: s,
  payload2: product,

});

export const handleColour = (c, product) => ({
  type: cartTypes.SELECT_COLOUR,
  payload1: c,
  payload2: product,

});



