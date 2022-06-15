import Tick from "../../assets/tick.png";
export const OrderCreated = () => {
  return (
    <div className="cart-order-placed">
      <h1 className="cart-order-placed__heading">Your order has been placed</h1>
      <img src={Tick} className="cart-order-placed__img" />
    </div>
  );
};
export default OrderCreated;
