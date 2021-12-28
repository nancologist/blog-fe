import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { RootState } from '../store';
import api from '../api';
import { accept as authAccept, reject as authReject } from '../store/reducer';

import About from '../pages/About/About';
import Header from '../components/Header/Header';
import Home from '../pages/Home/Home';
import Admin from '../pages/Admin/Admin';
import Article from '../pages/Article/Article';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';

const App = () => {
  const isAuth = useAppSelector((state: RootState) => state.isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    (async () => {
      const res = await api.auth.checkToken(token!);

      if (res.data.code === 'TOKEN_VERIFIED') {
        dispatch({ type: authAccept.type });
      } else {
        dispatch({ type: authReject.type });
      }
    })();
  }, []);

  return (
    <div className="App">

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={isAuth ? <Admin /> : <NotFound />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/l0g1n" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
