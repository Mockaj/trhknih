import { BookPreviewProps } from "../BookPreview/BookPreview";
import "./styles/cart.css";
import { MdDelete } from "react-icons/md";
export const Cart = () => {
  // prettier-ignore
  const bestsellers:BookPreviewProps[] = [
  {id: 0, name: "Mistborn: The Final Empire", author: "Brandon Sanderson", price: 12.9, image: "https://www.slovart.cz/buxus/images/image_27864_19_v1.jpeg" },
  {id: 1, name: "Mistborn: Well of Ascention", author: "Brandon Sanderson", price: 13.9, image: "https://im9.cz/iR/importprodukt-orig/927/92771a3f60b47ed0c2cbe001d1ad6d11.jpg" },
  {id: 2, name: "Mistborn: Hero of Ages", author: "Brandon Sanderson", price: 14.9, image: "http://www.slovart.cz/buxus/images/image_27866_19_v1.jpeg" },
  {id: 3, name: "Mistborn: Alloy of Law", author: "Brandon Sanderson", price: 16.9, image: "http://www.slovart.cz/buxus/images/image_27867_19_v1.jpeg" }]
  return (
    <>
      <h1 className="heading">Cart and Order</h1>
      <div className="cart-container">
        <div className="cart-wrapper">
          <div className="cart-header">
            <div className="col-1">Preview</div>
            <div className="col-2">Item</div>
            <div className="col-3">Language</div>
            <div className="col-4">Price</div>
          </div>
          {bestsellers.map((item, index) => {
            return (
              <div className="cart-row">
                <div className="col-1 img-container">
                  <img src={item.image} className="cart__img" />
                </div>
                <div className="col-2 row-text item-name">{item.name}</div>
                <div className="col-3 row-text">English</div>
                <div className="col-4 row-text price-btn-wrapper">
                  <span>{item.price}$</span>
                  <button className="remove-btn">
                    <MdDelete />
                    &nbsp; Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
