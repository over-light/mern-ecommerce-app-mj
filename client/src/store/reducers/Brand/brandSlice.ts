import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";
import { getErrorMessage } from "../../../utils/commonFunction";

export interface BrandProps {
    _id: string
    name: string
    description: string
    isActive: boolean
    created: string
    slug: string
    __v: number
  }
  
export interface BrandsInterface {
  message: string;
  brands: BrandProps[];
}


const initialState: { loading: boolean; brands: any; error: any } = {
  loading: false,
  brands: [],
  error: "",
};

//Get brand list
export const getBrand = createAsyncThunk("getBrand", async () => {
  try {
    const response = await axiosInstance.get("/brand/list",{withoutAuth:true});
    return response?.data;
  } catch (err) {
    const message = getErrorMessage(err);
    return Promise.reject(message);
  }
});

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
        getBrand.fulfilled,
      (state, action: PayloadAction<BrandProps>) => {
        state.loading = false;
        state.brands = action.payload || [];
        state.error = "";
      }
    );
    builder.addCase(getBrand.rejected, (state, action) => {
      state.loading = false;
      state.brands = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default brandSlice.reducer
