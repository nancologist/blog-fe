import { Link } from 'react-router-dom';

import './Thumb.css';
import { ThumbProps as Props } from '../../types/cmp-props';
// import imgPlaceholder from '../../assets/img/placeholder.png';
import { convertNumToDate } from '../../utils';

const s3Url = process.env.REACT_APP_S3_URL!;

const Thumb = ({ article }: Props) => {
  const { _id, title, body, imageName, createdAt } = article;
  const titleThumb = title.length > 20 ? title.substr(0, 20) + '...' : title;

  let bodyThumb = '';
  JSON.parse(body).blocks.forEach((block: any) => {
    bodyThumb += block.text
  })
  bodyThumb = bodyThumb.length > 150 ? bodyThumb.substr(0, 150) + '...': bodyThumb;

  const imgUrl = s3Url + imageName; 

  return (
    <Link to={'/article/' + _id}>
      <div className="thumb">

        <div className="thumb__text">
          <div className="thumb__text__body">
            <h3>{titleThumb}</h3>
            <p>{bodyThumb}</p>
          </div>
          <span className="thumb__text__date">
            {convertNumToDate(createdAt)}
          </span>
        </div>

        {imageName ?
          <div className="thumb_img-wrap">
            <img src={imgUrl} alt="" />
          </div> :
          null
        }

      </div>
    </Link>
  )
};

export default Thumb;