import { createSlice } from "@reduxjs/toolkit";

export const switchstateSlice = createSlice({
  name: 'switchstate',
  initialState: {
    value:"OFF"
  },
  reducers: {
    changeposition: (state, action) => {
      state.value= action.payload.position;
    }
  }
});

export const { changeposition } = switchstateSlice.actions;
export default switchstateSlice.reducer;
