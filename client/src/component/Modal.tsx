import React from "react";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
<<<<<<< HEAD
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
=======
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c

type ModalProps = {
    title?: string;
    children?: any;
    open: boolean;
    cancelText?: string;
    submitText?: string,
<<<<<<< HEAD
    maxWidth: any,
=======
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c
    onCancel: () => void;
}

export const Modal: React.FC<ModalProps> = (props) => {
    const {
        open = false,
        title = '',
        children = '',
<<<<<<< HEAD
        maxWidth = '',
=======
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c
        onCancel = () => { }
    } = props;

    return (
        <>
            <Dialog open={open} onClose={onCancel} fullWidth
<<<<<<< HEAD
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
=======
                maxWidth="sm">
                <DialogTitle >{title}</DialogTitle>
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );
}
