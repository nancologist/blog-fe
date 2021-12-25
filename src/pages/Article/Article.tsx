import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import './Article.css'
import api from '../../api';
import { Article as IArticle } from '../../types/models';
import * as utils from '../../utils';

const s3Url = process.env.REACT_APP_S3_URL

const Article = () => {
  const { id } = useLocation().state

  useEffect(() => {
    (async () => {
      try {
        const res = await api.article.getSingle(id!)
      setArticle(res.data)
      } catch (err) {
        console.error(err)
      }
    })();
  }, [id])

  const [article, setArticle] = useState<IArticle>({
    _id: '',
    createdAt: 0,
    title: '',
    body: '',
    imageName: '',
    tags: []
  })
  
  const createdAt = utils.convertNumToDate(article.createdAt)

  return (
    // TODO: Unify all the page layouts (e.g. in a CSS class called "page")
    <div className="Article"> 
      <div className="Article__header">
        <h1>{article.title}</h1>
        <span className="Article__header__date">erstellt am {createdAt}</span>
      </div>
      {article.imageName ? <div className="Article__image-wrap"><img src={s3Url + article.imageName} alt="" /></div> : null}
      <p>{article.body}</p>
    </div>
  )
};

export default Article;