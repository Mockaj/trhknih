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
}

export const SearchBar = ({
  placeholder = "Search by book, author, ISBN...",
}: SearchBarProps) => {
  const [searchBarContent, setSearchBarContent] = useState("");
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
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
            onClick={() => setDisplaySearchResults(true)}
            onBlur={() => setDisplaySearchResults(false)}
            id="searchBarInput"
          />

          <Link
            to={`/categories/bestsellers/1?search=${searchBarContent}`}
            className="search-btn fix-to-search"
            onClick={() => setShowSearch(false)}
          >
            <FaSearch className="react-icons" id="searchButton" />
          </Link>
        </div>

        <Search searchBarContent={searchBarContent} />
      </form>
    </div>
  );
};
export default SearchBar;
