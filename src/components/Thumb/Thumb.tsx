import './Thumb.css'
import { ThumbProps as Props } from '../../types/cmp-props';
import imgPlaceholder from '../../assets/img/placeholder.png';

const s3Url = process.env.REACT_APP_S3_URL

const Thumb = ({ article }: Props) => {
  const { title, body, imageName } = article
  const titleThumb = title.substr(0, 20) + ' ...'
  const bodyThumb = body.substr(0, 100) + ' ...'
  const imgUrl = imageName ? s3Url + imageName : imgPlaceholder 

  return (
    <div className="thumb">

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