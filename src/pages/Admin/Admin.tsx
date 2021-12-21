import { useState, ChangeEvent, SyntheticEvent } from 'react';
import { Route, Routes } from 'react-router-dom';

import './Admin.css';
import api from '../../api';
// import { generateBase64FromImage } from '../utils'

const Admin = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleFileChange = (event: ChangeEvent | DragEvent) => {
    const files = (event.target as HTMLInputElement).files! ||
      (event as DragEvent).dataTransfer!.files // dataTransfer: Drag Event
    setSelectedFile(files[0])
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    const article = {
      title: 'Angis Blog '  + Math.floor(Math.random() * 1000),
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
    <form onSubmit={handleSubmit}>
        
    <input
      id="fileInput"
      type="file"
      onChange={handleFileChange}
    />

    <input type="text" />

    <button type="submit">Upload</button>
    </form>
  );
}

export default Admin