import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { getErrorMessage } from "../../utils/commonFunction";



const initialState: { loading: boolean; cartItem: any; error: any } = {
  loading: false,
  cartItem: [],
  error: "",
};


export const getCartItem = createAsyncThunk("getCartItem", async () => {
    try {
      const response = await axiosInstance.get('/cart');
      return response?.data;
    } catch (err) {
      const message = getErrorMessage(err);
      return Promise.reject(message);
    }
  });

  export const updateCartItem = createAsyncThunk("updateCartItem", async ({ id,quantity }: { id: string ,quantity:number}) => {
    try {
      const response = await axiosInstance.put(`/cart/${id}`,{quantity});
      return response?.data;
    } catch (err) {
      const message = getErrorMessage(err);
      return Promise.reject(message);
    }
  });

//Add product to cart
export const addToCart = createAsyncThunk("addCart", async (data:{id:number,quantity:number},) => {
  try {
    const response = await axiosInstance.post('/cart',data);
    return response?.data;
  } catch (err) {
    const message = getErrorMessage(err);
    return Promise.reject(message);
  }
});

export const deleteCartItem = createAsyncThunk("deleteCartItem", async (id:  string) => {
  try {
    const response = await axiosInstance.delete(`/cart/${id}`);
    return response?.data;
  } catch (err) {
    const message = getErrorMessage(err);
    return Promise.reject(message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
        addToCart.fulfilled,
      (state, action: PayloadAction<{id:number}>) => {
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(getCartItem.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(
        getCartItem.fulfilled,
        (state, action: PayloadAction<{id:number}>) => {
          state.loading = false;
          state.cartItem = action.payload;
          state.error = "";
        }
      );
      builder.addCase(getCartItem.rejected, (state, action) => {
        state.loading = false;
        state.cartItem = [];
        state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
      });
      builder.addCase(
        updateCartItem.fulfilled,
        (state, action: PayloadAction<{}>) => {
          state.loading = false;
          state.error = "";
        }
      );
      builder.addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = true;
      });
      builder.addCase(
        deleteCartItem.fulfilled,
        (state, action: PayloadAction<{}>) => {
          state.loading = false;
          state.error = "";
        }
      );
      builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default cartSlice.reducer;
