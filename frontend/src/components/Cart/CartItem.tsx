import { MdDelete } from "react-icons/md";
import { useRecoilState } from "recoil";
import { cartItemListAtom } from "../../states/atoms/cartItemAtom";
interface CartItemProps {
  id: string;
  image: string;
  title: string;
  language: string;
  price: number;
}

export const CartItem = ({
  id,
  image,
  title,
  language,
  price,
}: CartItemProps) => {
  const [cartItemList, setCartItemList] = useRecoilState(cartItemListAtom);
  function itemRemove(bookId: string) {
    const newCartItemList = cartItemList.filter((item) => item.id != bookId);
    setCartItemList(newCartItemList);
  }
  return (
    <>
      <div className="cart-row">
        <div className="col-1 img-container">
          <img src={image} className="cart__img" />
        </div>
        <div className="col-2 row-text item-name">{title}</div>
        <div className="col-3 row-text">{language}</div>
        <div className="col-4 row-text cart-price-btn-wrapper">
          <span>{price}€</span>
          <button className="remove-btn" onClick={() => itemRemove(id)}>
            <MdDelete />
            &nbsp; Remove
          </button>
        </div>
      </div>
    </>
  );
};
