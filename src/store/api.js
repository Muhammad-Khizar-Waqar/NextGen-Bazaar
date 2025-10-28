import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      // Get the token from auth state
      const token = getState().auth.token;
      
      // If we have a token, add it to the headers
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['Products', 'Product', 'Cart', 'User', 'Orders', 'Inventory', 'Categories'],
  endpoints: (builder) => ({
    // Products
    getProducts: builder.query({
      query: (params) => ({
        url: '/products',
        params,
      }),
      providesTags: ['Products'],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    
    // Categories
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: ['Categories'],
    }),
    
    // Inventory
    getInventoryByProductId: builder.query({
      query: (productId) => `/inventory/product/${productId}`,
      providesTags: (result, error, productId) => [{ type: 'Inventory', id: productId }],
    }),
    getInventoryBySku: builder.query({
      query: (sku) => `/inventory/${sku}`,
      providesTags: (result, error, sku) => [{ type: 'Inventory', id: sku }],
    }),
    getLowStockItems: builder.query({
      query: () => '/inventory/low-stock',
      providesTags: ['Inventory'],
    }),
    adjustInventory: builder.mutation({
      query: ({ sku, quantity, reason }) => ({
        url: `/inventory/${sku}/adjust`,
        method: 'POST',
        body: { quantity, reason },
      }),
      invalidatesTags: (result, error, { sku }) => [
        { type: 'Inventory', id: sku },
        'Inventory',
        'Products',
      ],
    }),
    
    // Orders
    getOrders: builder.query({
      query: (params) => ({
        url: '/orders',
        params,
      }),
      providesTags: ['Orders'],
    }),
    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Orders', id }],
    }),
    trackOrder: builder.query({
      query: (trackingId) => `/orders/track/${trackingId}`,
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Orders', 'Cart', 'Inventory'],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Orders', id }, 'Orders'],
    }),
    
    // User
    getUserProfile: builder.query({
      query: () => '/users/profile',
      providesTags: ['User'],
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: '/users/profile',
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    
    // Wishlist
    getWishlist: builder.query({
      query: () => '/wishlist',
      providesTags: ['Wishlist'],
    }),
    addToWishlist: builder.mutation({
      query: (productId) => ({
        url: '/wishlist',
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['Wishlist'],
    }),
    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetInventoryByProductIdQuery,
  useGetInventoryBySkuQuery,
  useGetLowStockItemsQuery,
  useAdjustInventoryMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useTrackOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = api;