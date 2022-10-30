import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    changeCart: (state, action) => {
      console.log(action.payload)
      let itemsWithId = state.items.filter((item) => item.id == action.payload.id)
      if (!itemsWithId){
        state.items.push(action.payload);
      } else {
        let itemWithIdSize = itemsWithId.find((item) => item.size == action.payload.size)
        if (!itemWithIdSize) {
          state.items.push(action.payload);
        } else {
          itemWithIdSize.count++;
        }
      }
    },
    delCart: (state, action) => {
      state.items = state.items.filter((item) => !(item.id == action.payload.id && item.size == action.payload.size))
    },
    cleanCart: (state) => {
      state.items = []
    },
  },
  
});

export const { changeCart, delCart, cleanCart } = cartSlice.actions;


export const selectCart = (state) => state.cart.items;

export const selectSum = (state) => {
    return state.cart.items.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.price * currentValue.count;
    }, 0)
  }


export default cartSlice.reducer;
