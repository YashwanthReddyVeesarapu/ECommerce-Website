import { createSelector } from "reselect";

export const selectCartData = (state) => state.cartData;

export const selectCartItems = createSelector(
  [selectCartData],
  (cartData) => cartData.cartItems
);

export const selectCartItemsSize = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((size, cartItem) => (size = cartItem.size))
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (quantity, cartItem) =>

      quantity +
      cartItem.quantity *
        (cartItem.discountedPrice === 0
          ? cartItem.productPrice
          : cartItem.discountedPrice),
    0
  )
);
