
import { AlertColor, SnackbarOrigin } from '@mui/material';

export interface InitialStateProps extends SnackbarOrigin {
    open: boolean;
    message?: string,
    type?: AlertColor
}

export interface snackbarProps {
    open: boolean, message?: string, type?: AlertColor
}