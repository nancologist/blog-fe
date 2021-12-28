import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import About from '../pages/About/About';
import Header from '../components/Header/Header';
import Home from '../pages/Home/Home';
import Admin from '../pages/Admin/Admin';
import Article from '../pages/Article/Article';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';

const App = () => {
  // const [isAuth, setIsAuth] = useState(false)
  // useEffect(() => {
  //   const authToken = localStorage.getItem('authToken');
  // }, []);

  return (
    <div className="App">

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/l0g1n" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
