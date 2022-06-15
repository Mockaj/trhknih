import { useDocumentTitle } from "@mantine/hooks";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { BookPreviewProps } from "../BookPreview/BookPreview";
import { CategoriesContent } from "./CategoriesContent";
import "./styles/categories.css";

interface ITags {
  label: string,
  value: string
}

export const Categories = () => {
  useDocumentTitle("Readee - recycle books");
  const params = useParams()
  const query = useLocation()

  const [filteredBooks, setFilteredBooks] = useState<BookPreviewProps[]>()
  const [tags, setTags] = useState([])
  const [numOfPages, setNumOfPages] = useState<number>(1)

  const [selected, setSelected] = useState<ITags[]>([]);

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    getBooks();
  }, [query.pathname, query.search]);

  const getTags = () => {
    axios.get(`http://localhost:4000/api/tags`)
    .then((response) => {
      const tags = response.data.data
      setTags(tags);
    })
  }

  const queryParams = new URLSearchParams(query.search);
  
  const getBooks = () => {
    axios.get(`http://localhost:4000/api/offers?${params.category}=true&page=${params.page}&tags=${queryParams.get("tags")}&search=${queryParams.get("search")}`)
    .then((response) => {
      const data = response.data;
      const books: BookPreviewProps[] = data.data.offers.map((offer) => { 
        return({
          id: offer.id,
          image: offer.book.photo,
          name: offer.book.title,
          authors: offer.book.fromAutors.map((author) => {return(author.author.name)}),
          price: offer.price
        })
      })
      setNumOfPages(data.data.pages)
      setFilteredBooks(books);
    })
    .catch(error => console.log(`Error: ${error}`));
  }

  return(
    <CategoriesContent books={filteredBooks} tags={tags} pages={numOfPages} selected={selected} setSelected={setSelected} />
  )
}