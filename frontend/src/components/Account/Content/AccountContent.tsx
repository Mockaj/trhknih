import "../styles/accountContent.css";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInputAccount {
  email: string;
  username: string;
}
interface AccountContentProps {
  disabled?: boolean;
}

export const AccountContent = ({ disabled = true }: AccountContentProps) => {
  const accountDetails = {
    username: "AlanTuring",
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
                <label className="label">Username</label>
                <input
                  className={`address__text-field ${
                    !errors.username ? "text-field--error" : ""
                  }`}
                  defaultValue={accountDetails.username}
                  disabled={disabled}
                  {...register("username", {
                    required: true,
                    minLength: 2,
                    maxLength: 30,
                  })}
                />
                <p
                  className={`registration__error ${
                    !errors.username ? "registration__error--hide" : ""
                  }`}
                >
                  {errors.username &&
                    errors.username.type === "required" &&
                    "First name is required"}
                  {errors.username &&
                    errors.username.type === "minLength" &&
                    "First name must be at least 2 characters long"}
                  {errors.username &&
                    errors.username.type === "maxLength" &&
                    "First name maximum length is 30 characters"}
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
              <input
                type="submit"
                className="account-submit-button"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
