// goal of this component is simply to manage the cart context data
//  and provide that context to all components that want access to it
import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // itemsfindIndex finds the index of an item in an array, it takes a function which should return true if that's the item we're looking for, and false otherwise
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); // if the item we're currently looking at in that array has the same id as the item we're adding
    // with this action which was dispatched, return actually the index of that item if it exists.

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      // if item is already a part of array
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item); // we don't want to edit our old state snapshot, instead we generate new brand state object
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      // which means it's the last item of that type, so we need to remove entire item(array)
      updatedItems = state.items.filter(item => item.id !== action.id); // With this check we make sure that all items where the id is not equal to the action id are kept
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }; // updatedItem is just a copy of existingItem in a new object with the spread operator.
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState; // returning actually new state
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
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
