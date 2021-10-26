export const existingCartItem = ({
  prevCartItems,
  nextCartItem,
  size,
  colour
}) => {
  return prevCartItems.find(
    cartItem => (cartItem.documentID === nextCartItem.documentID && cartItem.size === size && cartItem.colour === colour)
  );
};

export const handleSize = ({
  cartItems, cartItemSize, product
}) => {
  return cartItems.map(cartItem =>
    cartItem.documentID === product.documentID && cartItem.size === product.size && cartItem.colour === product.colour
      ? {
        ...cartItem,
        size: cartItemSize,
        variantID: product.documentID + cartItemSize + product.colour
      } : cartItem
  );
}
export const handleColour = ({
  cartItems, cartItemColour, product
}) => {
  return cartItems.map(cartItem =>
    cartItem.documentID === product.documentID && cartItem.colour === cartItemColour
      ? {
        ...cartItem,
        colour: cartItemColour,
        variantID: product.documentID + product.size + cartItemColour
      } : cartItem
  );
}

export const handleAddToCart = ({
  prevCartItems,
  nextCartItem,
  size,
  colour
}) => {
  const quantityIncrement = 1;
  const cartItemExists = existingCartItem({ prevCartItems, nextCartItem, size, colour });
  if (cartItemExists) {
    return prevCartItems.map(cartItem =>
      (cartItem.variantID === nextCartItem.variantID)
        ? {
          ...cartItem,
          quantity: cartItem.quantity + quantityIncrement
        } : cartItem
    );
  }


  return [
    ...prevCartItems,
    {
      ...nextCartItem,
      quantity: quantityIncrement,
      size: size,
      colour: colour,
      variantID: nextCartItem.documentID + size + colour
    }
  ];
};



export const handleRemoveCartItem = ({
  prevCartItems,
  cartItemToRemove
}) => {
  return prevCartItems.filter(item => item.variantID !== cartItemToRemove.variantID);
}

export const handleReduceCartItem = ({
  prevCartItems,
  cartItemToReduce
}) => {
  const existingCartItem = prevCartItems.find(cartItem =>
    cartItem.documentID === cartItemToReduce.documentID);
  if (existingCartItem.quantity === 1) {
    return prevCartItems.filter(
      cartItem => cartItem.documentID !== existingCartItem.documentID
    );
  }

  return prevCartItems.map(cartItem =>
    cartItem.documentID === existingCartItem.documentID ?
      {
        ...cartItem,
        quantity: cartItem.quantity - 1
      } : cartItem)
};