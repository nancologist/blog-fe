import { useState, ChangeEvent, SyntheticEvent } from 'react';

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
    data.append('articleImage', selectedFile as File);
    data.append('articleTitle', article.title);
    data.append('articleBody', article.body);

    (async () => {
      try {
        const res = await api.article.post(data);
        // TODO: Render success msg ...
        console.log(res);
      } catch (err) {
        console.error(err)
      }
    })()
  }

  const deleteAll = async () => {
    try {
      const res = await api.article.deleteAll();
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-ctrl">
          <label htmlFor="title">Titel</label>
          <input id="title" type="text" placeholder="Type title..."/>
        </div>
        <div className="form-ctrl">
          <label htmlFor="fileInput">Foto hinzufügen</label>
          <input id="fileInput" type="file" onChange={handleFileChange} />
        </div>
        
        <div>Tags...</div>

        <div className="form-ctrl">
          <label htmlFor="body">Text</label>
          <textarea cols={30} rows={10} id="body"></textarea>
        </div>
        <button type="submit">Upload</button>
      </form>

      <button onClick={deleteAll}>DELETE ALL ARTICLES</button>
    </>
  );
}

export default Admin