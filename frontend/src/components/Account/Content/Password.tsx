import "../styles/accountContent.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import { toast, ToastContainer } from "react-toast";
import axios from "axios";

interface IFormInputPassword {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}
interface AccountContentProps {
  disabled?: boolean;
}

export const Password = ({ disabled = true }: AccountContentProps) => {
  const { getAccessTokenSilently, user} = useAuth0()
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<IFormInputPassword>();
  const onSubmitAccount: SubmitHandler<IFormInputPassword> = (data) => {
    console.log(data), console.log("POST REQUEST");
    if (data.newPassword == data.newPasswordConfirm){
      getAccessTokenSilently()
      .then((token) => {
        axios
          .put(`http://localhost:4000/api/users/${user?.sub}`,
          {password: data.newPassword},
          {headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`,
          }})
          .then(() => {
            toast.success("Your password was succesfully created");
          })
          .catch((error) => {
            console.log(`Error: ${error}`);
            toast.error("Your data change failed, try it again later");  
          });
          
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
        toast.error("You cannot change your profile right now, try it again later")
      });
    } else {
      toast.error("Your passwords weren't same");  
    }
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
      <ToastContainer delay={6000} />
    </div>
  );
};
