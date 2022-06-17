import "../styles/accountContent.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { SpinnerInfinity } from "spinners-react";

interface IFormInputAccount {
  email: string;
  username: string;
}
interface AccountContentProps {
  disabled?: boolean;
}

export const AccountContent = ({ disabled = true }: AccountContentProps) => {
  const { getAccessTokenSilently, user } = useAuth0()
  const [accountDetails, setAccountDetails] = useState();
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      getAccountDetails();
      setRefresh(false);
    }

  }, [refresh]);

  const getAccountDetails = () => {
    getAccessTokenSilently()
      .then((token) => {
        axios
          .get(`http://localhost:4000/api/users/${user?.sub}`,
            {
              headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`,
              }
            })
          .then((response) => {
            setAccountDetails({
              ...response.data.data.auth
            });
          })
          .catch((error) => {
            console.log(`Error: ${error}`);
            toast.error("You cannot see your profile right now, try it again later");
          });
      })
  };

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<IFormInputAccount>();
  const onSubmitAccount: SubmitHandler<IFormInputAccount> = (data) => {
    console.log(data), console.log("POST REQUEST");
    getAccessTokenSilently()
      .then((token) => {
        axios
          .put(`http://localhost:4000/api/users/${user?.sub}`,
            { "username": data.username },
            {
              headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`,
              }
            })
          .then(() => {
            axios
              .put(`http://localhost:4000/api/users/${user?.sub}`,
                { "email": data.email },
                {
                  headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`,
                  }
                })
              .then(() => {
                toast.success("Your data were succesfully created");
                setRefresh(true);
              })
              .catch((error) => {
                console.log(`Error: ${error}`);
                toast.error("Your email change failed, but username succeded. Try it again later")
                setRefresh(true);
              });

          })
          .catch((error) => {
            console.log(`Error: ${error}`);
            toast.error("Your data change failed, try it again later")
          });

      })
      .catch((error) => {
        console.log(`Error: ${error}`);
        toast.error("You cannot change your profile right now, try it again later")
      });

  };
  const submitButtonContainer = disabled
    ? "submit-button-container--disabled"
    : "submit-button-container--editable";

  return (
    <div className="account-content-container">
      {accountDetails ?
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
                    className={`address__text-field ${!errors.username ? "text-field--error" : ""
                      }`}
                    defaultValue={accountDetails?.username}
                    disabled={disabled}
                    {...register("username", {
                      required: true,
                      minLength: 3,
                      maxLength: 20,
                    })}
                  />
                  <p
                    className={`registration__error ${!errors.username ? "registration__error--hide" : ""
                      }`}
                  >
                    {errors.username &&
                      errors.username.type === "required" &&
                      "New username is required"}
                    {errors.username &&
                      errors.username.type === "minLength" &&
                      "Username must be at least 3 characters long"}
                    {errors.username &&
                      errors.username.type === "maxLength" &&
                      "Username maximum length is 20 characters"}
                    .
                  </p>
                </li>

                <li className="form-item">
                  <label className="label">Email</label>
                  <input
                    className={`address__text-field ${!errors.email ? "text-field--error" : ""
                      }`}
                    defaultValue={accountDetails?.email}
                    disabled={disabled}
                    type="email"
                    {...register("email", {
                      required: true,
                    })}
                  />
                  <p
                    className={`registration__error ${!errors.email ? "registration__error--hide" : ""
                      }`}
                  >
                    New valid email is required.
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
        </div> :
        <div className="loading-wrapper loading-wrapper--small"><SpinnerInfinity size={75} thickness={100} speed={100} color="rgba(57, 172, 96, 1)" secondaryColor="rgba(255, 255, 255, 1)" /></div>}
    </div>
  );
};
