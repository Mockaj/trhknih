import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error404 } from "./error/error404";
import { MainPage } from "./MainPage";
import { Faq } from "./FAQ/faq";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage Content={<div />} />} />
        <Route
          path="/faq"
          element={<MainPage Content={<Faq topic="faq" />} />}
        />
        <Route
          path="/how-to-sell-a-book"
          element={<MainPage Content={<Faq topic="sell" />} />}
        />
        <Route
          path="/what-is-isbn"
          element={<MainPage Content={<Faq topic="isbn" />} />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};
