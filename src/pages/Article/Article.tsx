import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import './Article.css'
import api from '../../api/public';
import privateApi from '../../api/private';
import { Article as IArticle } from '../../types/models';
import * as utils from '../../utils';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import * as articleActions from '../../store/article/actions';

const s3Url = process.env.REACT_APP_S3_URL

const Article = () => {
  const { id } = useParams();
  const isAuth = useAppSelector(state => state.auth.verified);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.article.getSingle(id!)
        setArticle(res.data as IArticle);
        dispatch(articleActions.store(res.data as IArticle));
      } catch (err) {
        console.error(err)
      }
    })();
  }, [id, dispatch]);

  const [article, setArticle] = useState<IArticle>({
    _id: '',
    createdAt: 0,
    title: '',
    body: '',
    imageName: '',
    tags: []
  });
  
  const createdAt = utils.convertNumToDate(article.createdAt);

  const handleEdit = () => {
    dispatch(articleActions.isEditing(true));
    navigate('/admin');
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Der Beitrag wird permanent gelöscht. Bist du dir sicher?!')
    if (!confirmed) return;

    try {
      const res = await privateApi.article.delete(id!)
      if (res.data.code[0] === 'ARTICLE_DELETED') {
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // TODO: Unify all the page layouts (e.g. in a CSS class called "page")
    <div className="Article"> 
      <div className="Article__header">
        <div className="Article__header__title">
          <h1>{article.title}</h1>
          <span className="Article__header__title__date">erstellt am {createdAt}</span>
        </div>
        {
          isAuth ?
            <div className="Article__header__ctrl">
              <button onClick={handleEdit}>Bearbeiten</button>
              <button onClick={handleDelete}>Löschen</button>
            </div> : null
        }
        {/* TODO: Add feature later so user can change the visibility of a post */}
        {/* <button>Sichtbarkeit ändern</button> */}
      </div>
      {article.imageName ? <div className="Article__image-wrap"><img src={s3Url + article.imageName} alt="" /></div> : null}
      <p>{article.body}</p>
    </div>
  )
};

export default Article;