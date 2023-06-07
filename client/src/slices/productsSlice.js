import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// slice is a logic containing reducers and actions

const initialState = {
  items: [],
  status: null,
};


// fetching data using asyncthunk
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response = await axios.get("http://localhost:5000/products")
    return response?.data;
  }
)


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {}, // generate action creator and handle the state 
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  } // only handle action types
})

export default productsSlice.reducer;