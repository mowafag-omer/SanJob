import * as React from 'react';
import { 
  Button,
  TextField,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { addCV, cleanMessages } from '../../../store/jobSeekerSlice';

type AddCVProps = {
  id: number | null
  setShowCVForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddCV({ id, setShowCVForm }: AddCVProps) {
  const dispatch: AppDispatch = useDispatch();
  const [open] = React.useState(true);
  const [cv, setcv] = React.useState<any>(null);
  const [error, setError] = React.useState<{isError: boolean, message: string}>({
    isError: false,
    message: '' 
  })

  const handleSubmit = (event: any) => {
    event.preventDefault()
    if (cv?.size > (1 * 1024 * 1024)) {
      return setError({isError: true, message: 'File size is more than 2 MB'})
    } else if (cv?.type !== 'application/pdf') {
      return setError({isError: true, message: 'File format is not pdf'})
    }
     
    dispatch(addCV({cv, id}))
    setShowCVForm(false)
    setTimeout(() => dispatch(cleanMessages()), 3000);
  }

  const onChange = (event: any) => {
    setcv(event.target.files[0]);
    setError({isError: false, message: ''})
  }

  const handleClose = () => {
    setShowCVForm(false);
  };

  return (
    <Dialog open={open}>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Add your CV
            </DialogContentText>
            <TextField
              autoFocus
              error={error.isError}
              margin="dense"
              label=""
              type="file"
              onChange={onChange}
              variant="outlined"
              helperText={error.isError ? error.message : "maximum file size is 2 MB"}
              inputProps={{accept:"application/pdf"}}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button sx={style.button} onClick={handleClose}>Cancel</Button>
            <Button sx={style.button} type="submit" autoFocus>Add</Button>
          </DialogActions>
        </form>
      </Dialog>
  );
}

const style ={
  button: {
    color: "#2b3247"
  }
}

