import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemAvatar, makeStyles } from '@material-ui/core';
import React from 'react'


const useStyles = makeStyles({
});

const SimpleDialog = props => {

    const classes = useStyles();
    const { onClose, selectedValue, open, text } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };


    return (
        <Dialog maxWidth='xs' onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle style={{ fontSize: 20 }} >ALERT | RED Lifestyle</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ fontSize: 15 }} id="simple-dialog-title"><span dangerouslySetInnerHTML={{ __html: text }} /></DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} >OK</Button>
            </DialogActions>

        </Dialog>
    );
}

export default SimpleDialog;
