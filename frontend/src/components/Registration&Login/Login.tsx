import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

interface IFormInput {
  nameOrEmail: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data),
    console.log("POST REQUEST")
  }

  return (
    <div className="registration">
      <h1 className="page-header">Log in</h1>
      <form className="registration__form" onSubmit={handleSubmit(onSubmit)}>
        <ul className="registration__form-items">
          <li className="form-item">
            <label className="label">Username or email</label>
            <input
            className={`registration__text-field ${errors.nameOrEmail && "text-field--error"}`}
            placeholder="username or email"
            {...register("nameOrEmail", { required: true, minLength: 3, maxLength: 100 })}
          />
          <p className={`registration__error ${!errors.nameOrEmail ? "registration__error--hide" : ""}`}>
            {errors.nameOrEmail && errors.nameOrEmail.type === "required" && "Enter username or email"}
            {errors.nameOrEmail && (errors.nameOrEmail.type === "minLength" || errors.nameOrEmail.type === "maxLength") && "Enter username or email"}
            .
          </p>
          </li>

          <li className="form-item">
            <label className="label">Password</label>
            <input
              className={`registration__text-field ${errors.password && "text-field--error"}`}
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
        </ul>
        <div className="buttons-wrapper">
          <input className="submit-button-round submit-button-round--green" type="submit" value="Login" />
          <Link to="/register">
            <button className="submit-button-round">Register</button>
          </Link>
        </div>
      </form>
    </div>
  )

}