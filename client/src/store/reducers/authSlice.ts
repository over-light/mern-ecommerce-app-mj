import { createSlice, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance';
import { userInterface } from '../../type/interface';
import { getErrorMessage } from '../../utils/commonFunction';


type InitialState = {
    loading: boolean
    auth: any
    error: any
}

const initialState: InitialState = {
    loading: false,
    auth: {},
    error: ''
}
// Generates pending, fulfilled and rejected action types
export const signup = createAsyncThunk('signup', async ({ user }: { user: userInterface }) => {
    try {
        const response = await axiosInstance.post('auth/signup', user);
        return response?.data
    }
    catch (err) {
        const message = getErrorMessage(err)
        return Promise.reject(message);
    }
})
// Generates pending, fulfilled and rejected action types
export const verifyUser = createAsyncThunk('verifyUser', async ({ id, token }: { id: string | undefined, token: string | undefined }) => {
    try {
        const response = await axiosInstance.get(`/auth/verify-user/${id}/verify/${token}`);
        return response?.data
    }
    catch (err) {
        const message = getErrorMessage(err)
        throw message
    }
})
// Generates pending, fulfilled and rejected action types
export const login = createAsyncThunk('login', async ({ user }: { user: { email: string, password: string } }) => {
    try {
        const response = await axiosInstance.post('auth/login', user);
        return response?.data
    }
    catch (err) {
        const message = getErrorMessage(err)
        throw message
    }
})
// Generates pending, fulfilled and rejected action types
export const forgotPassword = createAsyncThunk('forgotPassword', async ({ email }: { email: string }) => {
    try {
        const response = await axiosInstance.post('auth/forgot-password', { email });
        return response?.data
    }
    catch (err) {
        const message = getErrorMessage(err)
        return Promise.reject(message);
    }
})
// Generates pending, fulfilled and rejected action types
export const updatePassword = createAsyncThunk('updatePassword', async ({ user }: { user: { userId: string | undefined, password: string, token: string | undefined } }) => {
    try {
        const response = await axiosInstance.post('auth/update-password', user);
        return response?.data
    }
    catch (err) {
        const message = getErrorMessage(err)
        return Promise.reject(message);
    }
})
export const revertAll = createAction('REVERT_ALL')

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: builder => {
        builder.addCase(revertAll, () => initialState)
        builder.addCase(signup.pending, state => {
            state.loading = true
        })
        builder.addCase(
            signup.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false
                state.auth = action.payload
                state.error = ''
            }
        )
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false
            state.auth = {}
            state.error = action.error.message || 'Something went wrong'
        })

        //Login
        builder.addCase(login.pending, state => {
            state.loading = true
        })
        builder.addCase(
            login.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false
                state.auth = action.payload
                state.error = ''
            }
        )
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.auth = {}
            state.error = action.error.message || 'Something went wrong'
        })
    }
})

export default authSlice.reducer