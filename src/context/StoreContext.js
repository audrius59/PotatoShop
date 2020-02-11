import React, { createContext, useReducer } from 'react';
import {
  ADD_TO_CART,
  INCREASE,
  DECREASE,
  CLEAR_CART,
  PURCHASE
} from '../actionTypes/storeActions';
const StoreContext = createContext();

function storeReducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const id = action.payload.id;
      if (state.cartItems.findIndex(item => item.id === id) !== -1) {
        const updatedCart = state.cartItems.reduce((acc, item) => {
          if (item.id === id) {
            acc.push({ ...item, quantity: item.quantity++ });
          } else {
            acc.push(item);
          }
          return acc;
        }, []);
        return { ...state, updatedCart };
      }
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case INCREASE:
      const increasedCart = state.cartItems.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, cartItems: [...increasedCart] };
    case DECREASE:
      const updatedItem = state.cartItems.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const filterBlank = updatedItem.filter(item => item.quantity > 0);
      return { ...state, cartItems: [...filterBlank] };

    case CLEAR_CART:
      return { ...state, cartItems: [] };
    case PURCHASE:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
}

const StoreProvider = ({ children }) => {
  const initialState = useReducer(storeReducer, {
    cartItems: []
  });
  return (
    <StoreContext.Provider value={initialState}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
