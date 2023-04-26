<<<<<<< HEAD
import { createSlice, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance';
import { userInterface } from '../../type/interface';

type InitialState = {
    loading: boolean
    auth: any
=======
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance';
import { userInterface } from '../../type/interface';


type InitialState = {
    loading: boolean
    auth: object
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c
    error: any
}

const initialState: InitialState = {
    loading: false,
    auth: {},
    error: ''
}

// Generates pending, fulfilled and rejected action types
<<<<<<< HEAD
export const signup = createAsyncThunk('signup', async ({ user, cb }: { user: userInterface, cb: any }) => {
    try {
        const response = await axiosInstance.post('auth/signup', user);
        cb();
        return response;
=======
export const signup = createAsyncThunk('signup', async (user: userInterface) => {
    try {
        return await axiosInstance.post('auth/signup', user);
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c
    }
    catch (err) {
        return Promise.reject(err);
    }
})

// Generates pending, fulfilled and rejected action types
<<<<<<< HEAD
export const login = createAsyncThunk('login', async ({ user, cb }: { user: { email: string, password: string }, cb: any }) => {
    try {
        const response = await axiosInstance.post('auth/login', user);
        cb();
        sessionStorage.setItem('user', JSON.stringify(response?.data));

        return response?.data
=======
export const login = createAsyncThunk('login', async (user: { email: string, password: string }) => {
    try {
        return await axiosInstance.post('auth/login', user);
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c
    }
    catch (err) {
        return Promise.reject(err);
    }
})
<<<<<<< HEAD
export const revertAll = createAction('REVERT_ALL')
=======
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c

const authSlice = createSlice({
    name: 'auth',
    initialState,
<<<<<<< HEAD
    reducers: {
        reset: () => initialState
    },
    extraReducers: builder => {
        builder.addCase(revertAll, () => initialState)
=======
    reducers: {},
    extraReducers: builder => {
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c
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
            state.error = action.error || 'Something went wrong'
        })

<<<<<<< HEAD
=======

>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c
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