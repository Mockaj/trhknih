import "../../Cart/styles/cart.css";
import "../styles/accountContent.css";
import "../styles/offersContent.css";
import { BookPreviewProps } from "../../BookPreview/BookPreview";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toast";
import { AcceptedOffer } from "./AcceptedOffer";
import { useState } from "react";
import { RenderOffersContent } from "./RenderOffersContent";
export const OffersContent = () => {
  const [content, setContent] = useState("overview");
  const handleChange = (event: any) => {
    setContent(event.target.value);
  };
  const isChecked = (value: string) => {
    if (value === content) {
      return "account-navbar__label offers-navbar__label account-navbar__label--checked";
    } else {
      return "account-navbar__label offers-navbar__label";
    }
  };
  return (
    <>
      <nav className="account-navbar offers-navbar">
        <label className={isChecked("overview")} htmlFor="overview">
          <input
            type="radio"
            id="overview"
            className="faq-nav__input"
            name="content"
            value="overview"
            checked={content === "overview"}
            onChange={handleChange}
          ></input>
          Overview
        </label>
        <label className={isChecked("sent")} htmlFor="sent">
          <input
            type="radio"
            id="sent"
            className="faq-nav__input"
            name="content"
            value="sent"
            checked={content === "sent"}
            onChange={handleChange}
          />
          Sent books
        </label>
      </nav>

      <RenderOffersContent content={content} setContent={setContent} />
    </>
  );
};
