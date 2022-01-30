import { TextField } from '@mui/material';

// TODO: Change "any" to a detemined interface/type
const AppInput = (props: any) => {
  return (
    <TextField
      id={props.id}
      onChange={props.onChange}
      label={props.label}
      placeholder={ props.placeholder ? props.placeholder : undefined }
      value={props.value}
      size={props.size}
      sx={props.style}
    />
  )
};

export default AppInput;