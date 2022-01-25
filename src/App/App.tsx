import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { RootState } from '../store';
import api from '../api/private';
import * as authActions from '../store/auth/actions';

import About from '../pages/About/About';
import Header from '../components/Header/Header';
import Home from '../pages/Home/Home';
import Admin from '../pages/Admin/Admin';
import Article from '../pages/Article/Article';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';

const App = () => {
  const isAuth = useAppSelector((state: RootState) => state.auth.verified);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const res = await api.auth.checkToken();

      const verified = res.data.code === 'TOKEN_VERIFIED';
      dispatch(authActions.setVerified(verified));
    })();
  }, [dispatch]);

  return (
    <div className="App">

      <Header />

      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={isAuth ? <Admin /> : <NotFound />} />
          
          {/* FIXME: If id is not valid send it to NotFound  */}
          <Route path="/article/:id" element={<Article />} />
          <Route path="/l0g1n" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
