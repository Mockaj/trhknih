import { AcceptedOffer } from "./AcceptedOffer";
import { BookPreviewProps } from "../../BookPreview/BookPreview";
import { ToastContainer, toast } from "react-toast";
import { MdDelete } from "react-icons/md";
import { AcceptedOrder } from "./AcceptedOrder";
export const Orders = () => {
  const onCancelClick = () => toast.info("You have removed your book offer");
  // prettier-ignore
  const bestsellers:BookPreviewProps[] = [
      {id: 0, name: "Mistborn: The Final Empire", author: "Brandon Sanderson", price: 12.9, image: "https://www.slovart.cz/buxus/images/image_27864_19_v1.jpeg" },
      {id: 1, name: "Mistborn: Well of Ascention", author: "Brandon Sanderson", price: 13.9, image: "https://im9.cz/iR/importprodukt-orig/927/92771a3f60b47ed0c2cbe001d1ad6d11.jpg" },
      {id: 2, name: "Mistborn: Hero of Ages", author: "Brandon Sanderson", price: 14.9, image: "http://www.slovart.cz/buxus/images/image_27866_19_v1.jpeg" },
      {id: 3, name: "Mistborn: Alloy of Law", author: "Brandon Sanderson", price: 16.9, image: "http://www.slovart.cz/buxus/images/image_27867_19_v1.jpeg" }
    ]
  return (
    <div className="account-content-container offers-content-container offers-content-container--mobile">
      <div className="personal-info-container offers-info-container--mobile">
        <h3 className="offers-heading"> Active Orders</h3>
        {bestsellers.map((item, index) => {
          return (
            <div className="cart-row">
              <div className="col-1 img-container">
                <img src={item.image} className="cart__img" />
              </div>
              <div className="item-info-container">
                <div className="col-2 row-text item-name cart-page-name-price-container">
                  <span className="offers-name-price__span">{item.name}</span>
                  <span className="offers-name-price__span">{item.price}$</span>
                </div>
                <div className="col-4 row-text price-btn-wrapper">
                  <button
                    className="remove-btn remove-btn-offers--mobile"
                    onClick={onCancelClick}
                  >
                    <MdDelete />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="personal-info-container offers-info-container--mobile">
        <h3 className="offers-heading"> Books travelling to you</h3>
        {bestsellers.map((item, index) => {
          return <AcceptedOrder item={item} />;
        })}
      </div>
    </div>
  );
};
