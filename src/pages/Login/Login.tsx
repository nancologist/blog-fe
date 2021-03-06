import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, InputAdornment, IconButton, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import './Login.css';
import api from '../../api/public';
import { LoginForm } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import * as authActions from '../../store/auth/actions';
import AppInput from '../../components/AppInput/AppInput';

const ONE_HOUR = 3600 * 1000;

const Login = () => {
  const [form, setForm] = useState<LoginForm>({ email: '', pwd: '' });
  const [pwdShow, setPwdShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: 'email' | 'pwd'
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const logIn = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const res = await api.auth.login(form);
      if (res.data.code === 'SIGNED_IN') {
        localStorage.removeItem('authToken');
        localStorage.setItem('authToken', res.data.token);
        localStorage.setItem('expireAt', (Date.now() + ONE_HOUR).toString());
        dispatch(authActions.setVerified(true));
        navigate('/admin', { replace: true });
      }
    } catch (err: any) {
      console.error(err);
      alert('Falsche Logindaten.')
    }
  };

  return (
    <div className="Login">
      <h2 className="Login__title">Anmelden</h2>
      <form onSubmit={logIn}>

        <AppInput
          id="username"
          label="E-Mail"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'email')}
          size="small"
          style={{
            display: 'block',
            marginBottom: '20px',
            width: '400px'
          }}
        />

        <OutlinedInput
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onMouseDown={() => { setPwdShow(true) }}
                onMouseUp={() => { setPwdShow(false) }}
                edge="end"
              >
                {pwdShow ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          onChange={(e) => handleChange(e, 'pwd')}
          placeholder="Kennwort"
          size="small"
          type={pwdShow ? 'text' : 'password'}
        />

        <Button type="submit" variant="contained">Anmelden</Button>
      </form>
    </div>
  );
};

export default Login;