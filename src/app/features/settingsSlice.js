import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    bubbleDot: false,
  },
  reducers: {
    showDropDown: (state, action) => {
            state.bubbleDot = action.payload
        }
  },
});

export const dropDownState = (state) => state.settings.bubbleDot;
export const { showDropDown }  = settingsSlice.actions;


export default settingsSlice.reducer;
