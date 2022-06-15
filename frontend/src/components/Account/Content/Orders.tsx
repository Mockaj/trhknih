import { AcceptedOffer } from "./AcceptedOffer";
import { BookPreviewProps } from "../../BookPreview/BookPreview";
import { ToastContainer, toast } from "react-toast";
import { MdDelete } from "react-icons/md";
import { AcceptedOrder } from "./AcceptedOrder";
import { useState, useEffect } from "react";
import axios from "axios";
import { userId } from "../../../store/user";
export const Orders = () => {
  const onCancelClick = () => toast.info("You have removed your book offer");
  const [userData, setUserData] = useState();
  useEffect(() => {
    getUserOrdes();
  }, []);

  const getUserOrdes = () => {
    axios
      .get(`http://localhost:4000/api/users/${userId}`)
      .then((response) => {
        const data = response.data.data;
        setUserData(data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
  console.log(userData);
  return (
    <div className="account-content-container offers-content-container offers-content-container--mobile">
      <div className="personal-info-container offers-info-container--mobile">
        <h3 className="offers-heading"> Active Orders</h3>
        {userData?.orders
          .filter((order) => order.finished === false && order.sent === false)
          .map((item, index) => {
            return (
              <div className="cart-row">
                <div className="col-1 img-container">
                  <img src={item.offer.book.photo} className="cart__img" />
                </div>
                <div className="item-info-container">
                  <div className="col-2 row-text item-name cart-page-name-price-container">
                    <span className="offers-name-price__span">
                      {item.offer.book.title}
                    </span>
                    <span className="offers-name-price__span">
                      {item.offer.price}$
                    </span>
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
        {userData?.orders
          .filter((order) => order.finished === false && order.sent === true)
          .map((item, index) => {
            return <AcceptedOrder item={item} />;
          })}
      </div>
    </div>
  );
};
