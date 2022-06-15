import { GrDeliver } from "react-icons/gr";
import { ToastContainer, toast } from "react-toast";
import { useState } from "react";

interface AcceptedOfferProps {
  item: {
    offer: {
      book: {
        photo: string;
        title: string;
      };
      price: number;
    };
  };
}
export const AcceptedOrder = ({ item }: AcceptedOfferProps) => {
  const [showAddress, setShowAddress] = useState(false);
  const onAddressClick = () => {
    setShowAddress(!showAddress);
  };
  const displayAddress = showAddress
    ? "offers-address"
    : "offers-address offers-address--hide";
  const displayBorder = showAddress ? "cart-row-border--hide" : "";
  const onMarkSentClick = () =>
    toast.success(
      "Thank you for using your books effectively! We will now notify the sender 😊"
    );

  return (
    <div className="cart-row-container">
      <div
        className={`cart-row justify-between cart-row--mobile offers__img ${displayBorder}`}
      >
        <div className="col-1 img-container ">
          <img src={item.offer.book.photo} className="cart__img " />
        </div>
        <div className="item-info-container tosent-info-container">
          <div className="col-2 row-text item-name cart-page-name-price-container cart-offers-name-price-container">
            <span className="offers-name-price__span">
              {item.offer.book.title}
            </span>
            <span className="offers-name-price__span">
              {item.offer.price}$ + delivery
            </span>
          </div>
          <div className="col-4 row-text price-btn-wrapper cart-offers-name-price-container orders-received-button-container">
            <button
              className="remove-btn remove-btn-offers--mobile remove-btn-offers-tosent orders-received-button"
              onClick={onMarkSentClick}
            >
              <GrDeliver />
              &nbsp; Mark received
            </button>
            <ToastContainer delay={6000} />
          </div>
        </div>
      </div>
    </div>
  );
};
