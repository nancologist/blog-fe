import { forwardRef, useImperativeHandle } from 'react';
import { Snackbar, Alert } from '@mui/material'

let Notification = (props) => {
  // useImperativeHandle(ref, () => ({
  //   handleClose: () => {
  //   },
  // }))

  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
      <Alert onClose={props.handleClose} severity="success" sx={{ width: '100%' }}>
        This is a success message!
      </Alert>
    </Snackbar>
  );
};

// Notification = forwardRef(Notification);

export default Notification