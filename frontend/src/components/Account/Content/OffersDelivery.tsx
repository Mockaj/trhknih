import { toast } from "react-toast";
import { SentOffers } from "./SentOffers";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { SpinnerInfinity } from "spinners-react";

export const OffersDelivery = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const [userData, setUserData] = useState();
  useEffect(() => {
    getUserOffers();
  }, []);

  const getUserOffers = () => {
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
  return (
    <div className="account-content-container">
      {userData ?
        <div className="offers-delivery-info-container">
          <h3 className="offers-delivery__heading"> Books you have sent</h3>
          <div className="delivery-form-container">
            {userData?.data.offers
              .filter(
                (offer: any) => offer.order !== null && offer.order.sent === true
              )
              .map((item, index) => {
                return (
                  <>
                    <SentOffers item={item} />
                  </>
                );
              })}
          </div>
        </div> :
        <div className="loading-wrapper loading-wrapper--small"><SpinnerInfinity size={75} thickness={100} speed={100} color="rgba(57, 172, 96, 1)" secondaryColor="rgba(255, 255, 255, 1)" /></div>}
    </div>
  );
};
