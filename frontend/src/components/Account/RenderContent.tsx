import { AccountContent } from "./Content/AccountContent";
import { OffersContent } from "./Content/OffersContent";
import { Orders } from "./Content/Orders";
import { Password } from "./Content/Password";
interface AccountContentProps {
  content: string;
  setContent: Function;
}

export const RenderContent = ({ content, setContent }: AccountContentProps) => {
  switch (content) {
    case "account":
      return <AccountContent />;
    case "offers":
      return <OffersContent />;
    case "orders":
      return <Orders />;
    case "password":
      return <Password disabled={false} />;
    case "edit":
      return <AccountContent disabled={false} />;
    default:
      return <p>Bad request</p>;
  }
};
