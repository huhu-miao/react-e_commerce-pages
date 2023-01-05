import React, { createContext, useReducer, useContext } from "react";
import { cartReducer } from "./Reducer";

const Cart = createContext();

// function useStickyState(defaultValue, key) {
//   const [value, setValue] = React.useState(() => {
//     const stickyValue = window.localStorage.getItem(key);
//     return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
//   });
//   React.useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);
//   return [value, setValue];
// }
// // const cartFromLocalStorage = [];
// // if (localStorage.getItem("cart")) {
// //   cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
// // }

// // console.log(cartFromLocalStorage);
// // const initialState = { cart: { cartFromLocalStorage } };
function ShoppingCartContext({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  //   const newstate = useStickyState(state, "cart");

  return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>;
}

export default ShoppingCartContext;

export const CartState = () => {
  return useContext(Cart);
};
