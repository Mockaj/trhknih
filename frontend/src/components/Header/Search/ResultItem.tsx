import { Link } from "react-router-dom";
interface ResultItemProps {
  bookName: string;
  subtitle?: string;
  id: string;
}
export const ResultItem = ({ bookName, subtitle, id }: ResultItemProps) => {
  const subtitleText = subtitle !== null ? `: ${subtitle}` : "";
  return (
    <>
      <Link
        to={`/books/${id}`}
        className="result-item"
      >{`${bookName}${subtitleText}`}</Link>
    </>
  );
};
