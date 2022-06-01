import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  placeholder?: string;
}

export const SearchBar = ({
  placeholder = "Search by book, author, ISBN...",
}: SearchBarProps) => {
  return (
    <div className="searchbar-container">
      <form className="searchbar__form">
        <input
          placeholder={placeholder}
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
