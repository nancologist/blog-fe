import { useState, ChangeEvent, SyntheticEvent } from 'react';

import './Admin.css';
import api from '../../api';
import { ArticleForm } from '../../types/models'
import Notification from '../../components/Notification/Notification'
// import { generateBase64FromImage } from '../utils'

const initialState = {
  article: {
    title: '',
    body: '',
    tags: []
  }
};

const Admin = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [actionSuccess, setActionSuccess] = useState(false)
  const [form, setForm] = useState<ArticleForm>(initialState.article);
  const [articleId, setArticleId] = useState('');

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    setForm(prev => ({
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

    let data = new FormData();
    data.append('articleImage', selectedFile as File);
    data.append('articleTitle', form.title);
    data.append('articleBody', form.body);

    (async () => {
      try {
        const res = await api.article.post(data);
        const success = res.data.code === 'POSTED'
        if (success) {
          setActionSuccess(true)
          setForm(initialState.article)
          setArticleId(res.data.id)
        }
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
    <div className="Admin">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-ctrl">
          <input
           id="title"
           onChange={(e) => handleChange(e, 'title')}
           placeholder="Add title..."
           type="text"
           value={form.title}
          />
        </div>

        <div className="form-ctrl">
          <textarea
            cols={30} rows={10} id="body"
            onChange={(event) => handleChange(event, 'body')}
            placeholder="Write message ..."
            value={form.body}
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
        msg={'Post erfolgreich veröffentlicht! '}
        timeout={null}
        link={{
          label: 'Öffnen',
          to: '/article/' + articleId
        }}
      />
    </div>
  );
}

export default Admin