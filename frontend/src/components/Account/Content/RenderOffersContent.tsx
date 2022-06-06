import { Overview } from "./Overview";
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
      return <Overview />;
    case "sent":
      return <OffersDelivery />;
    default:
      return <p>Bad reqquest</p>;
  }
};
