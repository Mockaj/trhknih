import { Link } from "react-router-dom"

export const BookContent = (props) => {

  const BookPage = (props) => {
    const {data} = props
    
    if (data) {
      console.log(data)
      const categories = data.data.tags.map((tag) => tag.name)
      return (
        <div className="book-info">
      <div className="book-info__picture-part">
        <div className="mobile-only">
          <h2 className="book-info__title">{data.data.book.title}</h2>
          {data.data.book.fromAutors.map((author) => { return (
            <p className="book-info__author">{author.author.name}</p> ) })
          }

        </div>
        <div className="book-cover-wrapper">
          <img src={data.data.book.photo} alt="BookCover" />
        </div>
      </div>

      <div className="book-info__text-part">
        <div className="book-info__text-part-wrapper">
        <div className="desktop-only">
          <h2 className="book-info__title">{data.data.book.title}</h2>
          {data.data.book.fromAutors.map((author) => { return (
            <p className="book-info__author">{author.author.name}</p> ) })
          }
        </div>
        <div className="price-wrapper">
          <p className="price-wrapper__price">{data.data.price} €</p>
          <button className="price-wrapper__button">Add to cart</button>
        </div>
        <div className="info">
          <div className="info__part-wrapper">
            <div className="info__info-part">
              <p className="info__label">Publish&nbsp;year:</p>
              <p className="info__label-value">{data.data.book.publishedDate}</p>
            </div>
            <div className="info__info-part">
              <p className="info__label">Publisher:</p>
              <p className="info__label-value">{data.data.book.publisher.name}</p>
            </div>
          </div>
          <div className="info__part-wrapper">
          <div className="info__info-part">
              <p className="info__label">Pages:</p>
              <p className="info__label-value">{data.data.book.numberOfPages}</p>
            </div>
            <div className="info__info-part">
              <p className="info__label">Seller:</p>
              <p className="info__label-value">{data.data.seller.username}</p>
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
    } else {
      return (
        <h3>
          loading
        </h3>
      )
    }
  } 

  return(
    <>
      {BookPage(props)}
    </>
  )
}