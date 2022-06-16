import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BasePage } from "./BasePage/BasePage";
import { Error404 } from "./error/error404";
import { MainPage } from "./MainPage";
import { Login } from "./Registration&Login/Login";
import { Registration } from "./Registration&Login/Registration";
import { Faq } from "./FAQ/faq";
import { Cart } from "./Cart/Cart";
import { SellBook } from "./SellBook/SellBook";
import { RecoilRoot } from "recoil";
import { BookInfo } from "./BookInfo/BookInfo";
import { Categories } from "./categories/Categories";
import { Account } from "./Account/Account";
import { ResultsPage } from "./Header/Search/ResultsPage";
import { useAuth0 } from "@auth0/auth0-react";
export const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  if (isLoading){
    return (<div></div>)
  }
  if (!isAuthenticated) {
    return (
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage Content={<BasePage />} />} />
            <Route
              path="/faq"
              element={<MainPage Content={<Faq />} />}
            />
            <Route
              path="/books/:id"
              element={<MainPage Content={<BookInfo />} />}
            />
            <Route
              path="/categories/:category/:page"
              element={<MainPage Content={<Categories />} />}
            />
            <Route
              path="/search"
              element={<MainPage Content={<ResultsPage />} />}
            />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    )
  }
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage Content={<BasePage />} />} />
          <Route path="/cart" element={<MainPage Content={<Cart />} />} />
          <Route
            path="/faq"
            element={<MainPage Content={<Faq />} />}
          />
          <Route
            path="/sell-a-book"
            element={<MainPage Content={<SellBook />} />}
          />
          <Route
            path="/books/:id"
            element={<MainPage Content={<BookInfo />} />}
          />
          <Route
            path="/categories/:category/:page"
            element={<MainPage Content={<Categories />} />}
          />
          <Route path="/account" element={<MainPage Content={<Account />} />} />
          <Route
            path="/search"
            element={<MainPage Content={<ResultsPage />} />}
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};
