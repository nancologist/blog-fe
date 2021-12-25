import { useNavigate } from 'react-router-dom';

import './Thumb.css'
import { ThumbProps as Props } from '../../types/cmp-props';
import * as utils from '../../utils';
import imgPlaceholder from '../../assets/img/placeholder.png';

const s3Url = process.env.REACT_APP_S3_URL

const Thumb = ({ article }: Props) => {
  const { _id, title, body, imageName } = article
  const titleThumb = title.substr(0, 20) + ' ...'
  const bodyThumb = body.substr(0, 100) + ' ...'
  const imgUrl = imageName ? s3Url + imageName : imgPlaceholder 

  const navigate = useNavigate()
  const goToArticle = () => {
    navigate(
      '/article/' + utils.convertToUrl(title),
      { state: { id: _id } }
    )
  };

  return (
    <div className="thumb" onClick={goToArticle}>

      <div className="thumb__text">
        <h2>{titleThumb}</h2>
        <p>{bodyThumb}</p>
      </div>

      <div className="thumb_img-wrap">
        <img src={imgUrl} alt="" />
      </div>

    </div>
  )
};

export default Thumb;