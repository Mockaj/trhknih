import axios from "axios";
import { useEffect, useState } from "react";
import "./search.css";
import { ResultItem } from "./ResultItem";
interface SearchProps {
  searchBarContent: string;
}
export const Search = ({ searchBarContent }: SearchProps) => {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    getOffers();
  }, [searchBarContent]);

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
  console.log(offers, searchBarContent);
  if (searchBarContent.length > 0) {
    return (
      <div className="search-results">
        {offers.map((offer) => {
          return (
            <ResultItem
              bookName={offer.book.title}
              subtitle={offer.book.subtitle}
              id={offer.id}
            />
          );
        })}
      </div>
    );
  } else {
    return <></>;
  }
};
export default Search;
