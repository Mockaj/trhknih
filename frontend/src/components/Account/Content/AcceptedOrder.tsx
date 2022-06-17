import { GrDeliver } from "react-icons/gr";
import { toast } from "react-toast";
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

interface AcceptedOfferProps {
  item: {
    id: string;
    offer: {
      id: string;
      book: {
        photo: string;
        title: string;
      };
      price: number;
      order: {
        id: string;
      }
    };
  };
  refresh: React.Dispatch<React.SetStateAction<boolean>>
}

export const AcceptedOrder = ({ item, refresh }: AcceptedOfferProps ) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [showAddress, setShowAddress] = useState(false);
  const onAddressClick = () => {
    setShowAddress(!showAddress);
  };
  const displayAddress = showAddress
    ? "offers-address"
    : "offers-address offers-address--hide";
  const displayBorder = showAddress ? "cart-row-border--hide" : "";
  const onMarkSentClick = () => {
    console.log(item);
    getAccessTokenSilently()
    .then((token) => {
      axios
        .put(`http://localhost:4000/api/orders/${item.id}`,
        {finished: true},
        {headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
        }})
        .then(() => {
          toast.success(
            "Thank you for using your books effectively! We will now notify the sender 😊"
          );
          refresh(true);
        })
        .catch((error) => {
          console.log(`Error: ${error}`)
          toast.error("Your data change failed, try it again later");  
        });
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
      toast.error("You cannot change your profile right now, try it again later")
    });
  };

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
          </div>
        </div>
      </div>
    </div>
  );
};
