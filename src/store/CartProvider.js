// goal of this component is simply to manage the cart context data
//  data and provide that context to all components that want access to it

import CartContext from "./cart-context";

const CartProvider = (props) => {
  const addItemToCartHandler = (item) => {};

  const removeItemFromCartHandler = (id) => {};

  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  // {props.children} , it  allows us to wrap any components that should get access
  // to this context with this cart provider component.
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
