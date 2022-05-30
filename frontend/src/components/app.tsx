import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error404 } from "./error/error404";
import { MainPage } from "./MainPage";
import { Isbn } from "./isbn/isbn";
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/isbn" element={<Isbn />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};
