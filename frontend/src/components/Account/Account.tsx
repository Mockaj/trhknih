import { useEffect, useState } from "react";
import "./styles/account.css";
import { AiOutlineSetting } from "react-icons/ai";
import { RenderContent } from "./RenderContent";
import { useAuth0 } from "@auth0/auth0-react";
import { toast, ToastContainer } from "react-toast";
import axios from "axios";

export const Account = () => {
  const [content, setContent] = useState("account");
  const handleChange = (event: any) => {
    setContent(event.target.value);
  };
  const isChecked = (value: string) => {
    if (value === content) {
      return "account-navbar__label account-navbar__label--checked";
    } else {
      return "account-navbar__label";
    }
  };
  const { getAccessTokenSilently, user } = useAuth0()
  useEffect(() => {
    getAccessTokenSilently()
  .then((token) => {
    axios
    .post(`http://localhost:4000/api/users`,
    {id: user?.sub},
    {headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${token}`,
    }})
    .catch(() => {
    })
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
    toast.error("You cannot view your profile right now, try it again later")
  });
  }, [])
  
  

  return (
    <div className="account-content">
      <div className="account-navbar-container">
        <div className="wrapper">
          <nav className="account-navbar">
            <label className={isChecked("account")} htmlFor="account">
              <input
                type="radio"
                id="account"
                className="faq-nav__input"
                name="content"
                value="account"
                checked={content === "account"}
                onChange={handleChange}
              ></input>
              <span>Account</span>
            </label>
            <label className={isChecked("offers")} htmlFor="offers">
              <input
                type="radio"
                id="offers"
                className="faq-nav__input"
                name="content"
                value="offers"
                checked={content === "offers"}
                onChange={handleChange}
              />
              Offers
            </label>
            <label className={isChecked("orders")} htmlFor="orders">
              <input
                type="radio"
                id="orders"
                className="faq-nav__input"
                name="content"
                value="orders"
                checked={content === "orders"}
                onChange={handleChange}
              />
              Orders
            </label>
            <label className={isChecked("password")} htmlFor="password">
              <input
                type="radio"
                id="password"
                className="faq-nav__input"
                name="content"
                value="password"
                checked={content === "password"}
                onChange={handleChange}
              />
              Change password
            </label>

            <label className={isChecked("edit")} htmlFor="edit">
              <input
                type="radio"
                id="edit"
                className="faq-nav__input"
                name="content"
                value="edit"
                checked={content === "edit"}
                onChange={handleChange}
              />
              Edit Account
              <AiOutlineSetting size={24} style={{ marginLeft: 5 }} />
            </label>
          </nav>
        </div>
      </div>
      <RenderContent content={content} setContent={setContent} />
      <ToastContainer delay={6000} />
    </div>
    );
};
