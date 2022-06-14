import { FaSearch, FaBars } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { BiBookAdd, BiUser } from "react-icons/bi";
import ReadeeLogo from "./ReadeeLogo";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import "./styles/topbar.css";
import { useRecoilState } from "recoil";
import { showSearchAtom } from "../../states/atoms/showSearchAtom";

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
  const [showSearch, setShowSearch] = useRecoilState(showSearchAtom);
  const showMobMenu = showMenu ? "" : "none";
  const showSearchMenu = showSearch ? "" : "none";
  const onClick = () => {
    setShowSearch(false);
    setShowMenu(false);
  };
  const onClickSearch = () => {
    setShowSearch(!showSearch);
    setShowMenu(false);
  };
  const onClickMenu = () => {
    setShowMenu(!showMenu);
    setShowSearch(false);
  };
  if (width < 600) {
    // Return mobile version of header
    return (
      <>
        <nav className="navbar">
          <div className="upperbar-container">
            <ReadeeLogo onAction={onClick} />
            <ul className="upperbar__list">
              <li>
                <FaSearch onClick={onClickSearch} />
              </li>
              <Link to="/cart" onClick={onClick}>
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
              <Link to="/login" onClick={onClickMenu}>
                <li>My account</li>
              </Link>
              <Link to="/categories/bestsellers/1" onClick={onClickMenu}>
                <li>Categories</li>
              </Link>

              <Link to="/categories/freeBooks/1" onClick={onClickMenu}>
                <li>Buy a book</li>
              </Link>
              <Link to="/sell-a-book" onClick={onClickMenu}>
                <li>Sell a book</li>
              </Link>
              <Link to="/how-to-sell-a-book" onClick={onClickMenu}>
                <li>How to sell a book</li>
              </Link>
            </ul>
          </div>
          <div className="search--mobile" style={{ display: showSearchMenu }}>
            <SearchBar onClick={onClick} />
          </div>
        </nav>
      </>
    );
  } else {
    const placeholderText =
      width < 800 ? "Search..." : "Search by book, author, ISBN...";
    // Return desktop version of header
    return (
      <>
        <nav className="navbar">
          <div className="upperbar-container">
            <ReadeeLogo onAction={onClick} />
            <ul className="upperbar__list">
              <Link to="/sell-a-book">
                <li>
                  <BiBookAdd size={iconSize} className="react-icons" />
                  &nbsp;Sell a book
                </li>
              </Link>
              <Link to="/account">
                <li>
                  <BiUser size={iconSize} className="react-icons" />
                  &nbsp;Account
                </li>
              </Link>
              <Link to="/cart">
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
              <Link to="/categories/bestsellers/1">
                <li>Categories</li>
              </Link>
              <Link to="/what-is-isbn">
                <li>What is ISBN</li>
              </Link>
              <Link to="/how-to-sell-a-book">
                <li>How to sell a book</li>
              </Link>
              <Link to="/categories/freeBooks/1">
                <li>Free books</li>
              </Link>
              <li className="search-bar">
                <SearchBar placeholder={placeholderText} />
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
};
