import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error404 } from "./error/error404";
import { MainPage } from "./MainPage";
import { Login } from "./Registration&Login/Login";
import { Registration } from "./Registration&Login/Registration";


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage Content={<div />} />} />
        <Route path="/register" element={<MainPage Content={<Registration />} />} />
        <Route path="/login" element={<MainPage Content={<Login />} />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};
