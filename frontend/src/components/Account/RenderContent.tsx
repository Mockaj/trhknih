import { AccountContent } from "./Content/AccountContent";
import { OffersContent } from "./Content/OffersContent";
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
      return <p>orders</p>;
    case "reviews":
      return <p>reviews</p>;
    case "edit":
      return <AccountContent disabled={false} />;
    default:
      return <p>Bad request</p>;
  }
};
