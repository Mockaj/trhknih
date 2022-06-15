import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { showSearchAtom } from "../../../states/atoms/showSearchAtom";
interface ResultItemProps {
  bookName: string;
  subtitle?: string;
  id: string;
  price: number;
}
export const ResultItem = ({
  bookName,
  subtitle,
  id,
  price,
}: ResultItemProps) => {
  const subtitleText = subtitle !== null ? `: ${subtitle}` : "";
  const [showSearch, setShowSearch] = useRecoilState(showSearchAtom);
  return (
    <>
      <Link
        to={`/books/${id}`}
        className="result-item"
        onClick={() => {
          setShowSearch(false);
        }}
      >
        {`${bookName}${subtitleText}`}{" "}
      </Link>
    </>
  );
};
