import { useState, ChangeEvent, SyntheticEvent, useEffect, useRef } from 'react';

import './Admin.css';
import api from '../../api/private';
import { ArticleForm } from '../../types/models'
import Notification from '../../components/Notification/Notification'
import { useAppSelector } from '../../store/hooks';
import imgPlaceholder from '../../assets/img/placeholder.png';
import { generateBase64 } from '../../utils'
import TextEditor from '../../components/TextEditor/TextEditor';
import { convertToRaw, EditorState, convertFromRaw, ContentState } from 'draft-js';

const initialState = {
  article: {
    title: '',
    body: '',
    tags: []
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

  useEffect(
    function() {
      if (isEditing) {
        setForm({
          title: storedArticle.title,
          body: storedArticle.body,
          tags: storedArticle.tags
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
    [isEditing, storedArticle.title, storedArticle.body, storedArticle.tags]
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

        // TODO: Add EditPicture to EditArticle later

        res = await api.article.put({
          article: {
            ...storedArticle,
            title: form.title,
            body: stringifyRichText(editorState)
          }
        });
        success = res.data.code === 'UPDATED';
      }

      if (success) {
        // clean up
        setForm(initialState.article)
        setSelectedFile(undefined);
        (fileInput.current! as HTMLInputElement).value = '';
        
        const articleId = res?.data.id;

        setNotification(prev => ({
          ...prev,
          show: true,
          severity: 'success',
          msg: 'Post erfolgreich veröffentlicht! ',
          link: {
            label: 'Öffnen',
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
          <input
           id="title"
           onChange={(e) => handleChange(e, 'title')}
           placeholder="Add title..."
           type="text"
           value={form.title}
          />
        </div>

        <div className="form-ctrl">
          <TextEditor editorState={editorState} handleChangeEditorState={setEditorState} />
        </div>

        {/* IMAGE INPUT */}
        <div className="form-ctrl img">
          <label htmlFor="fileInput">Foto hinzufügen</label>
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

        <button type="submit">POSTEN</button>
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