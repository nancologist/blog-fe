import { useEffect, useState } from 'react';

import './Home.css';
import api from '../../api/public';
import { Article } from '../../types/models';
import Thumb from '../../components/Thumb/Thumb';

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesEmpty, setArticlesEmpty] = useState(false);

  useEffect(
    () => {
      (async () => {
        try {
          const { data } = await api.article.getAll()
          if (data.length === 0) {
            setArticlesEmpty(true)
          } else {
            setArticles(data)
          }
        } catch (err) {
          console.error(err)
        }
      })()
    },
    []
  );

  return (
    <>
      <div className="thumbs">

        {
          articlesEmpty ? <p>No blog available</p> :
          articles.length === 0 ? <p>Loading...</p> :
          articles.map(item => <Thumb article={item} key={item._id} />)
        }

      </div>
    </>
  );
}

export default Home;