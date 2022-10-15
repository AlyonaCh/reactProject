import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  summ: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    changeCart: (state, action) => {
      console.log(action.payload)
      let item = state.items.find((item) => item.id == action.payload.id)
      if (!item){
        state.items.push(action.payload);
        state.summ += action.payload.count * action.payload.price
      } else if (item.size === action.payload.size) {
        item.count++;
        state.summ += action.payload.count * item.price
      }  else if (item.size !== action.payload.size) {
        state.items.push(action.payload);
        state.summ += action.payload.count * action.payload.price
      }
      
    },
    delCart: (state, action) => {
      console.log(action.payload)
      state.items = state.items.filter((item) => !(item.id == action.payload.id && item.size == action.payload.size))
      state.summ -= action.payload.count * action.payload.price
      
    },
    cleanCart: (state) => {
      state.items = []
      state.summ = null
      
    },
  },
  
});

export const { changeCart, delCart, cleanCart } = cartSlice.actions;


export const selectCart = (state) => state.cart;


export default cartSlice.reducer;
