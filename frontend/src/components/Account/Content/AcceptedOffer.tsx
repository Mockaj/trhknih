import { GrDeliver } from "react-icons/gr";
import { BiShow } from "react-icons/bi";
import { ToastContainer, toast } from "react-toast";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

interface AcceptedOfferProps {
  item: {
    image: string;
    name: string;
    price: number;
  };
}
export const AcceptedOffer = ({ item }: AcceptedOfferProps) => {
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
      "Thank you for using your books effectively! You will be notified when the buyer receives the book"
    );
  const onCancelClick = () => toast.info("You have removed your book offer");
  return (
    <div className="cart-row-container">
      <div
        className={`cart-row justify-between cart-row--mobile offers__img ${displayBorder}`}
      >
        <div className="col-1 img-container ">
          <img src={item.image} className="cart__img " />
        </div>
        <div className="item-info-container tosent-info-container">
          <div className="col-2 row-text item-name cart-page-name-price-container cart-offers-name-price-container">
            <span className="offers-name-price__span">{item.name}</span>
            <span className="offers-name-price__span">
              {item.price}$ + delivery
            </span>
          </div>
          <div className="col-4 row-text price-btn-wrapper cart-offers-name-price-container">
            <button
              className="remove-btn remove-btn-offers--mobile remove-btn-offers-tosent"
              onClick={onCancelClick}
            >
              <MdDelete />
              &nbsp; Cancel
            </button>
            <button
              className="remove-btn remove-btn-offers--mobile remove-btn-offers-tosent"
              onClick={onMarkSentClick}
            >
              <GrDeliver />
              &nbsp; Mark sent
            </button>
            <ToastContainer delay={6000} />
            <button
              className="remove-btn remove-btn-offers--mobile remove-btn-offers-tosent"
              onClick={onAddressClick}
            >
              <BiShow />
              &nbsp; Address
            </button>
          </div>
        </div>
      </div>
      <div className={displayAddress}>
        <p>Please send your book to the following address:</p>
        <p>ADDRESS</p>
      </div>
    </div>
  );
};
