import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error404 } from "./error/error404";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error404></Error404>} />
      </Routes>
    </BrowserRouter>
  );
}