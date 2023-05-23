import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { getErrorMessage } from "../../utils/commonFunction";

export interface ProductInterface {
  message: string;
  product: ProductProps;
}

export interface ProductProps {
  name: string;
  description: string;
  image: string;
  url: string;
  price: number;
  owner: string;
  discount: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const initialState: { loading: boolean; products: any; error: any } = {
  loading: false,
  products: {},
  error: "",
};
//Get Product List
export const getProduct = createAsyncThunk("getProduct", async () => {
  try {
    const response = await axiosInstance.get("/product");
    return response?.data;
  } catch (err) {
    const message = getErrorMessage(err);
    return Promise.reject(message);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getProduct.fulfilled,
      (state, action: PayloadAction<ProductInterface>) => {
        state.loading = false;
        state.products = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getProduct.rejected, (state, action) => {
      state.loading = false;
      state.products = {};
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default productSlice.reducer;
