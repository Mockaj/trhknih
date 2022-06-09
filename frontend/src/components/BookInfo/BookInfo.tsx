import { useDocumentTitle } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookContent } from "./BookContent";
import "./BookInfo.css"


export const BookInfo = () => {
  useDocumentTitle("Book Info \u00B7 Readee - recycle books")
  const params = useParams()

  const [data, setData] = useState()
  // params.id
  const id = "802e22be-7094-4165-8996-dfa7c9f2c7cd"
  const url = `http://localhost:4000/api/offers/${params.id}`

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(`${url}`)
    .then((response) => {
      const data = response.data;
      setData(data);
    })
    .catch(error => console.log(`Error: ${error}`));
  }

  return(
    <BookContent data={data} />
  )
}
