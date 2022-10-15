import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import categoryReducer from '../features/categories/categorySlice';
import searchReducer from '../features/search/searchSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    category: categoryReducer,
    search: searchReducer,
    cart: cartReducer
  },
});
