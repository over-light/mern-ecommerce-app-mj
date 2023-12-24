import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { getErrorMessage } from "../../utils/commonFunction";

export interface CategoryProps {
    name: string;
    description: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  
}
  
export interface CategoryInterface {
  message: string;
  category: CategoryProps;
}


const initialState: { loading: boolean; category: any; error: any } = {
  loading: false,
  category: [],
  error: "",
};

//Get category list
export const getCategory = createAsyncThunk("getCategory", async () => {
  try {
    const response = await axiosInstance.get("/category",{withoutAuth:true});
    return response?.data;
  } catch (err) {
    const message = getErrorMessage(err);
    return Promise.reject(message);
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
        getCategory.fulfilled,
      (state, action: PayloadAction<CategoryInterface>) => {
        state.loading = false;
        state.category = action.payload || [];
        state.error = "";
      }
    );
    builder.addCase(getCategory.rejected, (state, action) => {
      state.loading = false;
      state.category = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default categorySlice.reducer
