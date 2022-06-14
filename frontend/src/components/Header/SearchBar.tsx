import { FaSearch } from "react-icons/fa";
import { Search } from "./Search/Search";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { showSearchAtom } from "../../states/atoms/showSearchAtom";
interface SearchBarProps {
  placeholder?: string;
  data?: string;
  onClick: Function;
}

export const SearchBar = ({
  placeholder = "Search by book, author, ISBN...",
  onClick,
}: SearchBarProps) => {
  const [searchBarContent, setSearchBarContent] = useState("");
  const location = useLocation();

  const clearSearch = () => {
    setSearchBarContent("");
    document.getElementById("searchBarInput").value = "";
  };

  useEffect(() => {
    clearSearch();
  }, [location]);
  const [showSearch, setShowSearch] = useRecoilState(showSearchAtom);
  return (
    <div className="searchbar-container">
      <form className="searchbar__form searchbar__flex-column">
        <div className="searchbar__input-button-wrapper">
          <input
            placeholder={placeholder}
            className="searchbar__input"
            type="search"
            onChange={(e) => setSearchBarContent(e.target.value)}
            id="searchBarInput"
          />
          <Link
            to={`/search?searchBarContent=${searchBarContent}`}
            className="search-btn fix-to-search"
            onClick={() => setShowSearch(false)}
          >
            <FaSearch className="react-icons" id="searchButton" />
          </Link>
          <Search searchBarContent={searchBarContent} />
        </div>
      </form>
    </div>
  );
};
export default SearchBar;
