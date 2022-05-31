import { FaSearch, FaBars } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { BiBookAdd, BiUser } from "react-icons/bi";
import ReadeeLogo from "./ReadeeLogo";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import "./styles/topbar.css";

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
  const onClickSearch = () => {
    setShowSearch(!showSearch);
    setShowMenu(false);
    console.log(showMenu);
  };
  const onClickMenu = () => {
    setShowMenu(!showMenu);
    setShowSearch(false);
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
                <FaSearch onClick={onClickSearch} />
              </li>
              <Link to="/">
                <li>
                  <FiShoppingCart />
                </li>
              </Link>
              <li>
                <FaBars onClick={onClickMenu} />
              </li>
            </ul>
          </div>
          <div className="mobile-menu" style={{ display: showMobMenu }}>
            <ul className="mobile-menu__list">
              <Link to="/login">
                <li>My account</li>
              </Link>
              <Link to="/">
                <li>Categories</li>
              </Link>

              <Link to="/">
                <li>Buy a book</li>
              </Link>
              <Link to="/">
                <li>Sell a book</li>
              </Link>
              <Link to="/">
                <li>How to sell a book</li>
              </Link>
              <Link to="/">
                <li>Contact</li>
              </Link>
            </ul>
          </div>
          <div className="search--mobile" style={{ display: showSearchMenu }}>
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
              <Link to="/">
                <li>
                  <BiBookAdd size={iconSize} className="react-icons" />
                  &nbsp;Sell a book
                </li>
              </Link>
              <Link to="/login">
                <li>
                  <BiUser size={iconSize} className="react-icons" />
                  &nbsp;Account
                </li>
              </Link>
              <Link to="/">
                <li>
                  <FiShoppingCart size={iconSize} className="react-icons" />
                  &nbsp;&nbsp;Cart
                </li>
              </Link>
            </ul>
          </div>
          <hr />
          <div className="lowerbar-container">
            <ul className="lowerbar__list">
              <Link to="/">
                <li>Categories</li>
              </Link>
              <Link to="/">
                <li>What is ISBN</li>
              </Link>
              <Link to="/">
                <li>How to sell a book</li>
              </Link>
              <Link to="/">
                <li>Free books</li>
              </Link>
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
