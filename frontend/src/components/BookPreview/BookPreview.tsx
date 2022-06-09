import { Link } from 'react-router-dom';
import './BookPreview.css'

export interface BookPreviewProps {
  id: number;
  image: string;
  name: string;
  author: string;
  price: number;
}


export const BookPreview = ({ id, image, name, author, price }: BookPreviewProps) => {
  return (
    <Link to={`/books/${id}`}>
    <div className="card">
      <div className="card__image-wrapper">
        <img src={image} alt="BookImage" className="card__image"/>
      </div>
      <div className="card__book-name">{name}</div>
      <div className="card__book-author">{author}</div>
      <div className="card__price">{price===0 ? "Free" : `${price} €`}</div>
    </div>
    </Link>
  )
}
