import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  return (
    <div className="searchbar-container">
      <form>
        <input
          placeholder="Search by book, author or ISBN..."
          className="searchbar__input"
        />
        <button className="search-btn fix-to-search">
          <FaSearch className="react-icons" />
        </button>
        <div className="green-background" />
      </form>
    </div>
  );
};
export default SearchBar;
