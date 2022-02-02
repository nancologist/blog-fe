import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';

import './App.css';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { RootState } from '../store';
import api from '../api/private';
import publicApi from '../api/public';
import * as authActions from '../store/auth/actions';
import * as themeActions from '../store/theme/actions';
import * as articleActions from '../store/article/actions';
import { categories } from '../data';

import About from '../pages/About/About';
import Header from '../components/Header/Header';
import Home from '../pages/Home/Home';
import Category from '../components/Category/Category';
import Admin from '../pages/Admin/Admin';
import Article from '../pages/Article/Article';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';

const App = () => {
  const isAuth = useAppSelector((state: RootState) => state.auth.verified);
  const isDark = useAppSelector((state: RootState) => state.theme.isDark);
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      (async () => {
        try {
          const res = await publicApi.article.getAll();
          const articles = res.data;
          dispatch(articleActions.storeAll(articles));


        } catch (err) {
          console.error(err)
        }
      })()
    },
    [dispatch]
  );

  useEffect(() => {
    // TODO: cleanup - outsource this function to sth like "initAuth()"
    (async () => {
      try {
        const res = await api.auth.checkToken();
        const verified = res.data.code === 'TOKEN_VERIFIED';
        dispatch(authActions.setVerified(verified));
      } catch (err: any) {
        console.log({...err})
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDark]);

  const toggleTheme = () => {
    dispatch(themeActions.toggleTheme())
  }

  return (<div className="App">
    <Header />

    <div className="main">
      <Routes>
        
        <Route path="/" element={<Home />} />
        {categories.map(category => {
          return (<Route
            path={'/' + category.value}
            element={
              <Category name={category.value} />
            }
            key={category.value}
          />);
        })}

        <Route path="/about" element={<About />} />
        <Route path="/admin" element={isAuth ? <Admin /> : <NotFound />} />
        
        {/* FIXME: If id is not valid send it to NotFound  */}
        <Route path="/article/:id" element={<Article />} />
        <Route path="/l0g1n" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>

    <div className="float">
      <Brightness4Icon onClick={toggleTheme} />
    </div>

  </div>);
}

export default App;
