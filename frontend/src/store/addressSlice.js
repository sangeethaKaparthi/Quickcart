// store/addressSlice.js
import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "addresses",
  initialState: {
    addressList: []
  },
  reducers: {
    handleAddAddress: (state, action) => {
      state.addressList = action.payload;   // overwrite with fetched list
    }
  }
})

export const { handleAddAddress } = addressSlice.actions;
export default addressSlice.reducer;
