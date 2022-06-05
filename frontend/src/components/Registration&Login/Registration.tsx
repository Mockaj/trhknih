import { useForm, SubmitHandler } from "react-hook-form";
import "./RegistrationLogin.css"

interface IFormInput {
  username: string;
  email: string;
  password: string;
  cpassword: string;
}

export const Registration = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data),
    console.log("POST REQUEST")
  }

  return (
    <div className="registration">
      <h1 className="page-header">Register</h1>
      <form className="registration__form" onSubmit={handleSubmit(onSubmit)}>
        <ul className="registration__form-items">
          <li className="form-item">
            <label className="label">Username</label>
            <input
              className={`registration__text-field ${!errors.username ? "text-field--error" : ""}`}
              placeholder="username"
              {...register("username", { required: true, minLength: 3, maxLength: 30 })}
            />
            <p className={`registration__error ${!errors.username ? "registration__error--hide" : ""}`}>
              {errors.username && errors.username.type === "required" && "Username is required"}
              {errors.username && errors.username.type === "minLength" && "Username must be at least three characters long"}
              {errors.username && errors.username.type === "maxLength" && "Username maximum length is 30 characters"}
              .
            </p>
          </li>

          <li className="form-item">
            <label className="label">Email</label>
            <input
              className={`registration__text-field ${!errors.email ? "text-field--error" : ""}`}
              type="email"
              placeholder="your@email.com"
              {...register("email", { required: true })}
            />
            <p className={`registration__error ${!errors.email ? "registration__error--hide" : ""}`}>Valid email is required.</p>
          </li>

          <li className="form-item">
            <label className="label">Password</label>
            <input
              className={`registration__text-field ${!errors.password ? "text-field--error" : ""}`}
              placeholder="password"
              type="password"
              {...register("password", { required: true, minLength: 5, maxLength: 100 })}
            />
            <p className={`registration__error ${!errors.password ? "registration__error--hide" : ""}`}>
              {errors.password && errors.password.type === "required" && "Password is required"}
              {errors.password && errors.password.type === "minLength" && "Password must be at least five characters long"}
              {errors.password && errors.password.type === "maxLength" && "Password maximum length is 100 characters"}
              .
            </p>
          </li>

          <li className="form-item">
            <label className="label">Confirm Password</label>
            <input
              className={`registration__text-field ${!errors.cpassword ? "text-field--error" : ""}`}
              placeholder="repeat password"
              type="password"
              {...register("cpassword", { 
                required: true,
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return "PasswordMismatch"
                  }
                } 
              })}
            />
            <p className={`registration__error ${!errors.cpassword ? "registration__error--hide" : ""}`}>
              Passwords do not match
            </p>
          </li>
        </ul>

       <input className="submit-button-round submit-button-round--green" type="submit" value="Register" />
      </form>
    </div>
  )
}