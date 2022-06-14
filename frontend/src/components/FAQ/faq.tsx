import "./styles/faq.css";
import { useState, useEffect } from "react";
import { accordion } from "./accordion";
import { useDocumentTitle } from "@mantine/hooks";
import { useLocation } from "react-router-dom";

export const Faq = () => {
  useDocumentTitle("FAQ \u00B7 Readee - recycle books")
  const query = new URLSearchParams(useLocation().search);
  const topic = query.get("topic") || "faq";
  const [questions, setQuestions] = useState(topic);
  useEffect(() => {
    setQuestions(topic)
  }, [topic])
  const handleChange = (event: any) => {
    setQuestions(event.target.value);
  };
  const isChecked = (value: string) => {
    if (value === questions) {
      return "faq-nav__label faq-nav__label--checked";
    } else {
      return "faq-nav__label";
    }
  };
  return (
    <div className="accordion-container">
      <div className="wrapper">
        <div className="heading-container">
          <h1 className="heading">Frequently asked questions</h1>
        </div>
        <div className="faq-nav">
          <label className={isChecked("faq")} htmlFor="faq">
            <input
              type="radio"
              id="faq"
              className="faq-nav__input"
              name="questions"
              value="faq"
              checked={questions === "faq"}
              onChange={handleChange}
            ></input>
            General questions
          </label>
          <label className={isChecked("isbn")} htmlFor="isbn">
            <input
              type="radio"
              id="isbn"
              className="faq-nav__input"
              name="questions"
              value="isbn"
              checked={questions === "isbn"}
              onChange={handleChange}
            />
            What is ISBN
          </label>
          <label className={isChecked("sell")} htmlFor="sell">
            <input
              type="radio"
              id="sell"
              className="faq-nav__input"
              name="questions"
              value="sell"
              checked={questions === "sell"}
              onChange={handleChange}
            />
            How to sell a book
          </label>
        </div>
        {accordion(questions, setQuestions)}
      </div>
    </div>
  );
};
