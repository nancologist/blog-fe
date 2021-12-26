import api from '../../api';
import './Login.css';
import { LoginForm } from '../../types';
import { ChangeEvent, SyntheticEvent, useState } from 'react';

const Login = () => {
  const [form, setForm] = useState<LoginForm>({ email: '', pwd: '' });
  const [pwdShow, setPwdShow] = useState(false);
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>, field: 'email' | 'pwd') => {
    setForm(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const login = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const res = await api.auth.login(form);
      console.log(res);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="Login">
      <h2 className="Login__title">Anmelden</h2>
      <form onSubmit={login}>
        <div className="Login__form-ctrl">
          <input
            type="email"
            placeholder="Deine E-Mail..."
            onChange={(e) => handleChange(e, 'email')}
          />
        </div>

        <div className="Login__form-ctrl">
          <input
            type={pwdShow ? 'text' : 'password'}
            placeholder="Dein Passwort..."
            onChange={(e) => handleChange(e, 'pwd')}
          />
          <button type="button" onClick={() => { setPwdShow(prev => !prev) }}>
            {pwdShow ? 'hide' : 'show'}
          </button>
        </div>

        <button type="submit">ANMELDEN</button>
      </form>
    </div>
  );
};

export default Login;