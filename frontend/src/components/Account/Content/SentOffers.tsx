import { useState } from "react";
import { AcceptedOfferProps } from "./AcceptedOffer";
import { ToastContainer, toast } from "react-toast";
import { BiShow } from "react-icons/bi";
export const SentOffers = ({ item }: AcceptedOfferProps) => {
  const [showAddress, setShowAddress] = useState(false);

  const onAddressClick = () => {
    setShowAddress(!showAddress);
  };
  const displayAddress = showAddress
    ? "offers-address"
    : "offers-address offers-address--hide";
  return (
    <>
      <div className="cart-row full-width cart-row-sent-offers">
        <div className="col-1 img-container">
          <img src={item.book.photo} className="cart__img" />
        </div>
        <div className="item-info-container offers-sent-books-text">
          <div className="col-2 row-text item-name cart-page-name-price-container ">
            <span className="offers-name-price__span">{item.book.title}</span>
            <span className="offers-name-price__span">{item.price}$</span>
          </div>
          <div className="col-4 row-text price-btn-wrapper">
            <div className="item-info-container tosent-info-container">
              <div className="col-4 row-text price-btn-wrapper cart-offers-name-price-container">
                <ToastContainer delay={6000} />
                <button
                  className="remove-btn remove-btn-offers--mobile remove-btn-offers-tosent remove-btn-offers-havesent"
                  onClick={onAddressClick}
                >
                  <BiShow />
                  <span> Address</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${displayAddress} offer-address-message-have-sent`}>
        <p>
          User <b>{item.order.customer.username}</b> has ordered your book.
        </p>
        <p>You have sent your book to the following address:</p>
        <p className="account-text-align-right account-margin-top-1">
          {item.order.address.city} {item.order.address.postalCode}
        </p>
        <p className="account-text-align-right">{item.order.address.street}</p>
        <p className="account-text-align-right account-margin-bottom-1">
          {item.order.address.firstName} {item.order.address.lastName}
        </p>
        <p>You can contact <b>{item.order.customer.username}</b> on this number:</p>
        <p className="account-text-align-right  account-margin-top-1">
          {item.order.phoneNumber}
        </p>
      </div>
    </>
  );
};
