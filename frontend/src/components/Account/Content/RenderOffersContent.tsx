import { OffersOverview } from "./OffersOverview";
import { OffersDelivery } from "./OffersDelivery";
interface AccountContentProps {
  content: string;
  setContent: Function;
}

export const RenderOffersContent = ({
  content,
  setContent,
}: AccountContentProps) => {
  switch (content) {
    case "overview":
      return <OffersOverview />;
    case "sent":
      return <OffersDelivery />;
    default:
      return <p>Bad request</p>;
  }
};
