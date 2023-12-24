import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice';
import snackReducer from './reducers/snackbarSlice';
import productReducer from './reducers/productSlice';
import categoryReducer from './reducers/categorySlice'
import cartReducer from './reducers/cartSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        snackbar: snackReducer,
        product:productReducer,
        category: categoryReducer,
        cart:cartReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch