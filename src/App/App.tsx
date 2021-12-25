import { Route, Routes } from 'react-router-dom';

import './App.css';

import About from '../pages/About/About';
import Header from '../components/Header/Header';
import Home from '../pages/Home/Home';
import Admin from '../pages/Admin/Admin';
import Article from '../pages/Article/Article';

const App = () => {
  return (
    <div className="App">

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>

    </div>
  );
}

export default App;
