import { useState } from "react";
import "./styles/account.css";
import { AiOutlineSetting } from "react-icons/ai";
import { RenderContent } from "./RenderContent";

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
  return (
    <>
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
              Account
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
            <label className={isChecked("reviews")} htmlFor="reviews">
              <input
                type="radio"
                id="reviews"
                className="faq-nav__input"
                name="content"
                value="reviews"
                checked={content === "reviews"}
                onChange={handleChange}
              />
              Reviews
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
    </>
  );
};
