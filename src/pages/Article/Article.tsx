import { useEffect } from 'react';
import { useParams } from 'react-router';

import api from '../../api';

const Article = () => {
  const { id } = useParams()
  
  useEffect(() => {
    (async () => {
      try {
        const res = await api.article.getSingle(id!)
        console.log(res);
      } catch (err) {
        console.error(err)
      }
    })();
  }, [id])

  return (
    <h1>Hello ID ...</h1>
  )
};

export default Article;