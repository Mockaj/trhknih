import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BasePage } from "./BasePage/BasePage";
import { Error404 } from "./error/error404";
import { MainPage } from "./MainPage";
import { Faq } from "./FAQ/faq";
import { Cart } from "./Cart/Cart";
import { SellBook } from "./SellBook/SellBook";
import { RecoilRoot } from "recoil";
import { BookInfo } from "./BookInfo/BookInfo";
import { Categories } from "./categories/Categories";
import { Account } from "./Account/Account";
import { useAuth0 } from "@auth0/auth0-react";
import { SpinnerInfinity } from 'spinners-react';

export const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  if (isLoading){
    return (<div className="loading-wrapper loading-wrapper--big"><SpinnerInfinity size={120} thickness={100} speed={100} color="rgba(57, 172, 96, 1)" secondaryColor="rgba(255, 255, 255, 1)" /></div>)
  }
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage Content={<BasePage />} />} />
          {isAuthenticated && <Route path="/cart" element={<MainPage Content={<Cart />} />} />}
          <Route
            path="/faq"
            element={<MainPage Content={<Faq />} />}
          />
          {isAuthenticated && <Route
            path="/sell-a-book"
            element={<MainPage Content={<SellBook />} />}
          />}
          <Route
            path="/books/:id"
            element={<MainPage Content={<BookInfo />} />}
          />
          <Route
            path="/categories/:category/:page"
            element={<MainPage Content={<Categories />} />}
          />
          {isAuthenticated && <Route path="/account" element={<MainPage Content={<Account />} />} />}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};
