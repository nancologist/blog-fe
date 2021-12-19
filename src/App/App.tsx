import { useState, ChangeEvent, SyntheticEvent } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import api from '../api';
// import { generateBase64FromImage } from '../utils'

import About from '../pages/About/About';
import Header from '../components/Header/Header';
import Home from '../pages/Home/Home';

const App = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleFileChange = (event: ChangeEvent | DragEvent) => {
    const files = (event.target as HTMLInputElement).files! ||
      (event as DragEvent).dataTransfer!.files // dataTransfer: Drag Event
    setSelectedFile(files[0])
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    const article = {
      title: 'Angis Blog',
      body: 'Here you will read nice things about Angis thoughts and ...'
    }

    let data = new FormData();
    data.append('articleImage', selectedFile as File)
    data.append('articleTitle', article.title)
    data.append('articleBody', article.body)

    api.article.post(data)
      .then(res => {
          console.log(res);
      })
      .catch(err => {
        console.error(err);
      })
  }

  return (
    <div className="App">
      <Header />

      <form
        onSubmit={handleSubmit}
      >
        
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
        />
        <br />

        <input type="text"
        />

        <button type="submit">Upload</button>
      </form>

      <br /><br /><hr /><br /><br />

      <img src={process.env.REACT_APP_S3_URL + 'orange.jpeg'} alt="" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
