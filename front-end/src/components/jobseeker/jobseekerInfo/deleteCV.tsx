import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../../store';
import { addCV, cleanMessages } from '../../../store/jobSeekerSlice';

export default function DeleteCV({id}: {id: number | null}) {
  const [open, setOpen] = React.useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleDeleteCV = () => {
    dispatch(addCV({cv: null, id}))
    handleClose()
    setTimeout(() => dispatch(cleanMessages()), 3000);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DeleteIcon 
        fontSize="large" 
        sx={style.deleteIcon} 
        onClick={handleClickOpen} 
        color="error" 
      />
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText sx={{color: "#000"}}>
            Are you sure you want to delete your CV ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={handleDeleteCV} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const style = {
  deleteIcon: {
    cursor: 'pointer'
  }
};
