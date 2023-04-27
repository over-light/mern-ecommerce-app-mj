import React from "react";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { handleSnackbar } from "../store/reducers/snackbarSlice";

type CustomSnackbarProps = {}

const CustomSnackbar: React.FC<CustomSnackbarProps> = () => {
    const snackbar = useAppSelector(state => state.snackbar);
    const dispatch = useAppDispatch();
    const { vertical, horizontal, open, message, type } = snackbar;

    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={() => { dispatch(handleSnackbar({ open: false })) }}
                key={vertical + horizontal}
            >
                <Alert
                    onClose={() => { dispatch(handleSnackbar({ open: false })) }}
                    severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </React.Fragment >
    );
}


export default CustomSnackbar;