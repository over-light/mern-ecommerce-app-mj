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
  id:number
}



const initialState: { loading: boolean; products: any; error: any } = {
  loading: false,
  products: {},
  error: "",
};

//Get Product List 
export const getProduct = createAsyncThunk("getProduct", async ({ page,size ,sortBy,search}:{page:number,size:number,sortBy:string,search:string}) => {
  try {
    const url = `/product?page=${page}&size=${size}&sortBy=${sortBy}&search=${search}`
    const response = await axiosInstance.get(url,{withoutAuth:true});
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
