import { MultiSelect } from "react-multi-select-component"
import { Link, useLocation } from "react-router-dom"


export const CategoriesSidebar = (props) => {
  const {options, selected, setSelected} = props
  const query = useLocation()

  const categories = [
    ["Bestsellers", "bestsellers"],
    ["Newly added", "newlyAdded"],
    ["Free books", "freeBooks"]
  ]
  
  return (
    <nav className="categories-sidebar-container">
      <h1>Books</h1>
        <>
          <h3 className="categories__subheading">Featured</h3>
          <ul className="categories-featured__list">
            {categories.map((category) => (
              <li key={category[0]} className="categories-featured__item">
                <Link className="categories-featured__item-link" to={`/categories/${category[1]}/1${query.search}`}>
                  {category[0]}
                </Link>
              </li>
            ))}
          </ul>
        </>

      <div>
        <h3 className="categories__subheading">Tags</h3>
        <div className="categories-sidebar-filters">
          <MultiSelect
            className="categories-multiselect"
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
          />
          <Link className="categories-apply-filters" to={`?${selected.map((tag) => `${tag.label}`)}`} >
            Apply filters
          </Link>
        </div>
      </div>
    </nav>
  )
}