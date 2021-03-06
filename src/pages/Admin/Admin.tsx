import { useState, ChangeEvent, SyntheticEvent, useEffect, useRef } from 'react';
import { convertToRaw, EditorState, convertFromRaw } from 'draft-js';
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

import './Admin.css';
import api from '../../api/private';
import { ArticleForm } from '../../types/models'
import Notification from '../../components/Notification/Notification'
import imgPlaceholder from '../../assets/img/placeholder.png';
import { generateBase64 } from '../../utils'
import TextEditor from '../../components/TextEditor/TextEditor';
import AppInput from '../../components/AppInput/AppInput';
import { categories } from '../../data';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import * as articleActions from '../../store/article/actions';

const initialState = {
  article: {
    title: '',
    body: '',
    category: ''
  }
};

const stringifyRichText = (editorState: EditorState) => {
  return JSON.stringify(
    convertToRaw(
      editorState.getCurrentContent()
    )
  )
}

// FIXME: Post 2 articles back to back, the 2nd one won't get a green notificataion!

const Admin = () => {
  // State
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [form, setForm] = useState<ArticleForm>(initialState.article);
  const [imgPreview, setImgPreview] = useState(imgPlaceholder);
  const [notification, setNotification] = useState({
    show: false,
    msg: '',
    severity: '',
    timeout: null,
    link: {
      label: '',
      to: ''
    }
  });
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  // Redux
  const isEditing = useAppSelector(state => state.article.isEditing);
  const storedArticle = useAppSelector(state => state.article.instance);
  const dispatch = useAppDispatch();

  useEffect(
    function() {
      if (isEditing) {
        setForm({
          title: storedArticle.title,
          body: storedArticle.body,
          category: storedArticle.category
        })

        setEditorState(
          EditorState.createWithContent(
            convertFromRaw(
              JSON.parse(
                storedArticle.body
              )
            )
          )
        )
      }
    },    
    [isEditing, storedArticle.title, storedArticle.body, storedArticle.category]
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
    fieldName: string
  ) => {
    setForm(prev => ({
      ...prev,
      [fieldName]: event.target.value
    }));
  }

  const handleFileChange = async (event: ChangeEvent | DragEvent) => {
    const files = 
      (event.target as HTMLInputElement).files! ||
      (event as DragEvent).dataTransfer!.files; // dataTransfer: Drag Event

    const canceled = files.length === 0
    if (canceled) return;

    const file = files[0]
    setSelectedFile(file)

    try {
      const base64Img = await generateBase64(file)
      setImgPreview(base64Img as string)
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()

    let data = new FormData();
    data.append('articleImage', selectedFile as File);
    data.append('articleTitle', form.title);
    data.append('articleCategory', form.category)
    data.append(
      'articleBody',
      stringifyRichText(editorState)
    );

    try {
      const authToken = localStorage.getItem('authToken') as string;
      const tokenExpiresAt = localStorage.getItem('expireAt') as string;
      const tokenExpired = +tokenExpiresAt < Date.now()
      if (!authToken || tokenExpired) {
        setNotification(prev => ({
          ...prev,
          show: true,
          severity: 'warning',
          msg: 'Du musst dich erneut einloggen! (Speichere den Text!) ',
          link: {
            label: 'Anmelden',
            to: '/l0g1n'
          }
        }))

        return;
      }

      let res;
      let success = false;
      if (!isEditing) {
        res = await api.article.post(data);
        success = res.data.code === 'POSTED';
      } else {
        res = await api.article.put({
          article: {
            ...storedArticle,
            category: form.category,
            title: form.title,
            body: stringifyRichText(editorState)
          }
        });
        success = res.data.code === 'UPDATED';
      }

      if (success) {
        if (isEditing) dispatch(articleActions.fetchAll());

        // clean up
        setForm(initialState.article)
        setSelectedFile(undefined);
        if (selectedFile) (fileInput.current! as HTMLInputElement).value = '';
        
        const articleId = res?.data.id;

        setNotification(prev => ({
          ...prev,
          show: true,
          severity: 'success',
          msg: 'Post erfolgreich ver??ffentlicht! ',
          link: {
            label: '??ffnen',
            to: '/article/' + articleId
          }
        }));
      }
    } catch (err) {
      console.error(err)
    }
  }

  const fileInput = useRef(null)

  return (
    <div className="Admin">
      <h2>Erstelle einen neuen Beitrag!</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-ctrl">
          <AppInput
            id="title"
            label="Titel"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'title')}
            placeholder="Gib dem Beitrag einen Titel..."
            value={form.title}
            style={{ display: 'inline-block' }}
          />

          <FormControl>
            <InputLabel id="select-category">Kategorie</InputLabel>
            <Select
              value={form.category}
              onChange={(e: SelectChangeEvent) => handleChange(e, 'category')}
              labelId="select-category" label="Kategorie" placeholder="fjksldfj,..."
            >
              {categories.map(item => (
                <MenuItem value={item.value} key={item.value}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="form-ctrl">
          <TextEditor editorState={editorState} handleChangeEditorState={setEditorState} />
        </div>

        {/* IMAGE INPUT */}
        {/* TODO: Add EditPicture to EditArticle later */}
        {isEditing ? null :
          <div className="form-ctrl img">
            <label htmlFor="fileInput">Foto hinzuf??gen</label>
            <div className="form__img-preview">
              <img src={imgPreview} alt="" />
            </div>
            <input
              ref={fileInput}
              id="fileInput"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          </div>
        }

        <button type="submit">{isEditing ? 'BEARBEITEN' : 'ERSTELLEN'}</button>
      </form>

      <Notification
        show={notification.show}
        msg={notification.msg}
        timeout={notification.timeout}
        severity={notification.severity}
        link={notification.link}
      />
    </div>
  );
}

export default Admin