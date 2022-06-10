import { Link } from 'react-router-dom';
import './BookPreview.css'

export interface BookPreviewProps {
  id: number;
  image: string;
  name: string;
  authors: string[];
  price: number;
}


export const BookPreview = ({ id, image, name, authors, price }: BookPreviewProps) => {
  console.log(id)
  console.log(name)
  console.log(authors)
  console.log(price)
  return (
    <Link to={`/books/${id}`}>
    <div className="card">
      <div className="card__image-wrapper">
        <img src={image} alt="BookImage" className="card__image"/>
      </div>
      <div className="card__book-name">{name}</div>
      {authors.map((author) => <div className="card__book-author">{author}</div>)}
      
      <div className="card__price">{price===0 ? "Free" : `${price} €`}</div>
    </div>
    </Link>
  )
}
