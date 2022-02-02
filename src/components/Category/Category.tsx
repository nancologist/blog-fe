import { useEffect, useState } from 'react';
import { RootState } from '../../store';
import { useAppSelector } from '../../store/hooks';
import Thumb from '../Thumb/Thumb';
import { Article } from '../../types/models';

const Category = (props: any) => {
  const articles = useAppSelector((state: RootState) => state.article.all);
  const [articlesByCat, setArticlesByCat] = useState<Article[]>([])
  
  useEffect(() => {
    setArticlesByCat(
      articles.filter(article => {
        if (props.name) {
          return article.category === props.name;
        }
        return true;
      })
    );
  }, [articles, props.name]);

  return (<>
    <div className="thumbs">{
      articles.length === 0 ? <p>Wird geladen.</p> :
      articlesByCat.length > 0 ?
      articlesByCat.map(item => <Thumb article={item} key={item._id} />)
      : <p>Kein Beitrag gefunden.</p>
    }</div>
  </>);
};

export default Category;