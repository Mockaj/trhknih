import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartItemListAtom } from "../../states/atoms/cartItemAtom";
import { toast } from "react-toast";
import { useAuth0 } from "@auth0/auth0-react";
import { SpinnerInfinity } from 'spinners-react';

export const BookContent = (props: any) => {
  const [cartItemList, setCartItemList] = useRecoilState(cartItemListAtom);
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  console.log("Props", props);
  const BookPage = (props: any) => {
    const { data } = props;
    let showAlert = false;
    const addItem = () => {
      const newItemObj = {
        id: data.data.id,
        image: data.data.book.photo,
        title: data.data.book.title,
        language: "English",
        price: data.data.price,
      };
      if (cartItemList.filter((item) => item.id === newItemObj.id).length > 0) {
        toast.error(
          "This item cannot be added to your cart, because it is already there and the user offers only one piece of this book"
        );
      } else {
        setCartItemList((cartItemList) => [...cartItemList, newItemObj]);
        toast.success("Item succesfully added to your cart");
      }
    };
    console.log("CartItems", cartItemList);
    if (data) {
      const categories = data.data.tags.map((tag: any) => tag.name);
      return (
        <div className="book-info">
          <div className="book-info__picture-part">
            <div className="mobile-only book-info__title-author-wrapper">
              <h2 className="book-info__title">{data.data.book.title}</h2>
              {data.data.book.fromAutors.map((author: any) => {
                return (
                  <p key={author.author.name} className="book-info__author">
                    {author.author.name}
                  </p>
                );
              })}
            </div>
            <div className="book-cover-wrapper">
              <img src={data.data.book.photo} alt="BookCover" />
            </div>
          </div>

          <div className="book-info__text-part">
            <div className="book-info__text-part-wrapper">
              <div className="desktop-only book-info__title-author-wrapper">
                <h2 className="book-info__title">{data.data.book.title}</h2>
                {data.data.book.fromAutors.map((author: any) => {
                  return (
                    <p key={author.author.name} className="book-info__author">
                      {author.author.name}
                    </p>
                  );
                })}
              </div>
              <div className="price-wrapper">
                <p className="price-wrapper__price">{data.data.price} €</p>
                {isAuthenticated ?
                  <button className="price-wrapper__button" onClick={addItem}>
                    Add to cart
                  </button> :
                  <button className="price-wrapper__button" onClick={() => loginWithRedirect()}>
                    Add to cart
                  </button>
                }

              </div>
              <div className="info">
                <div className="info__part-wrapper">
                  <div className="info__info-part">
                    <p className="info__label">Publish&nbsp;year:</p>
                    <p className="info__label-value">
                      {data.data.book.publishedDate}
                    </p>
                  </div>
                  <div className="info__info-part">
                    <p className="info__label">Publisher:</p>
                    <p className="info__label-value">
                      {data.data.book.publisher.name}
                    </p>
                  </div>
                </div>
                <div className="info__part-wrapper">
                  <div className="info__info-part">
                    <p className="info__label">Pages:</p>
                    <p className="info__label-value">
                      {data.data.book.numberOfPages}
                    </p>
                  </div>
                  <div className="info__info-part">
                    <p className="info__label">Seller:</p>
                    <p className="info__label-value">
                      {data.username}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="book-info__categories">
              {categories.map((category: any) => (
                <Link
                  key={category}
                  className="book-info__category"
                  to={`/categories/bestsellers/1?tags=${category}`}
                >
                  {category}
                </Link>
              ))}
            </div>
            <div className="book-info__note">
              <p className="info__label info__label-value">Note from Seller:</p>
              <p className="book-info__book-condition">
                {data.data.bookCondition}
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="loading-wrapper"><SpinnerInfinity size={100} thickness={100} speed={100} color="rgba(57, 172, 96, 1)" secondaryColor="rgba(255, 255, 255, 1)" /></div>;
    }
  };

  return <>{BookPage(props)}</>;
};
