import { Footer } from "./footer/footer";
import { Header } from "./Header/Header";
import "./mainpage.css";

interface ContentProps {
  Content: React.ReactNode;
}

export const MainPage = ({ Content }: ContentProps) => {
  return (
    <div className="main-page__flex-wrapper">
      <header className="main-page__header-container">
        <Header />
      </header>
      <main className="main-page__content-container">{Content}</main>
      <footer className="main-page__footer-container">
        <Footer />
      </footer>
    </div>
  );
};
