import { Footer } from "./footer/footer";
import { Header } from "./Header/Header";
import "./mainpage.css"

export const MainPage = () => {
  return (
    <div className="flex-wrapper">
      <header className="header-container"><Header /></header>
      <main className="content-container"></main>
      <footer className="footer-container"><Footer /></footer> 
    </div>
  );
};
