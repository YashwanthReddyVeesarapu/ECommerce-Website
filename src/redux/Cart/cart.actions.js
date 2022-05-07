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

export const handleSize = (size, product) => ({
  type: cartTypes.SELECT_SIZE,
  payload1: size,
  payload2: product,

});

export const handleColour = (color, product) => ({
  type: cartTypes.SELECT_COLOUR,
  payload1: color,
  payload2: product,
});



