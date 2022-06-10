import axios from "axios";
import { useState, useEffect } from "react";
import { BookPreviewProps } from "../BookPreview/BookPreview";
import { BasePageContent } from "./BasePageContent";
import "./BasePage.css";
import { useDocumentTitle } from "@mantine/hooks";

export const BasePage = () => {
  useDocumentTitle("Readee - recycle books");

  const [bestsellers, setBestsellers] = useState<BookPreviewProps[]>()
  const [newlyAdded, setNewlyAdded] = useState<BookPreviewProps[]>()
  const [freeBooks, setFreeBooks] = useState<BookPreviewProps[]>()

  useEffect(() => {
    getBestsellers();
    getNewlyAdded();
    getFreeBooks();
  }, []);

  const getBestsellers = () => {
    axios.get(`http://localhost:4000/api/offers?bestsellers=true`)
    .then((response) => {
      const data = response.data;
      const books: BookPreviewProps[] = data.data.offers.slice(0, 5).map((offer) => { 
        return({
          id: offer.id,
          image: offer.book.photo,
          name: offer.book.title,
          authors: offer.book.fromAutors.map((author) => {return(author.author.name)}),
          price: offer.price
        })
      })
      setBestsellers(books);
    })
    .catch(error => console.log(`Error: ${error}`)); // <-- change this
  }

  const getNewlyAdded = () => {
    axios.get(`http://localhost:4000/api/offers?newlyAdded=true`)
    .then((response) => {
      const data = response.data;
      const books: BookPreviewProps[] = data.data.offers.slice(0, 5).map((offer) => { 
        return({
          id: offer.id,
          image: offer.book.photo,
          name: offer.book.title,
          authors: offer.book.fromAutors.map((author) => {return(author.author.name)}),
          price: offer.price
        })
      })
      setNewlyAdded(books);
    })
    .catch(error => console.log(`Error: ${error}`)); // <-- change this
  }

  const getFreeBooks = () => {
    axios.get(`http://localhost:4000/api/offers?freeBooks=true`)
    .then((response) => {
      const data = response.data;
      const books: BookPreviewProps[] = data.data.offers.slice(0, 5).map((offer) => { 
        return({
          id: offer.id,
          image: offer.book.photo,
          name: offer.book.title,
          authors: offer.book.fromAutors.map((author) => {return(author.author.name)}),
          price: offer.price
        })
      })
      setFreeBooks(books);
    })
    .catch(error => console.log(`Error: ${error}`)); // <-- change this
  }
  
  return(
    <BasePageContent 
      bestsellers={bestsellers}
      newlyAdded={newlyAdded}
      freeBooks={freeBooks}
    />
  )
}