import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { items: [] };

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((id) => id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;