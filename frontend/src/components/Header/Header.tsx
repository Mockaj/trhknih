import { FaSearch, FaBars } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { BiBookAdd, BiUser } from "react-icons/bi";
import ReadeeLogo from "./ReadeeLogo";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const iconSize: number = 30;
export const Header = () => {
  const getWindowDimensions = () => {
    const { innerWidth: width } = window;
    return width;
  };

  const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  };

  const width = useWindowDimensions();
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const showMobMenu = showMenu ? "" : "none";
  const showSearchMenu = showSearch ? "" : "none";
  const onClick = () => {
    setShowSearch(false);
    setShowMenu(false);
  };
  if (width < 1038) {
    // Return mobile version of header
    return (
      <>
        <nav className="navbar">
          <div className="upperbar-container">
            <ReadeeLogo onAction={onClick} />
            <ul className="upperbar--list">
              <li>
                <FaSearch onClick={() => setShowSearch(!showSearch)} />
              </li>
              <li>
                <FiShoppingCart />
              </li>
              <li>
                <FaBars onClick={() => setShowMenu(!showMenu)} />
              </li>
            </ul>
          </div>
          <div className="mobile-menu" style={{ display: showMobMenu }}>
            <ul className="mobile-menu__list">
              <li>My account</li>
              <li>Categories</li>
              <li>Buy a book</li>
              <li>Sell a book</li>
              <li>How to sell a book</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="search__mobile" style={{ display: showSearchMenu }}>
            <SearchBar />
          </div>
        </nav>
      </>
    );
  } else {
    // Return desktop version of header
    return (
      <>
        <nav className="navbar">
          <div className="upperbar-container">
            <ReadeeLogo onAction={onClick} />
            <ul className="upperbar--list">
              <li>
                <BiBookAdd size={iconSize} className="react-icons" />
                &nbsp;Sell a book
              </li>
              <li>
                <BiUser size={iconSize} className="react-icons" />
                &nbsp;Account
              </li>
              <li>
                <FiShoppingCart size={iconSize} className="react-icons" />
                &nbsp;&nbsp;Cart
              </li>
            </ul>
          </div>
          <hr />
          <div className="lowerbar-container">
            <ul className="lowerbar__list">
              <li>Categories</li>
              <li>What is ISBN</li>
              <li>How to sell a book</li>
              <li>Free books</li>
              <li>
                <SearchBar />
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
};
