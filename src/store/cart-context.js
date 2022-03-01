import React from "react";

const CartContext = React.createContext({
  // context generally created
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: (id) => {},
});

export default CartContext;
