import { BookPreviewProps } from "../../BookPreview/BookPreview";
export const OffersDelivery = () => {
  // prettier-ignore
  const bestsellers:BookPreviewProps[] = [
    {id: 0, name: "Mistborn: The Final Empire", author: "Brandon Sanderson", price: 12.9, image: "https://www.slovart.cz/buxus/images/image_27864_19_v1.jpeg" },
    {id: 1, name: "Mistborn: Well of Ascention", author: "Brandon Sanderson", price: 13.9, image: "https://im9.cz/iR/importprodukt-orig/927/92771a3f60b47ed0c2cbe001d1ad6d11.jpg" },
    {id: 2, name: "Mistborn: Hero of Ages", author: "Brandon Sanderson", price: 14.9, image: "http://www.slovart.cz/buxus/images/image_27866_19_v1.jpeg" },
    {id: 3, name: "Mistborn: Alloy of Law", author: "Brandon Sanderson", price: 16.9, image: "http://www.slovart.cz/buxus/images/image_27867_19_v1.jpeg" }
  ]
  return (
    <div className="account-content-container">
      <div className="offers-delivery-info-container">
        <h3 className="offers-delivery__heading"> Books you have sent</h3>
        <div className="delivery-form-container">
          {bestsellers.map((item, index) => {
            return (
              <div className="cart-row full-width">
                <div className="col-1 img-container">
                  <img src={item.image} className="cart__img" />
                </div>
                <div className="item-info-container offers-sent-books-text">
                  <div className="col-2 row-text item-name cart-page-name-price-container ">
                    <span className="offers-name-price__span">{item.name}</span>
                    <span className="offers-name-price__span">
                      {item.price}$
                    </span>
                  </div>
                  <div className="col-4 row-text price-btn-wrapper">
                    <h5 className="offers-address__heading">
                      Delivery Address:
                    </h5>
                    <span>ADRESS</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
