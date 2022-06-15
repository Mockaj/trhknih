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
  const url = `http://localhost:4000/api/offers/${params.id}`;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(`${url}`)
    .then((response) => {
      const data = response.data;
      axios.get(`http://localhost:4000/api/users/${data.data.seller.id}/info`)
      .then((res) => {
        const username = res.data.data.username;
        console.log(username);
        setData({...data, username});
      }).catch(error => console.log(`Error: ${error}`));
      
    })
    .catch(error => console.log(`Error: ${error}`));
  }

  return(
    <BookContent data={data} />
  )
}
