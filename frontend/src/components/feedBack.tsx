import {
  Modal,
  Box,
  Typography,
} from "@mui/material";

const FeedBack = ( {children}: {children: string} ) => {
  return (
    <Modal
      open={true}
      // onClose={false}
      aria-describedby="modal-modal-description"
    >
      <Box sx={style.box}>
        <Typography id="modal-modal-description">
          {children}
        </Typography>
      </Box>
    </Modal>
  )
}

export default FeedBack

const style = {
  box: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 1,
    border: 0,
    boxShadow: 24,
    p: 4,
  }
};