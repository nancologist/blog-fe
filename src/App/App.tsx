import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import api from '../api';
import { IPerson } from '../types';

import About from '../pages/About/About';
import Header from '../components/Header/Header';
import Home from '../pages/Home/Home';

const App = () => {
  const [person, setPerson] = useState<IPerson | undefined>(undefined)

  api.test
    .then(res => {
      setPerson(res.data)
    })
    .catch(err => {
      console.error(err);
    })

  return (
    <div className="App">
      <Header />

      <code>Name: {person?.name}</code><br />
      <code>Age: {person?.age}</code><br />
      <code>Country: {person?.country}</code><br /><br />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
