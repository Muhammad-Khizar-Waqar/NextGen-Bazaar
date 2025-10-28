import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isOpen: false,
  reservationId: null,
  reservationExpiry: null,
};

// Helper function to find item index in cart
const findCartItemIndex = (state, payload) => {
  return state.items.findIndex(
    item => item.productId === payload.productId && 
    (payload.variantId ? item.variantId === payload.variantId : true)
  );
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, variantId, name, price, image, quantity = 1, maxQuantity } = action.payload;
      const itemIndex = findCartItemIndex(state, action.payload);
      
      if (itemIndex >= 0) {
        // Item exists, update quantity but don't exceed maxQuantity
        const newQuantity = state.items[itemIndex].quantity + quantity;
        state.items[itemIndex].quantity = maxQuantity ? Math.min(newQuantity, maxQuantity) : newQuantity;
      } else {
        // Add new item
        state.items.push({
          productId,
          variantId,
          name,
          price,
          image,
          quantity: maxQuantity ? Math.min(quantity, maxQuantity) : quantity,
        });
      }
    },
    
    removeFromCart: (state, action) => {
      const itemIndex = findCartItemIndex(state, action.payload);
      if (itemIndex >= 0) {
        state.items.splice(itemIndex, 1);
      }
    },
    
    updateQuantity: (state, action) => {
      const { productId, variantId, quantity, maxQuantity } = action.payload;
      const itemIndex = findCartItemIndex(state, { productId, variantId });
      
      if (itemIndex >= 0) {
        // Update quantity but don't exceed maxQuantity
        state.items[itemIndex].quantity = maxQuantity ? Math.min(quantity, maxQuantity) : quantity;
        
        // Remove item if quantity is 0 or less
        if (state.items[itemIndex].quantity <= 0) {
          state.items.splice(itemIndex, 1);
        }
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.reservationId = null;
      state.reservationExpiry = null;
    },
    
    setCartOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    setReservation: (state, action) => {
      const { reservationId, expiryTime } = action.payload;
      state.reservationId = reservationId;
      state.reservationExpiry = expiryTime;
    },
    
    clearReservation: (state) => {
      state.reservationId = null;
      state.reservationExpiry = null;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  setCartOpen, 
  toggleCart,
  setReservation,
  clearReservation
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartIsOpen = (state) => state.cart.isOpen;
export const selectCartItemsCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) => state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectReservationStatus = (state) => ({
  reservationId: state.cart.reservationId,
  reservationExpiry: state.cart.reservationExpiry,
  isReserved: !!state.cart.reservationId && new Date(state.cart.reservationExpiry) > new Date(),
});

export default cartSlice.reducer;