import axios from "axios";
import { Book } from "../types/book";

export const getBookByISBN = async (isbn: string): Promise<Book> => {
  const result = await axios.get(`http://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`);
  const book: Book = result.data[`ISBN:${isbn}`];
  return book;
};