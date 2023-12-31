import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { getErrorMessage } from "../../../utils/commonFunction";
import axiosInstance from "../../../utils/axiosInstance";
import { OrderProps } from "./Type";


const initialState: { loading: boolean; orderItem: OrderProps; error: any } = {
    loading: false,
    orderItem:{
        orders: [],
        totalPages: 0,
        currentPage: 0,
        count: 0
    },
    error: "",
};


//Get order list
export const getOrder = createAsyncThunk("getOrder", async () => {
    try {
      const response = await axiosInstance.get("/order/me");
      return response?.data;
    } catch (err) {
      const message = getErrorMessage(err);
      return Promise.reject(message);
    }
  });

export const placeOrder = createAsyncThunk('placeOrder', async ({ order }:{order:any}) => {
    try {
        const response = await axiosInstance.post('order/add', {products:order});
        return response?.data
    }
    catch (err) {
        console.log("err",err)
        const message = getErrorMessage(err)
        throw message
    }
})



  const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
      reset: () => initialState,
    },
    extraReducers: (builder) => {
      builder.addCase(getOrder.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(
        getOrder.fulfilled,
        (state, action: PayloadAction<OrderProps>) => {
          state.loading = false;
          state.orderItem = action.payload;
          state.error = "";
        }
      );
      builder.addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.orderItem = initialState.orderItem;
        state.error = action.error.message || "Something went wrong";
      });
    },
  });
  
  export default orderSlice.reducer
