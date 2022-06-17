import { toast } from "react-toast";
import { MdDelete } from "react-icons/md";
import { AcceptedOrder } from "./AcceptedOrder";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { SpinnerInfinity } from "spinners-react";

export const Orders = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [userData, setUserData] = useState();
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    if (refresh) {
      getUserOrdes();
      setRefresh(false);
    }
  }, [refresh]);

  const getUserOrdes = () => {
    setRefresh(true);
    getAccessTokenSilently()
      .then((token) => {
        axios
          .get(`http://localhost:4000/api/users/${user?.sub}`,
            {
              headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`,
              }
            })
          .then((response) => {
            const data = response.data.data;
            setUserData(data);
          })
          .catch((error) => console.log(`Error: ${error}`));
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
        toast.error("You cannot view your profile right now, try it again later")
      });
  };
  console.log(userData);
  return (
    <div className="account-content-container offers-content-container offers-content-container--mobile">
      {userData ?
        <>
          <div className="personal-info-container offers-info-container--mobile">
            <h3 className="offers-heading"> Active Orders</h3>
            {userData?.data.orders
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
                          onClick={() => {
                            getAccessTokenSilently()
                              .then((token) => {
                                axios
                                  .delete(`http://localhost:4000/api/orders/${item.id}`,
                                    {
                                      headers: {
                                        "content-type": "application/json",
                                        "authorization": `Bearer ${token}`,
                                      }
                                    })
                                  .then(() => {
                                    toast.info("You have removed your book order");
                                    setRefresh(true);
                                  })
                                  .catch((error) => 
                                  {
                                    console.log(`Error: ${error}`)
                                    toast.error("Your data change failed, try it again later");
                                  });
                              })
                              .catch((error) => {
                                console.log(`Error: ${error}`);
                                toast.error("You cannot change your profile right now, try it again later")
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
            <h3 className="offers-heading"> Books travelling to you</h3>
            {userData?.data.orders
              .filter((order) => order.finished === false && order.sent === true)
              .map((item, index) => {
                return <AcceptedOrder item={item} refresh={setRefresh} />;
              })}
          </div>
        </> :
        <div className="loading-wrapper loading-wrapper--small"><SpinnerInfinity size={75} thickness={100} speed={100} color="rgba(57, 172, 96, 1)" secondaryColor="rgba(255, 255, 255, 1)" /></div>}
    </div>
  );
};
