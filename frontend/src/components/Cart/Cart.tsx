import { BookPreviewProps } from "../BookPreview/BookPreview";
import "./styles/cart.css";
import { MdDelete } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: number;
  street?: string;
  houseNumber: string;
  city: string;
  postalCode: string;
  note?: string;
  payment: string;
}

export const Cart = () => {
  // prettier-ignore
  const bestsellers:BookPreviewProps[] = [
  {id: 0, name: "Mistborn: The Final Empire", author: "Brandon Sanderson", price: 12.9, image: "https://www.slovart.cz/buxus/images/image_27864_19_v1.jpeg" },
  {id: 1, name: "Mistborn: Well of Ascention", author: "Brandon Sanderson", price: 13.9, image: "https://im9.cz/iR/importprodukt-orig/927/92771a3f60b47ed0c2cbe001d1ad6d11.jpg" },
  {id: 2, name: "Mistborn: Hero of Ages", author: "Brandon Sanderson", price: 14.9, image: "http://www.slovart.cz/buxus/images/image_27866_19_v1.jpeg" },
  {id: 3, name: "Mistborn: Alloy of Law", author: "Brandon Sanderson", price: 16.9, image: "http://www.slovart.cz/buxus/images/image_27867_19_v1.jpeg" }]
  const totalPrice = bestsellers.reduce((accumulator, object) => {
    return accumulator + object.price;
  }, 0);
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data), console.log("POST REQUEST");
  };
  return (
    <>
      <h1 className="heading">Cart and Order</h1>
      <div className="cart-container">
        <div className="cart-wrapper">
          <div className="cart-header">
            <div className="col-1">Preview</div>
            <div className="col-2">Item</div>
            <div className="col-3">Language</div>
            <div className="col-4">Price</div>
          </div>
          {bestsellers.map((item, index) => {
            return (
              <div className="cart-row">
                <div className="col-1 img-container">
                  <img src={item.image} className="cart__img" />
                </div>
                <div className="col-2 row-text item-name">{item.name}</div>
                <div className="col-3 row-text">English</div>
                <div className="col-4 row-text price-btn-wrapper">
                  <span>{item.price}$</span>
                  <button className="remove-btn">
                    <MdDelete />
                    &nbsp; Remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="total-price">
            <label>Total price:</label>
            <span>{totalPrice}$</span>
          </div>
        </div>
      </div>
      <div className="delivery-form-container">
        <h3 className="small-header">Enter delivery address</h3>
        <form className="address__form" onSubmit={handleSubmit(onSubmit)}>
          <ul className="address__form-items">
            <li className="form-item">
              <label className="label">
                First name<span className="required-symbol">*</span>
              </label>
              <input
                className={`address__text-field ${
                  !errors.firstName ? "text-field--error" : ""
                }`}
                {...register("firstName", {
                  required: true,
                  minLength: 2,
                  maxLength: 30,
                })}
              />
              <p
                className={`registration__error ${
                  !errors.firstName ? "registration__error--hide" : ""
                }`}
              >
                {errors.firstName &&
                  errors.firstName.type === "required" &&
                  "First name is required"}
                {errors.firstName &&
                  errors.firstName.type === "minLength" &&
                  "First name must be at least 2 characters long"}
                {errors.firstName &&
                  errors.firstName.type === "maxLength" &&
                  "First name maximum length is 30 characters"}
                .
              </p>
            </li>

            <li className="form-item">
              <label className="label">
                Last name<span className="required-symbol">*</span>
              </label>
              <input
                className={`address__text-field ${
                  !errors.lastName ? "text-field--error" : ""
                }`}
                {...register("lastName", {
                  required: true,
                  minLength: 2,
                  maxLength: 30,
                })}
              />
              <p
                className={`registration__error ${
                  !errors.lastName ? "registration__error--hide" : ""
                }`}
              >
                {errors.lastName &&
                  errors.lastName.type === "required" &&
                  "Last name is required"}
                {errors.lastName &&
                  errors.lastName.type === "minLength" &&
                  "Last name must be at least 2 characters long"}
                {errors.lastName &&
                  errors.lastName.type === "maxLength" &&
                  "Last name maximum length is 30 characters"}
                .
              </p>
            </li>

            <li className="form-item">
              <label className="label">
                Email<span className="required-symbol">*</span>
              </label>
              <input
                className={`address__text-field ${
                  !errors.email ? "text-field--error" : ""
                }`}
                type="email"
                {...register("email", {
                  required: true,
                })}
              />
              <p
                className={`registration__error ${
                  !errors.email ? "registration__error--hide" : ""
                }`}
              >
                Valid email is required.
              </p>
            </li>

            <li className="form-item">
              <label className="label" htmlFor="phone">
                Phone number
              </label>
              <input
                className={`address__text-field ${
                  !errors.phone ? "text-field--error" : ""
                }`}
                type="tel"
                id="phone"
                pattern="[0-9\s\+]{0,17}"
                title="Phone number can consist only from '+' sign and numbers, maximum of 17 characters is allowed"
                {...register("phone", {
                  required: false,
                })}
              />
            </li>
            <li className="form-item m-top">
              <div className="double-input-container">
                <div className="col-1-input">
                  <label className="label ">Street</label>
                  <input
                    className={`address__text-field ${
                      !errors.street ? "text-field--error" : ""
                    }`}
                    type="text"
                    {...register("street", {
                      required: false,
                    })}
                  />
                </div>
                <div className="col-2-input">
                  <label className="label ">
                    House number<span className="required-symbol">*</span>
                  </label>
                  <input
                    className={`address__text-field ${
                      !errors.houseNumber ? "text-field--error" : ""
                    }`}
                    type="text"
                    {...register("houseNumber", {
                      required: true,
                    })}
                  />
                  <p
                    className={`registration__error ${
                      !errors.houseNumber ? "registration__error--hide" : ""
                    }`}
                  >
                    House number is required
                  </p>
                </div>
              </div>
            </li>
            <li className="form-item">
              <div className="double-input-container">
                <div className="col-1-input">
                  <label className="label ">
                    City<span className="required-symbol">*</span>
                  </label>
                  <input
                    className={`address__text-field ${
                      !errors.city ? "text-field--error" : ""
                    }`}
                    type="text"
                    {...register("city", {
                      required: true,
                    })}
                  />
                  <p
                    className={`registration__error ${
                      !errors.city ? "registration__error--hide" : ""
                    }`}
                  >
                    City is required
                  </p>
                </div>
                <div className="col-2-input">
                  <label className="label ">
                    Postal code<span className="required-symbol">*</span>
                  </label>
                  <input
                    className={`address__text-field ${
                      !errors.postalCode ? "text-field--error" : ""
                    }`}
                    type="text"
                    {...register("postalCode", {
                      required: true,
                    })}
                  />
                  <p
                    className={`registration__error ${
                      !errors.postalCode ? "registration__error--hide" : ""
                    }`}
                  >
                    Postal code is required
                  </p>
                </div>
              </div>
            </li>
            <li className="form-item">
              <label className="label" htmlFor="note">
                Note
              </label>
              <textarea
                id="note"
                className={`address__text-field note ${
                  !errors.note ? "text-field--error" : ""
                }`}
                {...register("note", {
                  required: false,
                })}
              />
            </li>
          </ul>
          <div className="payment-container">
            <h3 className="small-header">Select payment method</h3>
            <div className="radio-container">
              <input
                type="radio"
                id="delivery"
                value="delivery"
                className={`${!errors.payment ? "text-field--error" : ""}`}
                {...register("payment", {
                  required: true,
                })}
              />

              <label htmlFor="delivery">On delivery</label>
            </div>
            <div className="radio-container">
              <input type="radio" id="bank" value="bank" disabled />
              <label htmlFor="bank">Bank transfer</label>
            </div>
            <div className="radio-container">
              <input type="radio" id="card" value="card" disabled />
              <label htmlFor="card">Card payment</label>
            </div>
            <span
              className={`registration__error ${
                !errors.payment ? "registration__error--hide" : ""
              }`}
            >
              {errors.payment &&
                errors.payment.type === "required" &&
                "Please select payment method"}
              .
            </span>
          </div>
          <div className="submit-container">
            <input
              className="submit-button"
              type="submit"
              value="Place order"
            />
          </div>
        </form>
      </div>
    </>
  );
};
