import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string | null;
  selectedColor?: string | null;
}

interface CartState {
  items: CartItem[];
}

const loadFromStorage = (): CartItem[] => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (items: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const initialState: CartState = {
  items: loadFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      saveToStorage(state.items);
    },

    removeFromCart: (
      state,
      action: PayloadAction<{
        id: number;
        selectedSize?: string | null;
        selectedColor?: string | null;
      }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.selectedSize === action.payload.selectedSize &&
            item.selectedColor === action.payload.selectedColor
          )
      );

      saveToStorage(state.items);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        selectedSize?: string | null;
        selectedColor?: string | null;
        type: "increment" | "decrement";
      }>
    ) => {
      const item = state.items.find(
        (i) =>
          i.id === action.payload.id &&
          i.selectedSize === action.payload.selectedSize &&
          i.selectedColor === action.payload.selectedColor
      );

      if (!item) return;

      if (action.payload.type === "increment") {
        item.quantity += 1;
      } else {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i !== item);
        }
      }

      saveToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveToStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;