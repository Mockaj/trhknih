import ReadeePicture from "../../../../assets/ReadeeLogo.png";
export type ReadeeLogoProps = {
  onAction: () => void;
};
export const ReadeeLogo = ({ onAction }: ReadeeLogoProps) => {
  return (
    <a onClick={onAction}>
      <img src={ReadeePicture} className="readee-logo" />
    </a>
  );
};
export default ReadeeLogo;
