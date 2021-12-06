import { Route, Routes } from 'react-router-dom';

import './App.css';
import About from '../pages/About/About';
import Header from '../components/Header/Header';
import Home from '../pages/Home/Home';

const App = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
