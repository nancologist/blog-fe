import { useState, ChangeEvent, SyntheticEvent } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import api from '../api';
import { IPerson } from '../types';
import { generateBase64FromImage } from '../utils'

import About from '../pages/About/About';
import Header from '../components/Header/Header';
import Home from '../pages/Home/Home';

const App = () => {
  const [person, setPerson] = useState<IPerson | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleFileChange = (event: ChangeEvent | DragEvent) => {
    const files = (event.target as HTMLInputElement).files! ||
      (event as DragEvent).dataTransfer!.files // dataTransfer: Drag Event
    console.log(files[0]);
    setSelectedFile(files[0])
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    let data = new FormData();
    data.append('myImage', selectedFile as File)

    api.uploadImg(data)
      .then(res => {
          // console.log(res);
      })
      .catch(err => {
        console.error(err);
      })
  }

  // Warning: Race Competition!
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

      <form
        onSubmit={handleSubmit}
      >
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
        />
        <br />
        <button type="submit">Upload</button>
      </form>

      <br /><br /><hr /><br /><br />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
