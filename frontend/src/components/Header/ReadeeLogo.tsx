import ReadeePicture from "../../assets/ReadeeLogo.png";
import { Link } from "react-router-dom";
export type ReadeeLogoProps = {
  onAction: () => void;
};
export const ReadeeLogo = ({ onAction }: ReadeeLogoProps) => {
  return (
    <Link to="/" onClick={onAction}>
      <img src={ReadeePicture} className="readee-logo" />
    </Link>
  );
};
export default ReadeeLogo;
