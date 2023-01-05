export const cartReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        cart: [...action.payload],
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.id)
            return {
              ...action.payload,
              quantity: item.quantity + 1,
            };
          return item;
        }),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          // if (item.id === action.payload.id && item.quantity === 1) {
          //   return {
          //     ...action.payload,
          //     quantity: 1,
          //   };
          // } else if (item.id === action.payload.id) {
          //   return {
          //     ...action.payload,
          //     quantity: item.quantity - 1,
          //   };
          // } else {
          //   return item;
          // }
          if (item.id === action.payload.id) {
            return {
              ...action.payload,
              quantity: item.quantity - 1,
            };
          } else {
            return item;
          }
        }),
      };
    default:
      return state;
  }
};
