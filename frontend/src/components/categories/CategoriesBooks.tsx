import { BookPreview } from "../BookPreview/BookPreview"
import { PageChoice } from "./PageChoice"

export const CategoriesBooks = (props) => {
  const { books, pages } = props
  return (
  <div className="categories-main-content">
    <div className="categories-book-list">
      {books.map((book) => <BookPreview {...book} />)}
    </div>
    <nav>
      <PageChoice numOfPages={pages}/>
    </nav>
  </div>
  )
}