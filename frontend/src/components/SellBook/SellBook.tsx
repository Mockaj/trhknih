import { useDocumentTitle } from "@mantine/hooks";
import "./SellBook.css"
import SellBookList from "./SellBookList";


export const SellBook = () => {
  useDocumentTitle("Sell a book \u00B7 Readee - recycle books")
  return (
    <div className="sell-book">
      <h1>Sell your books</h1>
        <SellBookList />
    </div>
  )
}