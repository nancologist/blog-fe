import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import './Article.css'
import api from '../../api/public';
import privateApi from '../../api/private';
import { Article as IArticle } from '../../types/models';
import { convertNumToDate } from '../../utils';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
// import pattern1 from '../../assets/img/muster-1.png';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import * as articleActions from '../../store/article/actions';

const s3Url = process.env.REACT_APP_S3_URL

const Article = () => {
  const { id } = useParams();
  const isAuth = useAppSelector(state => state.auth.verified);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [bodyView, setBodyView] = useState<ReactElement | null>(null)
  useEffect(() => {
    // TODO: should it also be move to a Redux Thunk? OR Replace it with an inner-Getter in Redux on All-Articles state ??
    (async () => {
      try {
        const res = await api.article.getSingle(id!)
        if (!res.data) {
          navigate('/not-found', {replace: true});
          return;
        }
        setArticle(res.data as IArticle);
        dispatch(articleActions.store(res.data as IArticle));

        setBodyView(
          <Editor
            blockStyleFn={() => 'justified'}
            editorState={
              EditorState.createWithContent(
                convertFromRaw(
                  JSON.parse(
                    res.data.body
                  )
                )
              )
            }
            readOnly
            onChange={(_: EditorState) => {}}
          />
        );

      } catch (err: any) {
        if (err?.response?.status === 404) {
          navigate('/not-found', {replace: true});
        }
      }
    })();
  }, [id, dispatch, navigate]);

  const [article, setArticle] = useState<IArticle>({
    _id: '',
    createdAt: 0,
    title: '',
    body: '',
    imageName: '',
    category: ''
  });

  const createdAt = convertNumToDate(article.createdAt);

  const handleEdit = () => {
    dispatch(articleActions.isEditing(true));
    navigate('/admin');
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Der Beitrag wird permanent gel??scht. Bist du dir sicher?!')
    if (!confirmed) return;

    try {
      const res = await privateApi.article.delete(id!)
      if (res.data.code[0] === 'ARTICLE_DELETED') {
        dispatch(articleActions.fetchAll());
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const logIt = () => {
  //   console.log(
  //     convertFromRaw(
  //       JSON.parse(
  //         article.body
  //       )
  //     )
  //   );
  // }

  return (
    <div className="Article">
      <div className="pattern"></div>
      <div className="Article__content">
        <div className="Article__header">
          <div className="Article__header__title">
            <h1>{article.title}</h1>
            <span className="Article__header__title__date">erstellt am {createdAt}</span>
          </div>
          {
            isAuth ?
              <div className="Article__header__ctrl">
                <button onClick={handleEdit}>Bearbeiten</button>
                <button onClick={handleDelete}>L??schen</button>
              </div> : null
          }
          {/* TODO: Add feature later so user can change the visibility of a post */}
          {/* <button>Sichtbarkeit ??ndern</button> */}
        </div>
        { bodyView }
        {article.imageName ? <div className="Article__image-wrap"><img src={s3Url + article.imageName} alt="" /></div> : null}
      </div>
      {/* <button onClick={logIt}>LOG</button> */}
      <div className="pattern"></div>
    </div>
  )
};

export default Article;
