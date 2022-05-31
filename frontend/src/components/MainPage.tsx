import { Footer } from "./footer/footer";
import { Header } from "./Header/Header";
import "./mainpage.css";
import { RecoilRoot } from "recoil";
interface ContentProps {
  Content: React.ReactNode;
}

export const MainPage = ({ Content }: ContentProps) => {
  return (
    <div className="flex-wrapper">
      {" "}
      <RecoilRoot>
        <header className="header-container">
          <Header />
        </header>
        <main className="content-container">{Content}</main>
      </RecoilRoot>
      <footer className="footer-container">
        <Footer />
      </footer>
    </div>
  );
};
