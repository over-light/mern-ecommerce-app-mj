import React from "react";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

type ModalProps = {
    title?: string;
    children?: any;
    open: boolean;
    cancelText?: string;
    submitText?: string,
    onCancel: () => void;
}

export const Modal: React.FC<ModalProps> = (props) => {
    const {
        open = false,
        title = '',
        children = '',
        onCancel = () => { }
    } = props;

    return (
        <>
            <Dialog open={open} onClose={onCancel} fullWidth
                maxWidth="sm">
                <DialogTitle >{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );
}
