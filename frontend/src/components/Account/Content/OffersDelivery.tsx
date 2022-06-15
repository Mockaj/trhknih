import { BookPreviewProps } from "../../BookPreview/BookPreview";
import { ToastContainer, toast } from "react-toast";
import { BiShow } from "react-icons/bi";
import { SentOffers } from "./SentOffers";
import { useState, useEffect } from "react";
import axios from "axios";
import { userId } from "../../../store/user";
export const OffersDelivery = () => {
  // prettier-ignore
  const bestsellers:BookPreviewProps[] = [
    {id: 0, name: "Mistborn: The Final Empire", author: "Brandon Sanderson", price: 12.9, image: "https://www.slovart.cz/buxus/images/image_27864_19_v1.jpeg" },
    {id: 1, name: "Mistborn: Well of Ascention", author: "Brandon Sanderson", price: 13.9, image: "https://im9.cz/iR/importprodukt-orig/927/92771a3f60b47ed0c2cbe001d1ad6d11.jpg" },
    {id: 2, name: "Mistborn: Hero of Ages", author: "Brandon Sanderson", price: 14.9, image: "http://www.slovart.cz/buxus/images/image_27866_19_v1.jpeg" },
    {id: 3, name: "Mistborn: Alloy of Law", author: "Brandon Sanderson", price: 16.9, image: "http://www.slovart.cz/buxus/images/image_27867_19_v1.jpeg" }
  ]
  const [userData, setUserData] = useState();
  useEffect(() => {
    getUserOffers();
  }, []);

  const getUserOffers = () => {
    axios
      .get(`http://localhost:4000/api/users/${userId}`)
      .then((response) => {
        const data = response.data.data;
        setUserData(data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
  return (
    <div className="account-content-container">
      <div className="offers-delivery-info-container">
        <h3 className="offers-delivery__heading"> Books you have sent</h3>
        <div className="delivery-form-container">
          {userData?.offers
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
      </div>
    </div>
  );
};
