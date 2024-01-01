import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";
import { getErrorMessage } from "../../../utils/commonFunction";
import { ProductProps, ProductsInterface } from "./type";

const initialState: { loading: boolean; products: any; error: any,product: ProductProps} = {
  loading: true,
  products: [],
  product:{
    _id: "",
    sku: "",
    name: "",
    imageUrl: "",
    description: "",
    price: 0,
    quantity:0,
    category: {
      _id: "",
      name: "",
      description: ""
    },
    brand: {
      _id: "",
      name: "",
      description: ""
    },
    slug: ""
  },
  error: "",
};

//Get Product List 
export const getProduct = createAsyncThunk("getProduct", async ({ page,size,category,brand,sortBy,search}:{page:number,size:number,category:string,brand:string,sortBy:string,search:string}) => {
  try {
    const url = `/product/list/?page=${page}&size=${size}&brand=${brand}&category=${category}&sortBy=${sortBy}&search=${search}`
    const response = await axiosInstance.get(url,{withoutAuth:true});
    return response?.data;
  } catch (err) {
    const message = getErrorMessage(err);
    return Promise.reject(message);
  }
});

export const getProductBySlug = createAsyncThunk("getProductBySlug", async ({ slug}:{slug:string | undefined}) => {
  try {
    const url = `/product/item/${slug}`
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
      (state, action: PayloadAction<ProductsInterface>) => {
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

    builder.addCase(getProductBySlug.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getProductBySlug.fulfilled,
      (state, action: PayloadAction<{product:ProductProps}>) => {
        state.loading = false;
        state.product = action.payload.product;
        state.error = "";
      }
    );
    builder.addCase(getProductBySlug.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default productSlice.reducer;
