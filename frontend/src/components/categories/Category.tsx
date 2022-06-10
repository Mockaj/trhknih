import { Link } from "react-router-dom";


interface CategoryProps {
  title: string;
  categories: string[];
}


export const Category = ({ title, categories }: CategoryProps) => {
  return (
    <>
      <h3 className="categories__subheading">{title}</h3>
      <ul className="categories-featured__list">
        {categories.map((category) => (
          <li key={category} className="categories-featured__item">
            <Link className="categories-featured__item-link" to={`/categories/${category}/1`}>
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
