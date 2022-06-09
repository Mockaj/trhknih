import axios from "axios";
import { useState, useEffect } from "react";
import { BookPreviewProps } from "../BookPreview/BookPreview";
import { BasePageContent } from "./BasePageContent";
import "./BasePage.css";

export const BasePage = () => {
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
          author: offer.book.fromAutors.map((author) => {return(author.author.name)}),
          price: offer.price
        })
      })
      console.log("pre", data.data.offers)
      console.log("books", books)
      setBestsellers(books);
    })
    .catch(error => console.log(`Error: ${error}`));
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
          author: offer.book.fromAutors.map((author) => {return(author.author.name)}),
          price: offer.price
        })
      })
      console.log("pre", data.data.offers)
      console.log("books", books)
      setNewlyAdded(books);
    })
    .catch(error => console.log(`Error: ${error}`));
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
          author: offer.book.fromAutors.map((author) => {return(author.author.name)}),
          price: offer.price
        })
      })
      console.log("pre", data.data.offers)
      console.log("books", books)
      setFreeBooks(books);
    })
    .catch(error => console.log(`Error: ${error}`));
  }
  
  return(
    <BasePageContent 
      bestsellers={bestsellers}
      newlyAdded={newlyAdded}
      freeBooks={freeBooks}
    />
  )
}