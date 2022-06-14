import { BookPreview } from "../../BookPreview/BookPreview";
import { BookPreviewProps } from "../../BookPreview/BookPreview";
import { BookShowcase } from "../../BasePage/BookShowcase";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export const ResultsPage = () => {
  const search = useLocation().search;
  const searchBarContent = new URLSearchParams(search).get("searchBarContent");
  const [offers, setOffers] = useState([]);
  const getOffers = () => {
    axios
      .get(
        `http://localhost:4000/api/offers?isbn=${searchBarContent}&author=${searchBarContent}&bookName=${searchBarContent}`
      )
      .then((response) => {
        const offers = response.data.data.offers;
        setOffers(offers);
      });
  };
  useEffect(() => {
    getOffers();
  }, [searchBarContent]);
  return (
    <div className="search-results-container">
      <h2>Search results for term: {searchBarContent}</h2>
      {/* <BookShowcase props={offers} /> */}
    </div>
  );
};
