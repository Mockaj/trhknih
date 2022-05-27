import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  return (
    <div className="searchbar-container">
      <form className="searchbar__form">
        <input
          placeholder="Search by book, author or ISBN..."
          className="searchbar__input"
          type="search"
        />
        <button className="search-btn fix-to-search">
          <FaSearch className="react-icons" />
        </button>
      </form>
    </div>
  );
};
export default SearchBar;
