import { useState, useEffect, forwardRef } from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material'
import { Link } from 'react-router-dom';

import './Notification.css'

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
    <Snackbar open={open} autoHideDuration={props.timeout} onClose={handleClose}>
      <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
        {props.msg}
        {props.link ? <Link to={props.link.to} >{props.link.label}</Link> : null}
      </Alert>
    </Snackbar>
  );
};

export default Notification