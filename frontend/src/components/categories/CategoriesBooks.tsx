import { BookPreview } from "../BookPreview/BookPreview"
import { PageChoice } from "./PageChoice"

export const CategoriesBooks = (props) => {
  const { books, pages } = props
  return (
  <div className="categories-main-content">
    <ul className="categories-book-list">
      {books.map((book) => <li key={book.id} className="categories__book-preview-wrapper"><BookPreview {...book} /></li>)}
    </ul>
    <nav>
      <PageChoice numOfPages={pages}/>
    </nav>
  </div>
  )
}