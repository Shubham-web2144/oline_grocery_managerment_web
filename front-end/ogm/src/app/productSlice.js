import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  product: {},
  logOutUserTxt: "",
};

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await axios.get("http://localhost:7000/products");
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    const response = await axios.delete(`http://localhost:7000/product/${id}`);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  (id, updetedProduct) => {
    const response = axios.put(
      `http://localhost:7000/updateProduct/${id}`,
      updetedProduct
    );
    return response.data;
  }
);

export const logOutUser = createAsyncThunk("user/logOutUser", (email) => {
  const response = axios.post(`http://localhost:7000/logOut/${email}`);
  return response.data;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProduct: (state, { payload }) => {
      state.products.forEach((product) => {
        if (product.id === payload) {
          state.product = product;
        }
      });
    },
    removeSelectedProduct: (state) => {
      state.product = {};
    },
  },
  extraReducers: {
    [fetchAllProducts.pending]: () => {
      console.warn("Pending....");
    },
    [fetchAllProducts.fulfilled]: (state, action) => {
      return { ...state, products: action.payload };
    },
    [fetchAllProducts.rejected]: () => {
      console.warn("Rejected....");
    },
    [deleteProduct.pending]: () => {
      console.log("Delete pending");
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      return { ...state };
    },
    [deleteProduct.rejected]: () => {
      console.log("Rejected...");
    },
    [updateProduct.pending]: () => {
      console.log("wait product is updating....");
    },
    [updateProduct.fulfilled]: (state, { payload }) => {
      return { ...state.products, payload };
    },
    [updateProduct.rejected]: () => {
      console.log("product updeted request rejected");
    },
    [logOutUser.pending]: () => {
      console.log("pending");
    },
    [logOutUser.fulfilled]: (state, { payload }) => {
      return { ...state, logOutUserTxt: payload };
    },
    [logOutUser.rejected]: () => {
      console.log("Rejected...");
    },
  },
});

export const { addProducts, getProduct, removeSelectedProduct } =
  productSlice.actions;

export default productSlice.reducer;
