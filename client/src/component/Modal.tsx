import React from "react";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';

type ModalProps = {
    title?: string;
    children?: any;
    open: boolean;
    cancelText?: string;
    submitText?: string,
    maxWidth: any,
    onCancel: () => void;
}

export const Modal: React.FC<ModalProps> = (props) => {
    const {
        open = false,
        title = '',
        children = '',
        maxWidth = '',
        onCancel = () => { }
    } = props;

    return (
        <>
            <Dialog open={open} onClose={onCancel} fullWidth
                maxWidth={maxWidth}>
                <DialogTitle >
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1}>{title}</Box>
                        <Box>
                            <IconButton onClick={onCancel}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );
}
