import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/Auth/authSlice';
import snackReducer from './reducers/Snackbar/snackbarSlice';
import productReducer from './reducers/Product/productSlice';
import categoryReducer from './reducers/Category/categorySlice'
import orderSlice from './reducers/Order/orderSlice'
import brandSlice from './reducers/Brand/brandSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        snackbar: snackReducer,
        product:productReducer,
        category: categoryReducer,
        order:orderSlice,
        brand:brandSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch