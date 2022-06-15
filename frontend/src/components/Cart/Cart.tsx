import { BookPreviewProps } from "../BookPreview/BookPreview";
import "./styles/cart.css";
import { MdDelete } from "react-icons/md";
import { CartForm } from "./CartForm";
import emptyCart from "../../assets/empty_cart.png";
import { Link } from "react-router-dom";
import width from "../widthCalculator";
import { useDocumentTitle } from "@mantine/hooks";
import { useRecoilState } from "recoil";
import { cartItemListAtom } from "../../states/atoms/cartItemAtom";
import { CartItem } from "./CartItem";
import { ToastContainer, toast } from "react-toast";

export const Cart = () => {
  useDocumentTitle("Cart and Order \u00B7 Readee - recycle books");
  const [cartItemList, setCartItemList] = useRecoilState(cartItemListAtom);
  function itemRemove(bookId: string) {
    const newCartItemList = cartItemList.filter((item) => item.id != bookId);
    setCartItemList(newCartItemList);
    // toast.info("You have removed an item from your cart");
  }
  const totalPrice = cartItemList.reduce((accumulator, object) => {
    return accumulator + object.price;
  }, 0);

  // Mobile version
  if (width() < 650) {
    if (cartItemList.length == 0) {
      return (
        <div className="emptycart-container">
          <img src={emptyCart} className="emptycart__img" />
          <h1 className="emptycart__heading">Your cart is empty</h1>
          <Link to="/categories/bestsellers/1">
            <button className="cart-page-submit-button emptycart__btn">
              Buy books
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="cart-page-container">
          <h1 className="heading">Cart and Order</h1>
          {cartItemList.map((item, index) => {
            return (
              <div className="cart-row">
                <div className="col-1 img-container">
                  <img src={item.image} className="cart__img" />
                </div>
                <div className="item-info-container">
                  <div className="col-2 row-text item-name">{item.title}</div>

                  <div className="col-4 row-text cart-price-btn-wrapper">
                    <span>{item.price}€</span>
                    <button
                      className="remove-btn"
                      onClick={() => itemRemove(item.id)}
                    >
                      <MdDelete />
                      Remove
                    </button>
                    <ToastContainer delay={6000} />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="total-price">
            <label className="total-price__label">Total price:</label>
            <span className="total-price__span">{totalPrice}€</span>
          </div>
          <CartForm />
        </div>
      );
    }
  }
  // Desktop version
  else {
    if (cartItemList.length == 0) {
      return (
        <div className="emptycart-container">
          <img src={emptyCart} className="emptycart__img" />
          <h1 className="emptycart__heading">Your cart is empty</h1>
          <Link to="/categories/bestsellers/1">
            <button className="cart-page-submit-button emptycart__btn">
              Buy books
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="cart-page-justify-center">
          <div className="cart-page-container">
            <h1 className="heading">Cart and Order</h1>
            <div className="cart-container">
              <div className="cart-wrapper">
                <div className="cart-header">
                  <div className="col-1">Preview</div>
                  <div className="col-2">Item</div>
                  <div className="col-3">Language</div>
                  <div className="col-4">Price</div>
                </div>
                {cartItemList.map((item, id) => {
                  return (
                    <CartItem
                      id={item.id}
                      image={item.image}
                      language={item.language}
                      price={item.price}
                      title={item.title}
                    />
                  );
                })}
                <div className="total-price">
                  <label className="total-price__label">Total price:</label>
                  <span>{totalPrice}€</span>
                </div>
              </div>
            </div>
            <CartForm offer={cartItemList} />
          </div>
        </div>
      );
    }
  }
};
