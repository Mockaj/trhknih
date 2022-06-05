import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image1 from "../../assets/basePage/image1.png";
import image2 from "../../assets/basePage/image2.png";
import { BookPreview, BookPreviewProps } from "../BookPreview/BookPreview";
import "./BasePage.css";

export const BasePage = () => {
  const bestsellers: BookPreviewProps[] = [
    {
      id: 0,
      name: "Mistborn: The Final Empire",
      author: "Brandon Sanderson",
      price: 12.9,
      image: "https://www.slovart.cz/buxus/images/image_27864_19_v1.jpeg",
    },
    {
      id: 1,
      name: "Mistborn: Well of Ascention",
      author: "Brandon Sanderson",
      price: 13.9,
      image:
        "https://im9.cz/iR/importprodukt-orig/927/92771a3f60b47ed0c2cbe001d1ad6d11.jpg",
    },
    {
      id: 2,
      name: "Mistborn: Hero of Ages",
      author: "Brandon Sanderson",
      price: 14.9,
      image: "http://www.slovart.cz/buxus/images/image_27866_19_v1.jpeg",
    },
    {
      id: 3,
      name: "Mistborn: Alloy of Law",
      author: "Brandon Sanderson",
      price: 16.9,
      image: "http://www.slovart.cz/buxus/images/image_27867_19_v1.jpeg",
    },
    {
      id: 0,
      name: "Mistborn: The Final Empire",
      author: "Brandon Sanderson",
      price: 12.9,
      image: "https://www.slovart.cz/buxus/images/image_27864_19_v1.jpeg",
    },
  ];

  const freeBooks: BookPreviewProps[] = [
    {
      id: 4,
      name: "Ember in the Ashes",
      author: "Sabaa Tahir",
      price: 0,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7gKCrgT8GE7H_zoBE2_qlQfUCBWBSMXK88LuSGpfWbv_v6fqZJJVjWy2EXjcoV7fQnwI&usqp=CAU",
    },
    {
      id: 5,
      name: "Torch Against the Night",
      author: "Sabaa Tahir",
      price: 0,
      image:
        "https://img.thriftbooks.com/api/images/i/m/54DC367FBA6E8444B3542650E7406DE5E5F654A6.jpg",
    },
    {
      id: 6,
      name: "A Reaper at the Gates",
      author: "Sabaa Tahir",
      price: 0,
      image: "https://images-na.ssl-images-amazon.com/images/I/81KqCnGkglL.jpg",
    },
    {
      id: 7,
      name: "Sky Beyond the Storm",
      author: "Sabaa Tahir",
      price: 0,
      image:
        "https://cdn.knihcentrum.cz/99385536_a-sky-beyond-the-storm-1.jpeg",
    },
    {
      id: 4,
      name: "Ember in the Ashes",
      author: "Sabaa Tahir",
      price: 0,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7gKCrgT8GE7H_zoBE2_qlQfUCBWBSMXK88LuSGpfWbv_v6fqZJJVjWy2EXjcoV7fQnwI&usqp=CAU",
    },
  ];

  const newlyAdded: BookPreviewProps[] = [
    {
      id: 8,
      name: "Odin's Child",
      author: "Siri Pettersen",
      price: 15,
      image:
        "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/6469/9781646900008.jpg",
    },
    {
      id: 9,
      name: "The Rot",
      author: "Siri Pettersen",
      price: 10,
      image:
        "https://image.ebooks.com/previews/210/210311/210311388/210311388.jpg",
    },
    {
      id: 10,
      name: "The Might",
      author: "Siri Pettersen",
      price: 20,
      image:
        "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781646900022/the-might-9781646900022.jpg",
    },
    {
      id: 11,
      name: "Blood Song",
      author: "Anthony Ryan",
      price: 13,
      image:
        "https://i0.wp.com/anthonyryan.net/wp-content/uploads/2013/03/blood-song-us-cover.jpg?resize=250%2C378",
    },
    {
      id: 8,
      name: "Odin's Child",
      author: "Siri Pettersen",
      price: 15,
      image:
        "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/6469/9781646900008.jpg",
    },
  ];

  const getWindowDimensions = () => {
    const { innerWidth: width } = window;
    return width;
  };

  const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  };

  const width = useWindowDimensions();

  if (width < 900) {
    // Return mobile version
    return (
      <div className="basepage-wrapper">
        <div className="buy-books-wrapper">
          <div className="big-text-wrapper">
            <h1 className="big-text">
              <span className="big-text--green">Buy</span> and{" "}
              <span className="big-text--green">sell</span> books
            </h1>

            <ul className="buttons">
              <li className="list-button">
                <Link to="/categories/newlyAdded" className="green-button">
                  Newly Added
                </Link>
              </li>
              <li className="list-button">
                <Link to="/sell-a-book" className="green-button">
                  Sell Books
                </Link>
              </li>
              <li className="list-button">
                <Link to="/categories/bestsellers" className="green-button">
                  Bestsellers
                </Link>
              </li>
              <li className="list-button">
                <Link to="/categories/freeBooks" className="green-button">
                  Free Books
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="basepage__category">
          <h2>Bestsellers</h2>
          <Link
            to="/categories/bestsellers"
            className="green-button green-button--smaller"
          >
            Show More
          </Link>
        </div>
        <div className="books-wrapper">
          {bestsellers.slice(0, 2).map((b) => (
            <BookPreview
              id={b.id}
              image={b.image}
              name={b.name}
              author={b.author}
              price={b.price}
            />
          ))}
        </div>

        <div className="basepage__category">
          <h2>Free Books</h2>
          <Link
            to="/categories/freeBooks"
            className="green-button green-button--smaller"
          >
            Show More
          </Link>
        </div>
        <div className="books-wrapper">
          {freeBooks.slice(0, 2).map((b) => (
            <BookPreview
              id={b.id}
              image={b.image}
              name={b.name}
              author={b.author}
              price={b.price}
            />
          ))}
        </div>

        <div className="basepage__category">
          <h2>Newly Added</h2>
          <Link
            to="/categories/newlyAdded"
            className="green-button green-button--smaller"
          >
            Show More
          </Link>
        </div>
        <div className="books-wrapper">
          {newlyAdded.slice(0, 2).map((b) => (
            <BookPreview {...b} />
          ))}
        </div>
      </div>
    );
  } else {
    // Return desktop version
    return (
      <div className="basepage-wrapper">
        <div className="sell-books-wrapper">
          <div className="big-text-wrapper">
            <h1 className="big-text">
              Put your old <span className="big-text--green">books</span>
              <br />
              into <span className="big-text--green">circulation</span>
            </h1>
            <Link to="/sell-a-book" className="green-button">
              Sell books
            </Link>
          </div>
          <img src={image1} alt="" />
        </div>
        <div className="buy-books-wrapper">
          <img src={image2} alt="" />
          <div className="big-text-wrapper">
            <h1 className="big-text">
              Save <span className="big-text--green">money</span> and
              <br />
              <span className="big-text--green">environment</span>
            </h1>
            <Link to="/categories" className="green-button">
              Buy books
            </Link>
          </div>
        </div>

        <div className="basepage__category">
          <h2>Bestsellers</h2>
          <Link
            to="/categories/bestsellers"
            className="green-button green-button--smaller"
          >
            Show More
          </Link>
        </div>
        <div className="books-wrapper">
          {width < 1200
            ? bestsellers.slice(0, 4).map((b) => <BookPreview {...b} />)
            : bestsellers.map((b) => <BookPreview {...b} />)}
        </div>

        <div className="basepage__category">
          <h2>Free Books</h2>
          <Link
            to="/categories/freeBooks"
            className="green-button green-button--smaller"
          >
            Show More
          </Link>
        </div>
        <div className="books-wrapper">
          {width < 1200
            ? freeBooks.slice(0, 4).map((b) => <BookPreview {...b} />)
            : freeBooks.map((b) => <BookPreview {...b} />)}
        </div>

        <div className="basepage__category">
          <h2>Newly Added</h2>
          <Link
            to="/categories/newlyAdded"
            className="green-button green-button--smaller"
          >
            Show More
          </Link>
        </div>
        <div className="books-wrapper">
          {width < 1200
            ? newlyAdded.slice(0, 4).map((b) => <BookPreview {...b} />)
            : newlyAdded.map((b) => <BookPreview {...b} />)}
        </div>
      </div>
    );
  }
};
