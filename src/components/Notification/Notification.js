import { useState, useEffect, forwardRef } from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

let Notification = (props) => {
  useEffect(() => {
    if(props.show) handleOpen();
  }, [props.show])

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <Snackbar open={open} autoHideDuration={props.timeout | 3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {props.msg}
      </Alert>
    </Snackbar>
  );
};

// Notification = forwardRef(Notification);

export default Notification