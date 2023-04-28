import { AlertColor, SnackbarOrigin } from '@mui/material';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'


export interface InitialState extends SnackbarOrigin {
    open: boolean;
    message?: string,
    type?: AlertColor
}

const initialState: InitialState = {
    open: false,
    vertical: 'bottom',
    horizontal: 'left',
    message: '',
    type: 'success'
}
interface snackbarProps {
    open: boolean, message?: string, type?: AlertColor
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
            (state, action: PayloadAction<any>) => {
                state.open = action.payload.open
                state.message = action.payload.message
                state.type = action.payload.type
            }
        )
    }
})
export default snackbarSlice.reducer