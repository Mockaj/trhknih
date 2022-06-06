import { useDocumentTitle } from "@mantine/hooks";
import { Link, useParams } from "react-router-dom";
import "./BookInfo.css"

export interface BookInfoProps {
  id: number;
  image: string;
  name: string;
  author: string;
  price: number;
}

export const BookInfo = () => {
  useDocumentTitle("BookNameFromApi \u00B7 Readee - recycle books")

  const params = useParams()
  // params.id --> API get request
  const categories = [ "category1", "category2", "category3", "category4" ]
  const image = "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/5750/9780575089914.jpg"

  return (
    <div className="book-info">
      <div className="book-info__picture-part">
        <div className="mobile-only">
          <h2 className="book-info__title">TITLE</h2>
          <p className="book-info__author">AUTHOR</p>
        </div>
        <div className="book-cover-wrapper">
          <img src={image} alt="BookCover" />
        </div>
      </div>

      <div className="book-info__text-part">
        <div className="book-info__text-part-wrapper">
        <div className="desktop-only">
          <h2 className="book-info__title">TITLE</h2>
          <p className="book-info__author">AUTHOR</p>
        </div>
        <div className="price-wrapper">
          <p className="price-wrapper__price">PRICE</p>
          <button className="price-wrapper__button">Add to cart</button>
        </div>
        <div className="info">
          <div className="info__part-wrapper">
            <div className="info__info-part">
              <p className="info__label">Publish&nbsp;year:</p>
              <p className="info__label-value">YEAR</p>
            </div>
            <div className="info__info-part">
              <p className="info__label">Publisher:</p>
              <p className="info__label-value">PUBLISHER</p>
            </div>
          </div>
          <div className="info__part-wrapper">
          <div className="info__info-part">
              <p className="info__label">Pages:</p>
              <p className="info__label-value">PAGES</p>
            </div>
            <div className="info__info-part">
              <p className="info__label">Seller:</p>
              <p className="info__label-value">USERNAME</p>
            </div>
          </div>
        </div>
        </div>
        <div className="book-info__categories">
          {categories.map((category) => 
            <Link  className="book-info__category" to={`/categories?category=${category}`}>{category}</Link>)
          }
        </div>
      </div>
    </div>
  )
}