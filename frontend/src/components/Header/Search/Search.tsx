import axios from "axios";
import { useEffect, useState } from "react";
import "./search.css";
import { ResultItem } from "./ResultItem";
interface SearchProps {
  searchBarContent: string;
  style: string;
}
export const Search = ({ searchBarContent, style }: SearchProps) => {
  const [offers, setOffers] = useState<any[]>([]);
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
};
export default Search;
