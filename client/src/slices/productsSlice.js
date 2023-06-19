import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// slice is a logic containing reducers and actions

const initialState = {
  items: [],
  status: null,
  product: null,
};


// fetching products data using asyncthunk
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response = await axios.get("http://localhost:5000/products")
    return response?.data;
  }
)

// fetch specific product using asyncthunk
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId) => {
    const response = await axios.get(`http://localhost:5000/products/${productId}`);
    return response?.data;
  }
);


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
    [fetchProductById.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchProductById.fulfilled]: (state, action) => {
      state.status = "success";
      state.product = action.payload;
    },
    [fetchProductById.rejected]: (state, action) => {
      state.status = "rejected";
    },
  } // only handle action types
})

export default productsSlice.reducer;