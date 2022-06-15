import { GrDeliver } from "react-icons/gr";
import { BiShow } from "react-icons/bi";
import { ToastContainer, toast } from "react-toast";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

export interface AcceptedOfferProps {
  item: {
    book: {
      photo: string;
      title: string;
    };
    price: number;
    order: {
      address: {
        city: string;
        firstName: string;
        houseNumber: string;
        lastName: string;
        postalCode: string;
        street?: string;
      };
      customer: {
        username: string;
      };
      phoneNumber: string;
    };
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
      "Thank you for using your books effectively! You will be notified when the buyer receives the book 😊"
    );
  const onCancelClick = () =>
    toast.info("You have canceled an order for one of your books");
  return (
    <div className="cart-row-container">
      <div
        className={`cart-row justify-between cart-row--mobile offers__img ${displayBorder}`}
      >
        <div className="col-1 img-container ">
          <img src={item.book.photo} className="cart__img " />
        </div>
        <div className="item-info-container tosent-info-container">
          <div className="col-2 row-text item-name cart-page-name-price-container cart-offers-name-price-container">
            <span className="offers-name-price__span">{item.book.title}</span>
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
      <div className={`${displayAddress} offer-address-message`}>
        <p>
          User <b>{item.order.customer.username}</b> has ordered your book.
        </p>
        <p>Please send your book to the following address:</p>
        <p className="account-text-align-right account-margin-top-1">
          {item.order.address.city} {item.order.address.postalCode}
        </p>
        <p className="account-text-align-right">{item.order.address.street}</p>
        <p className="account-text-align-right account-margin-bottom-1">
          {item.order.address.firstName} {item.order.address.lastName}
        </p>
        <p>
          You can contact <b>{item.order.customer.username}</b> on this number:
        </p>
        <p className="account-text-align-right  account-margin-top-1">
          {item.order.phoneNumber}
        </p>
      </div>
    </div>
  );
};
