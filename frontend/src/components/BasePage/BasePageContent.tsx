import { Link } from "react-router-dom"
import { width as getWidth } from "../widthCalculator"
import { BookShowcase, MobileBookShowcase } from "./BookShowcase"
import image1 from "../../assets/basePage/image1.png";
import image2 from "../../assets/basePage/image2.png";
import { useAuth0 } from "@auth0/auth0-react";
import { SpinnerInfinity } from 'spinners-react';

export const BasePageContent = (props) => {
  if (props) {
    const bestSellers = props.bestsellers;
    const freeBooks = props.freeBooks;
    const newlyAdded = props.newlyAdded;
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    if (getWidth() < 900) {
      // Return mobile version
      return (
        <div className="basepage-wrapper">
          <div className="buy-books-wrapper">
            <div className="big-text-wrapper">
              <h1 className="big-text">
                <span className="big-text--green">Buy</span> and{" "}
                <span className="big-text--green">sell</span> books
              </h1>

              <ul className="buttons">
                {isAuthenticated &&
                  <li className="list-button">
                    <Link to="/sell-a-book" className="green-button">
                      Sell Books
                    </Link>
                  </li>
                }
                <li className="list-button">
                  <Link to="/categories/newlyAdded/1" className="green-button">
                    Newly Added
                  </Link>
                </li>
                <li className="list-button">
                  <Link to="/categories/bestsellers/1" className="green-button">
                    Bestsellers
                  </Link>
                </li>
                <li className="list-button">
                  <Link to="/categories/freeBooks/1" className="green-button">
                    Free Books
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="basepage__category">
            <h2>Bestsellers</h2>
            <Link
              to="/categories/bestsellers/1"
              className="green-button green-button--smaller"
            >
              Show More
            </Link>
          </div>
          {bestSellers ? <MobileBookShowcase props={bestSellers} /> : 
          <div><SpinnerInfinity size={50} thickness={100} speed={100} color="rgba(57, 172, 96, 1)" secondaryColor="rgba(255, 255, 255, 1)" /></div>}

          <div className="basepage__category">
            <h2>Free Books</h2>
            <Link
              to="/categories/freeBooks/1"
              className="green-button green-button--smaller"
            >
              Show More
            </Link>
          </div>
          {freeBooks ? <MobileBookShowcase props={freeBooks} /> : 
          <div><SpinnerInfinity size={50} thickness={100} speed={100} color="rgba(57, 172, 96, 1)" secondaryColor="rgba(255, 255, 255, 1)" /></div>}


          <div className="basepage__category">
            <h2>Newly Added</h2>
            <Link
              to="/categories/newlyAdded/1"
              className="green-button green-button--smaller"
            >
              Show More
            </Link>
          </div>
          {newlyAdded ? <MobileBookShowcase props={newlyAdded} /> : 
          <div><SpinnerInfinity size={50} thickness={100} speed={100} color="rgba(57, 172, 96, 1)" secondaryColor="rgba(255, 255, 255, 1)" /></div>}

        </div>
      );
    } else {
      // Return desktop version

      return (
        <div className="basepage-wrapper">
          <div className="sell-books-wrapper">
            <div className="big-text-wrapper">
              <h1 className="big-text">
                Put your old <span className="big-text--green">books</span>
                <br />
                into <span className="big-text--green">circulation</span>
              </h1>
              {isAuthenticated ?
                <Link to="/sell-a-book" className="green-button">
                  Sell books
                </Link> :
                <span className="green-button" onClick={() => loginWithRedirect()}>
                  Sell books
                </span>
              }
            </div>
            <img src={image1} alt="" />
          </div>
          <div className="buy-books-wrapper">
            <img src={image2} alt="" />
            <div className="big-text-wrapper">
              <h1 className="big-text">
                Save <span className="big-text--green">money</span> and
                <br />
                <span className="big-text--green">environment</span>
              </h1>
              <Link to="/categories/bestsellers/1" className="green-button">
                Buy books
              </Link>
            </div>
          </div>

          <div className="basepage__category">
            <h2>Bestsellers</h2>
            <Link
              to="/categories/bestsellers/1"
              className="green-button green-button--smaller"
            >
              Show More
            </Link>
          </div>
          {bestSellers ? <BookShowcase props={bestSellers} /> : 
          <div><SpinnerInfinity size={50} thickness={100} speed={100} color="rgba(57, 172, 96, 1)" secondaryColor="rgba(255, 255, 255, 1)" /></div>}

          <div className="basepage__category">
            <h2>Free Books</h2>
            <Link
              to="/categories/freeBooks/1"
              className="green-button green-button--smaller"
            >
              Show More
            </Link>
          </div>
          {freeBooks ? <BookShowcase props={freeBooks} /> : 
          <div><SpinnerInfinity size={50} thickness={100} speed={100} color="rgba(57, 172, 96, 1)" secondaryColor="rgba(255, 255, 255, 1)" /></div>}

          <div className="basepage__category">
            <h2>Newly Added</h2>
            <Link
              to="/categories/newlyAdded/1"
              className="green-button green-button--smaller"
            >
              Show More
            </Link>
          </div>
          {newlyAdded ? <BookShowcase props={newlyAdded} /> : 
          <div><SpinnerInfinity size={50} thickness={100} speed={100} color="rgba(57, 172, 96, 1)" secondaryColor="rgba(255, 255, 255, 1)" /></div>}

        </div>
      )
    }
  } else {
    return (
      <div className="loading-wrapper"><SpinnerInfinity size={100} thickness={100} speed={100} color="rgba(57, 172, 96, 1)" secondaryColor="rgba(255, 255, 255, 1)" /></div>
    )
  }
}
