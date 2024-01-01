import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { InitialStateProps, snackbarProps } from './type';

const initialState: InitialStateProps = {
    open: false,
    vertical: 'bottom',
    horizontal: 'left',
    message: '',
    type: 'success'
}

// Generates pending, fulfilled and rejected action types
export const handleSnackbar = createAsyncThunk('snackbar', async ({ open, message, type }: snackbarProps) => {
    return { open, message, type }
})

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: builder => {
        builder.addCase(
            handleSnackbar.fulfilled,
            (state, action: PayloadAction<snackbarProps>) => {
                state.open = action.payload.open
                state.message = action.payload.message
                state.type = action.payload.type
            }
        )
    }
})
export default snackbarSlice.reducer