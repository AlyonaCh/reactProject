import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  title: '',
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      console.log(action.payload)
      if ('id' in action.payload) {
        state.id = action.payload.id;
        state.title = action.payload.title;
      } else {
        state.id = null;
        state.title = '';
      }
      
    },
  },
  
});

export const { changeCategory } = categorySlice.actions;


export const selectCategory = (state) => state.category.title;


export default categorySlice.reducer;
