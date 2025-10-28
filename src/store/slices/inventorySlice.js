import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lowStockItems: [],
  loading: false,
  error: null,
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setLowStockItems: (state, action) => {
      state.lowStockItems = action.payload;
    },
    updateInventoryItem: (state, action) => {
      const { sku, quantity } = action.payload;
      const itemIndex = state.lowStockItems.findIndex(item => item.sku === sku);
      
      if (itemIndex >= 0) {
        state.lowStockItems[itemIndex].inventoryQuantity = quantity;
        
        // Remove from low stock if quantity is now above threshold
        if (quantity > state.lowStockItems[itemIndex].lowStockThreshold) {
          state.lowStockItems.splice(itemIndex, 1);
        }
      }
    },
  },
});

export const { setLowStockItems, updateInventoryItem } = inventorySlice.actions;

// Selectors
export const selectLowStockItems = (state) => state.inventory.lowStockItems;
export const selectLowStockCount = (state) => state.inventory.lowStockItems.length;

export default inventorySlice.reducer;