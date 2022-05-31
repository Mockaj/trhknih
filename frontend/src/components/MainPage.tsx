import { Footer } from "./footer/footer";
import { Header } from "./Header/Header";
import "./mainpage.css";
import { RecoilRoot } from "recoil";
interface ContentProps {
  Content: React.ReactNode;
}

interface ContentProps {
  Content: React.ReactNode,
}

export const MainPage = ({Content}: ContentProps) => {
  return (
    <div className="flex-wrapper">
      <header className="header-container"><Header /></header>
      <main className="content-container">{Content}</main>
      <footer className="footer-container"><Footer /></footer> 
    </div>
  );
};
