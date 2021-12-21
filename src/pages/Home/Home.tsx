import './Home.css';
import api from '../../api';
import imgPlaceholder from '../../assets/img/placeholder.png';

const s3Url = process.env.REACT_APP_S3_URL

const Home = () => {
  const logIt = () => {
    api.article.getAll()
  };

  return (
    <>
      <div className="thumbs">

        {articles.map(item => {
          const titleThumb = item.title.substr(0, 20) + ' ...'
          const bodyThumb = item.body.substr(0, 100) + ' ...'

          return (
            <div className="thumb" key={item._id}>

              <div className="thumb__text">
                <h2>{titleThumb}</h2>
                <p>{bodyThumb}</p>
              </div>

              <div className="thumb_img-wrap">
                <img src={item.imageName ? s3Url + item.imageName : imgPlaceholder} alt="" />
              </div>

            </div>
          )
        })}

      </div>
      <button onClick={logIt}>Log!</button>
    </>
  );
}

const article1 = {
  _id: 'sdjfksjfkj',
  title: 'Art1 - Hello, this is Angelique...',
  body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas aperiam soluta laboriosam, doloribus ipsa quisquam fuga, consequuntur repudiandae consequatur accusantium quod. Cum, laboriosam suscipit. Atque excepturi earum reiciendis ducimus, deserunt cupiditate rem laborum dolor provident. Tenetur laboriosam hic, porro, deserunt velit eius beatae harum cumque qui recusandae ad repellat deleniti sequi quaerat aut autem vel illo quidem? Accusantium omnis aperiam facilis sed voluptatem distinctio fugit id maiores sit commodi assumenda, nobis, repellendus in magni perferendis rem dolorum? Autem qui sequi libero saepe deleniti repellat, impedit quis possimus assumenda enim iste recusandae eligendi illo soluta eveniet, delectus natus voluptatum aut animi!',
  imageName: 'orange.jpeg',
  tags: ['bio', 'Erziehung', 'Glauben']
}

const article2 = {
  _id: 'jkjk32se',
  title: 'Art2 - Östraaaaaaaaaaaauuu',
  body: 'Gugur magure papi gole setare dare. Aperiam odit tempore architecto nisi hic dolorum maiores libero! Odio asperiores consectetur, optio dolores officia ad dolorum reprehenderit consequatur illo? Porro ex voluptas deleniti. Ex itaque fuga numquam. Tenetur dicta hic fuga, corporis officiis voluptates, rerum nostrum nulla magni asperiores aspernatur, tempore id corrupti totam deleniti? Dignissimos autem fugit optio assumenda sequi blanditiis? Est cumque assumenda corrupti veritatis sit vitae aut eaque praesentium, ipsam esse eligendi nam incidunt voluptatem natus? Recusandae, possimus temporibus libero impedit ex expedita nesciunt incidunt ducimus nobis reiciendis ipsam sint iusto minus nam voluptatum perferendis laudantium consectetur eaque beatae non qui consequuntur porro nemo harum. Sit tempore adipisci totam consequuntur dolor vero quo laborum aliquam maxime hic laudantium voluptate quae doloribus cum molestias natus, illum ullam! Minima dolore, ad iste mollitia quasi qui quos beatae dicta eius quisquam sapiente nemo aliquid nobis ipsa, nihil iusto consequatur reiciendis? Iste voluptatem dolor exercitationem, ea numquam deserunt quaerat dolorum sint provident, illum alias eligendi, placeat commodi. Rem commodi aliquam quod, totam quisquam reprehenderit aperiam accusantium eaque neque, possimus magni! Reiciendis sequi quibusdam quam at earum. Obcaecati laudantium recusandae natus, amet dolores in. Magni quam rem vero illum ad rerum cum at?',
  imageName: undefined,
  tags: undefined
}

const article3 = {
  _id: 'jkjk32ses',
  title: 'Art2 - Östraaaaaaaaaaaauuu',
  body: 'Gugur magure papi gole setare dare. Aperiam odit tempore architecto nisi hic dolorum maiores libero! Odio asperiores consectetur, optio dolores officia ad dolorum reprehenderit consequatur illo? Porro ex voluptas deleniti. Ex itaque fuga numquam. Tenetur dicta hic fuga, corporis officiis voluptates, rerum nostrum nulla magni asperiores aspernatur, tempore id corrupti totam deleniti? Dignissimos autem fugit optio assumenda sequi blanditiis? Est cumque assumenda corrupti veritatis sit vitae aut eaque praesentium, ipsam esse eligendi nam incidunt voluptatem natus? Recusandae, possimus temporibus libero impedit ex expedita nesciunt incidunt ducimus nobis reiciendis ipsam sint iusto minus nam voluptatum perferendis laudantium consectetur eaque beatae non qui consequuntur porro nemo harum. Sit tempore adipisci totam consequuntur dolor vero quo laborum aliquam maxime hic laudantium voluptate quae doloribus cum molestias natus, illum ullam! Minima dolore, ad iste mollitia quasi qui quos beatae dicta eius quisquam sapiente nemo aliquid nobis ipsa, nihil iusto consequatur reiciendis? Iste voluptatem dolor exercitationem, ea numquam deserunt quaerat dolorum sint provident, illum alias eligendi, placeat commodi. Rem commodi aliquam quod, totam quisquam reprehenderit aperiam accusantium eaque neque, possimus magni! Reiciendis sequi quibusdam quam at earum. Obcaecati laudantium recusandae natus, amet dolores in. Magni quam rem vero illum ad rerum cum at?',
  imageName: undefined,
  tags: undefined
}

const articles = [
  article1,
  article2,
  article3
]

export default Home;