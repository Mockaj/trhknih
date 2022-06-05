import "../styles/accountContent.css";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  email: string;
  firstName: string;
  lastName: string;
}

export const AccountContent = () => {
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
    <div className="account-content-container">
      <div className="personal-info-container">
        <h3> Personal info</h3>
        <div className="delivery-form-container">
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
            </ul>
          </form>
        </div>
      </div>
      <div className="password-container">
        <h3> Password</h3>
      </div>
    </div>
  );
};
