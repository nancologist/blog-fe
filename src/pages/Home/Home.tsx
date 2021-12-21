import { useEffect, useState } from 'react';

import './Home.css';
import api from '../../api';
import { Article } from '../../types/models';
import Thumb from '../../components/Thumb/Thumb';

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(
    () => {
      (async () => {
        try {
          const { data } = await api.article.getAll()  
          setArticles(data)
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
          articles.length === 0 ? <p>Loading...</p> :
          articles.map(item => 
            <Thumb article={item} key={item._id} />
          )
        }

      </div>
    </>
  );
}

export default Home;