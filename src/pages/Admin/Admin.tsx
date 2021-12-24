import { useState, ChangeEvent, SyntheticEvent } from 'react';

import './Admin.css';
import api from '../../api';
import { ArticleForm } from '../../types/models'
import Notification from '../../components/Notification/Notification'
// import { generateBase64FromImage } from '../utils'

const Admin = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [actionSuccess, setActionSuccess] = useState(false)
  const [article, setArticle] = useState<ArticleForm>({
    title: '',
    body: '',
    tags: []
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    setArticle(prev => ({
      ...prev,
      [fieldName]: event.target.value
    }));
  }

  const handleFileChange = (event: ChangeEvent | DragEvent) => {
    const files = (event.target as HTMLInputElement).files! ||
      (event as DragEvent).dataTransfer!.files // dataTransfer: Drag Event
    setSelectedFile(files[0])
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    setActionSuccess(true)

    // let data = new FormData();
    // data.append('articleImage', selectedFile as File);
    // data.append('articleTitle', article.title);
    // data.append('articleBody', article.body);

    // (async () => {
    //   try {
    //     const res = await api.article.post(data);
    //     const success = res.data.code === 'POSTED'
    //     if (success) {
    //       setActionSuccess(true)
    //     }
    //   } catch (err) {
    //     console.error(err)
    //   }
    // })()
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
    <div className="Admin">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-ctrl">
          <input
           id="title"
           onChange={(e) => handleChange(e, 'title')}
           placeholder="Add title..."
           type="text"
           value={article.title}
          />
        </div>

        <div className="form-ctrl">
          <textarea
            cols={30} rows={10} id="body"
            onChange={(event) => handleChange(event, 'body')}
            placeholder="Write message ..."
            value={article.body}
          ></textarea>
        </div>
        <div className="form-ctrl">
          <label htmlFor="fileInput">Foto hinzufügen</label>
          <input id="fileInput" type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">POSTEN</button>
      </form>

      <button onClick={deleteAll}>DELETE ALL ARTICLES</button>

      <Notification
        show={actionSuccess}
        msg={'Post erfolgreich veröffentlicht!'}
      />
    </div>
  );
}

export default Admin