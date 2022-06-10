import { Link, useLocation, useParams } from "react-router-dom";

interface PageChoiceProps {
  numOfPages: number
}

export const PageChoice = ({ numOfPages }: PageChoiceProps) => {
  var pages = [];
  const params = useParams()
  const query = useLocation()
  for (var i = 1; i <= numOfPages; i++) {
      pages.push(i);
  }
  return (
    <ul className="page-choice__list">
      {pages.map((pageNum) => 
        <Link 
          className={`page-choice__item ${params.page === pageNum.toString() ? "page-choice__item--active" : ""}`} 
          key={pageNum} 
          to={`/categories/${params.category}/${pageNum}${query.search}`}
        >
          <li>
            {pageNum}
          </li>
        </Link>)
      }
    </ul>
  )
}