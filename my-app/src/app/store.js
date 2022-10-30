import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/categories/categorySlice';
import searchReducer from '../features/search/searchSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    search: searchReducer,
    cart: cartReducer
  },
});
