import "../styles/accountContent.css";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInputAccount {
  email: string;
  firstName: string;
  lastName: string;
}
interface AccountContentProps {
  disabled?: boolean;
}

export const AccountContent = ({ disabled = true }: AccountContentProps) => {
  const accountDetails = {
    firstName: "Alan",
    lastName: "Turing",
    email: "alan@turing.com",
  };
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<IFormInputAccount>();
  const onSubmitAccount: SubmitHandler<IFormInputAccount> = (data) => {
    console.log(data), console.log("POST REQUEST");
  };
  const submitButtonContainer = disabled
    ? "submit-button-container--disabled"
    : "submit-button-container--editable";

  return (
    <div className="account-content-container">
      <div className="personal-info-container">
        <h3> Personal info</h3>
        <div className="delivery-form-container">
          <form
            className="address__form account__form"
            onSubmit={handleSubmit(onSubmitAccount)}
          >
            <ul className="address__form-items">
              <li className="form-item">
                <label className="label">First name</label>
                <input
                  className={`address__text-field ${
                    !errors.firstName ? "text-field--error" : ""
                  }`}
                  defaultValue={accountDetails.firstName}
                  disabled={disabled}
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
                <label className="label">Last name</label>
                <input
                  className={`address__text-field ${
                    !errors.lastName ? "text-field--error" : ""
                  }`}
                  defaultValue={accountDetails.lastName}
                  disabled={disabled}
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
                <label className="label">Email</label>
                <input
                  className={`address__text-field ${
                    !errors.email ? "text-field--error" : ""
                  }`}
                  defaultValue={accountDetails.email}
                  disabled={disabled}
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
            </ul>
            <div className={submitButtonContainer}>
              <input type="submit" className="submit-button" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
