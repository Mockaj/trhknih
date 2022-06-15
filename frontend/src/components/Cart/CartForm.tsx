import { useForm, SubmitHandler } from "react-hook-form";
import width from "../widthCalculator";
import { useRecoilState } from "recoil";
import { cartItemListAtom } from "../../states/atoms/cartItemAtom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  street?: string;
  houseNumber: string;
  city: string;
  postalCode: string;
  note?: string;
  payment: string;
}

export const CartForm = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    logout,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const [cartItemList, setCartItemList] = useRecoilState(cartItemListAtom);
  const shortLabels =
    width() < 650 ? ["House n.", "ZIP"] : ["House number", "Postal code"];
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<IFormInput>();
  console.log(user?.sub);
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formatedData = cartItemList.map((item) => {
      return {
        phoneNumber: data.phone,
        offerId: item.id,
        // TODO: use actual customerId instead of this hardcoded one
        customerId: user?.sub,
        address: {
          firstName: data.firstName,
          lastName: data.lastName,
          street: data.street,
          houseNumber: data.houseNumber,
          city: data.city,
          postalCode: data.postalCode,
        },
      };
    });

    getAccessTokenSilently()
      .then((token) => {
        console.log("TOKEN", token);
        axios.post("http://localhost:4000/api/orders", formatedData, {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
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
              Phone number <span className="required-symbol">*</span>
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
                required: true,
              })}
            />
            <p
              className={`registration__error ${
                !errors.phone ? "registration__error--hide" : ""
              }`}
            >
              Phone is required.
            </p>
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
                  {shortLabels[0]}
                  <span className="required-symbol">*</span>
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
                  {shortLabels[1]}
                  <span className="required-symbol">*</span>
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
            className="cart-page-submit-button"
            type="submit"
            value="Place order"
          />
        </div>
      </form>
    </div>
  );
};
