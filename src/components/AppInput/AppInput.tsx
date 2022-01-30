import { TextField } from '@mui/material';
import './AppInput.css';


// FIXME: I could not change the outline blue-color on focus!
// TODO: Change "any" to a detemined interface/type
const AppInput = (props: any) => {
  return (
    <TextField
      className="text-field"
      id={props.id}
      onChange={props.onChange}
      label={props.label}
      placeholder={ props.placeholder ? props.placeholder : undefined }
      value={props.value}
      size={props.size}
      sx={{
        ...props.style,
        outline: 'none'
      }}
    />
  )
};

export default AppInput;