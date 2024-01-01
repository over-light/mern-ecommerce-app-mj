import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../../../utils/axiosInstance';
import { SignupResponseProps, userInterface } from './type';
import { getErrorMessage } from '../../../utils/commonFunction';
import { ForgotPasswordProps, LoginProps, VerifyUserProps,UpdatePasswordProps } from '../../../type/interface';


type InitialStateProps = {
    loading: boolean
    auth: any
    error: any
}

const initialState: InitialStateProps = {
    loading: false,
    auth: {},
    error: ''
}

export const signup = createAsyncThunk('signup', async ({ user }: { user: userInterface }) => {
    try {
        const response = await axiosInstance.post('auth/signup', user,{withoutAuth:true});
        return response?.data
    }
    catch (err) {
        const message = getErrorMessage(err)
        return Promise.reject(message);
    }
})

export const verifyUser = createAsyncThunk('verifyUser', async ({ id, token }: VerifyUserProps) => {
    try {
        const response = await axiosInstance.get(`/auth/verify-user/${id}/verify/${token}`,{withoutAuth:true});
        return response?.data
    }
    catch (err) {
        const message = getErrorMessage(err)
        throw message
    }
})

export const login = createAsyncThunk('login', async ({ user }: { user: LoginProps}) => {
    try {
        const response = await axiosInstance.post('auth/login', user,{withoutAuth:true});
        return response?.data
    }
    catch (err) {
        const message = getErrorMessage(err)
        throw message
    }
})

export const forgotPassword = createAsyncThunk('forgotPassword', async ({ email }: ForgotPasswordProps) => {
    try {
        const response = await axiosInstance.post('auth/forgot-password', { email },{withoutAuth:true});
        return response?.data
    }
    catch (err) {
        const message = getErrorMessage(err)
        return Promise.reject(message);
    }
})

export const updatePassword = createAsyncThunk('updatePassword', async ({ user }: { user: UpdatePasswordProps}) => {
    try {
        const response = await axiosInstance.post(`auth/reset/${user?.token}`, {password:user?.password},{withoutAuth:true});
        return response?.data
    }
    catch (err) {
        const message = getErrorMessage(err)
        return Promise.reject(message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: builder => {
        builder.addCase(
            signup.fulfilled,
            (state, action: PayloadAction<SignupResponseProps>) => {
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
            (state, action: PayloadAction<SignupResponseProps>) => {
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