import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import api from '../../api';
import { Article as IArticle } from '../../types/models';

const s3Url = process.env.REACT_APP_S3_URL

const Article = () => {
  const { id } = useLocation().state
  const [article, setArticle] = useState<IArticle>({
    _id: '', title: '', body: '', imageName: '', tags: []
  })
  
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

  return (
    <div className="Article">
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      {article.imageName ? <img src={s3Url + article.imageName} alt="" /> : null}
    </div>
  )
};

export default Article;