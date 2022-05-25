import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  return (
    <div className="searchbar-container">
      <form>
        <input placeholder="Search a book..." className="searchbar__input" />
        <FaSearch className="react-icons fix-to-search" />
        <div className="green-background" />
      </form>
    </div>
  );
};
export default SearchBar;
