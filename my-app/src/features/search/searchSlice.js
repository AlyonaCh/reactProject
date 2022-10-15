import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearch: (state, action) => {
      console.log('search')
      console.log(action.payload)
      state.title = action.payload;
      
    },
  },
  
});

export const { changeSearch } = searchSlice.actions;


export const selectSearch = (state) => state.search.title;


export default searchSlice.reducer;
