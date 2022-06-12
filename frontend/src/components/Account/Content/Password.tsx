import "../styles/accountContent.css";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInputPassword {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}
interface AccountContentProps {
  disabled?: boolean;
}

export const Password = ({ disabled = true }: AccountContentProps) => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<IFormInputPassword>();
  const onSubmitAccount: SubmitHandler<IFormInputPassword> = (data) => {
    console.log(data), console.log("POST REQUEST");
  };
  const submitButtonContainer = disabled
    ? "submit-button-container--disabled"
    : "submit-button-container--editable";

  return (
    <div className="account-content-container">
      <div className="personal-info-container">
        <div className="delivery-form-container">
          <form
            className="address__form account__form"
            onSubmit={handleSubmit(onSubmitAccount)}
          >
            <ul className="address__form-items">
              <li className="form-item">
                <label className="label">Current password</label>
                <input
                  type="password"
                  className={`address__text-field ${
                    !errors.currentPassword ? "text-field--error" : ""
                  }`}
                  disabled={disabled}
                  {...register("currentPassword", {
                    required: true,
                    minLength: 2,
                    maxLength: 30,
                  })}
                />
                <p
                  className={`registration__error ${
                    !errors.currentPassword ? "registration__error--hide" : ""
                  }`}
                >
                  {/*TODO: Check if password match current password */}
                  {errors.currentPassword &&
                    errors.currentPassword.type === "required" &&
                    "Current password is required"}
                  .
                </p>
              </li>
              <li className="form-item">
                <label className="label">New password</label>
                <input
                  type="password"
                  className={`address__text-field ${
                    !errors.newPassword ? "text-field--error" : ""
                  }`}
                  disabled={disabled}
                  {...register("newPassword", {
                    required: true,
                    minLength: 2,
                    maxLength: 30,
                  })}
                />
                <p
                  className={`registration__error ${
                    !errors.newPassword ? "registration__error--hide" : ""
                  }`}
                >
                  {errors.newPassword &&
                    errors.newPassword.type === "required" &&
                    "New password is required"}
                  {errors.newPassword &&
                    errors.newPassword.type === "minLength" &&
                    "New password must be at least 2 characters long"}
                  {errors.newPassword &&
                    errors.newPassword.type === "maxLength" &&
                    "New password maximum length is 30 characters"}
                  .
                </p>
              </li>

              <li className="form-item">
                <label className="label">Confirm new password</label>
                <input
                  type="password"
                  className={`address__text-field ${
                    !errors.newPasswordConfirm ? "text-field--error" : ""
                  }`}
                  disabled={disabled}
                  {...register("newPasswordConfirm", {
                    required: true,
                  })}
                />
                <p
                  className={`registration__error ${
                    !errors.newPasswordConfirm
                      ? "registration__error--hide"
                      : ""
                  }`}
                >
                  {/* TODO: Check if newPassword and newPasswordConfirm match */}
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
