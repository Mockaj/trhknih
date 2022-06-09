import { BookPreview } from "../BookPreview/BookPreview"
import {width as getWidth} from "../widthCalculator"

export const MobileBookShowcase = (props) => {
  const books = props.props
  return (
    <div className="books-wrapper">
    {books.slice(0, 2).map((b) => (
      <BookPreview {...b} />
    ))}
  </div>
  )
}

export const BookShowcase = (props) => {
  const books = props.props
  return (
    <div className="books-wrapper">
    {getWidth() < 1200
      ? books.slice(0, 4).map((b) => <BookPreview {...b} />)
      : books.map((b) => <BookPreview {...b} />)}
  </div>
  )
}