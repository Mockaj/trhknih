import { Link } from "react-router-dom";
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
  return (
    <>
      <Link to={`/books/${id}`} className="result-item">
        <span>{`${bookName}${subtitleText}`}</span>
        <span className="search-result__price">{`${price} €`}</span>
      </Link>
    </>
  );
};
