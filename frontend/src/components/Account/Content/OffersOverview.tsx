import { AcceptedOffer } from "./AcceptedOffer";
import { BookPreviewProps } from "../../BookPreview/BookPreview";
import { ToastContainer, toast } from "react-toast";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { userId } from "../../../store/user";
import { useAuth0 } from "@auth0/auth0-react";
export const OffersOverview = () => {
  const { getAccessTokenSilently, user} = useAuth0()
  const [userData, setUserData] = useState();
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    if(refresh){
      getUserOffers();
      setRefresh(false);
    }
  }, [refresh]);

  const getUserOffers = () => {
    getAccessTokenSilently()
    .then((token) => {
      axios
        .get(`http://localhost:4000/api/users/${user?.sub}`,
        {headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
        }})
        .then((response) => {
          const data = response.data.data;
          setUserData(data);
        })
        .catch((error) => console.log(`Error: ${error}`));
        return;
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
      toast.error("You cannot view your profile right now, try it again later")
    });
  };
  console.log(userData);
  return (
    <div className="account-content-container offers-content-container offers-content-container--mobile">
      <div className="personal-info-container offers-info-container--mobile">
        <h3 className="offers-heading"> Active Offers</h3>
        {userData?.data.offers
          .filter((offer) => offer.order === null)
          .map((item, index) => {
            return (
              <div className="cart-row">
                <div className="col-1 img-container">
                  <img src={item.book.photo} className="cart__img" />
                </div>
                <div className="item-info-container">
                  <div className="col-2 row-text item-name cart-page-name-price-container">
                    <span className="offers-name-price__span">
                      {item.book.title}
                    </span>
                    <span className="offers-name-price__span">
                      {item.price}$
                    </span>
                  </div>
                  <div className="col-4 row-text price-btn-wrapper">
                    <button
                      className="remove-btn remove-btn-offers--mobile"
                      onClick={() => {
                        getAccessTokenSilently()
                        .then((token) => {
                          axios
                          .delete(`http://localhost:4000/api/offers/${item.id}`,
                          {headers: {
                            "content-type": "application/json",
                            "authorization": `Bearer ${token}`,
                          }})
                          .then((response) => {
                            toast.info("You have removed your book offer");
                            setRefresh(true);
                            return;
                          })
                          .catch((error) => {
                            console.log(`Error: ${error}`);
                            toast.error("Your data change failed, try it again later");
                          });
                          })
                        .catch((error) => {
                        console.log(`Error: ${error}`);
                        toast.error("You cannot change your profile right now, try it again later");
                        });
                      }}
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
        <h3 className="offers-heading"> Books waiting to be sent</h3>
        {userData?.data.offers
          .filter((offer) => offer.order !== null && offer.order.sent === false)
          .map((item, index) => {
            return <AcceptedOffer item={item}  refresh={setRefresh} />;
          })}
      </div>
      <ToastContainer delay={6000} />
    </div>
  );
};
