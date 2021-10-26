import cartTypes from './cart.types';
import {
  handleAddToCart, handleRemoveCartItem,
  handleReduceCartItem, handleSize, handleColour
} from './cart.utils';

const INITIAL_STATE = {
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: handleAddToCart({
          prevCartItems: state.cartItems,
          nextCartItem: action.payload1,
          size: action.payload2,
          colour: action.payload3
        })
      };
    case cartTypes.REDUCE_CART_ITEM:
      return {
        ...state,
        cartItems: handleReduceCartItem({
          prevCartItems: state.cartItems,
          cartItemToReduce: action.payload
        })
      };
    case cartTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: handleRemoveCartItem({
          prevCartItems: state.cartItems,
          cartItemToRemove: action.payload
        })
      };
    case cartTypes.SELECT_SIZE:
      return {
        ...state,
        cartItems: handleSize({
          cartItems: state.cartItems,
          cartItemSize: action.payload1,
          product: action.payload2,
        })
      };
    case cartTypes.SELECT_COLOUR:
      return {
        ...state,
        cartItems: handleColour({
          cartItems: state.cartItems,
          cartItemColour: action.payload1,
          product: action.payload2
        })
      };
    case cartTypes.CLEAR_CART:
      return {
        ...state,
        ...INITIAL_STATE
      }
    default:
      return state;
  }
};

export default cartReducer;