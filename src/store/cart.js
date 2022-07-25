import { createSlice } from "@reduxjs/toolkit";

const initialCartSlice = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartSlice,
  reducers: {
    addItemToCart(state, action) {
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }

      state.items = updatedItems;
      state.totalAmount = updatedTotalAmount;
      console.log("Add action run");
    },
    removeItemFromCart(state, action) {
      //ID is taken here
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.payload);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      state.items = updatedItems;
      state.totalAmount = updatedTotalAmount;
      console.log("Delete action run");
    },
    resetCart(state) {
      state.items = initialCartSlice.items;
      state.totalAmount = initialCartSlice.totalAmount;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
