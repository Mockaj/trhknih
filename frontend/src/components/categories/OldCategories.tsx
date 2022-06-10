import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Link, useLocation, useParams } from "react-router-dom";
import { BookPreview, BookPreviewProps } from "../BookPreview/BookPreview";
import { PageChoice } from "./PageChoice";
import "./styles/categories.css";

const categories = [
  ["Bestsellers", "bestsellers"],
  ["Newly added", "newlyAdded"],
  ["Free books", "freeBooks"]
]


const books: BookPreviewProps[] = [
  {
    id: 4,
    name: "Ember in the Ashes",
    authors: ["Sabaa Tahir"],
    price: 0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7gKCrgT8GE7H_zoBE2_qlQfUCBWBSMXK88LuSGpfWbv_v6fqZJJVjWy2EXjcoV7fQnwI&usqp=CAU",
  },
  {
    id: 5,
    name: "Torch Against the Night",
    authors: ["Sabaa Tahir"],
    price: 0,
    image:
      "https://cdn.knihcentrum.cz/98956697_an-ember-in-the-ashes-02-a-torch-against-the-night-1.jpg",
  },
  {
    id: 6,
    name: "A Reaper at the Gates",
    authors: ["Sabaa Tahir"],
    price: 0,
    image: "https://images-na.ssl-images-amazon.com/images/I/81KqCnGkglL.jpg",
  },
  {
    id: 7,
    name: "Sky Beyond the Storm",
    authors: ["Sabaa Tahir"],
    price: 0,
    image:
      "https://cdn.knihcentrum.cz/99385536_a-sky-beyond-the-storm-1.jpeg",
  },
  {
    id: 0,
    name: "Mistborn: The Final Empire",
    authors: ["Brandon Sanderson"],
    price: 12.9,
    image: "https://www.slovart.cz/buxus/images/image_27864_19_v1.jpeg",
  },
  {
    id: 1,
    name: "Mistborn: Well of Ascention",
    authors: ["Brandon Sanderson"],
    price: 13.9,
    image:
      "https://im9.cz/iR/importprodukt-orig/927/92771a3f60b47ed0c2cbe001d1ad6d11.jpg",
  },
  {
    id: 2,
    name: "Mistborn: Hero of Ages",
    authors: ["Brandon Sanderson"],
    price: 14.9,
    image: "http://www.slovart.cz/buxus/images/image_27866_19_v1.jpeg",
  },
  {
    id: 3,
    name: "Mistborn: Alloy of Law",
    authors: ["Brandon Sanderson"],
    price: 16.9,
    image: "http://www.slovart.cz/buxus/images/image_27867_19_v1.jpeg",
  },
  {
    id: 8,
    name: "Odin's Child",
    authors: ["Siri Pettersen"],
    price: 15,
    image:
      "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/6469/9781646900008.jpg",
  },
  {
    id: 9,
    name: "The Rot",
    authors: ["Siri Pettersen"],
    price: 10,
    image:
      "https://image.ebooks.com/previews/210/210311/210311388/210311388.jpg",
  },
  {
    id: 10,
    name: "The Might",
    authors: ["Siri Pettersen"],
    price: 20,
    image:
      "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781646900022/the-might-9781646900022.jpg",
  },
  {
    id: 11,
    name: "Blood Song",
    authors: ["Anthony Ryan"],
    price: 13,
    image:
      "https://i0.wp.com/anthonyryan.net/wp-content/uploads/2013/03/blood-song-us-cover.jpg?resize=250%2C378",
  },
]

const numOfPages = 10

export const OldCategories = () => {
  const params = useParams()
  const query = useLocation()

  // get data from api
  const tags = [
    "Action and Adventure",
    "Detective and Mystery",
    "Fantasy",
    "Historical Fiction",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Self-Development",
    "Biographies & Autobiographies",
    "Cookbooks",
    "History",
    "Poetry",
    "Computer Science",
    "Math",
    "Chemistry",
    "Medicine",
    "Economy",
    "English grammar",
  ]

  interface IOption {
    label: string,
    value: string
  }

  const options = tags.map((tag) => ({ ["label"]: tag, ["value"]: tag}))
  const [selected, setSelected] = useState<IOption[]>([]);
  
  return (
    <div className="categories-flex-wrap">
      <nav className="categories-sidebar-container">
        <h1>Books</h1>
        <>
          <h3 className="categories__subheading">Featured</h3>
          <ul className="categories-featured__list">
            {categories.map((category) => (
              <li className="categories-featured__item">
                <Link className="categories-featured__item-link" to={`/categories/${category[1]}/1`}>
                  {category[0]}
                </Link>
              </li>
            ))}
          </ul>
        </>

  <div>
    <h3 className="categories__subheading">Tags</h3>
    <MultiSelect
      className="categories-multiselect"
      options={options}
      value={selected}
      onChange={setSelected}
      labelledBy="Select"
    />
    <Link className="categories-apply-filters" to={`/categories/Newly added/1?${selected.map((tag) => `${tag.label}`)}`} >
      Apply filters
    </Link>
    </div>


      </nav>
      <div className="categories-main-content">
        <ul className="categories-book-list">
          {books.map((book) => <li className="categories__book-preview-wrapper"><BookPreview {...book} /></li>)}
        </ul>
        <nav>
          <PageChoice numOfPages={numOfPages}/>
        </nav>
      </div>
    </div>
  );
};
