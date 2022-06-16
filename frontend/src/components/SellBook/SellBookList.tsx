import React, { useState } from "react";
import { ToastContainer, toast } from "react-toast";
// import SellBookItem from "./Models/SellBookItem";

import { useRecoilState, useRecoilValue } from "recoil";
import { sellBookListAtom } from "./State/Atom";
import { useForm } from "react-hook-form";
import { IFormInput } from "./Models/IFormInput";
import NewBook from "./State/NewBook";
import SellBookLine from "./SellBookLine";
import { useAuth0 } from "@auth0/auth0-react";
import { getBookByISBN } from "../../resources/isbnApi";
import { Book } from "../../resources/types/book";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { useMantineEmotionOptions } from "@mantine/styles/lib/theme/MantineProvider";

const getBooks = async (data: IFormInput) => {
  let responses: Book[] = []

  await Promise.all(data.books.map(async ({ISBN}) => {
    // null already checked with validation
    const val = await getBookByISBN(ISBN)
    if (val !== null) {
      responses.push(val)
    }
  }))
  
  return (responses);
}

export default function SellBookList() {
  const { getAccessTokenSilently, user } = useAuth0()
  const [SellBooks, setSellBookList] = useRecoilState(sellBookListAtom);

  const useFormRet = useForm<IFormInput>({
    defaultValues: {books: [{ ISBN: "", price: undefined, note: "" }]}
    }
  );
  const nav = useNavigate();
  const { handleSubmit } = useFormRet

  const onSubmit = async (data: IFormInput) => {
    const responses = await getBooks(data)

    console.log("books:", data.books.length, data.books)
    console.log("responses", responses.length, responses)
    const offers = data.books.map((book, index) => {
      return {
        isbn: book.ISBN,
        bookCondition: book.note,
        price: book.price, 
        userId: user?.sub, 
        book: {
        authors: responses[index].authors,
        cover: responses[index].cover,
        key: responses[index].key,
        notes: responses[index].notes,
        number_of_pages: responses[index].number_of_pages,
        publish_date: responses[index].publish_date,
        publish_places: responses[index].publish_places,
        publishers: responses[index].publishers,
        subjects: responses[index].subjects,
        subtitle: responses[index].subtitle,
        title: responses[index].title,
        url: responses[index].url,
      }}
    })
    getAccessTokenSilently()
    .then((token) => {
      console.log(token);
      console.log(offers);
      axios
      .post(`http://localhost:4000/api/offers`,
      offers,
      {headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      }})
      .then(() => {
         toast.success("Your offers was succesfully created");
         setTimeout(() => {
          nav("/", {replace: true});
        }, 6000)
        }
      )
      .catch((error) => {
        console.log(`Error: ${error}`);
        toast.error("Offers creation failed. Try it again.");
      })
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
      toast.error("You cannot sell book right now, try it again later")
    });
    
  }

  return (
    <>
    <form  className="sell-book__form" onSubmit={handleSubmit(onSubmit)}>
      <ul>
      {SellBooks.map((item, index) => (
          <SellBookLine index={index} useFormRet={useFormRet} key={item.id} />
      ))}
      </ul>
      <div className="sell-book__buttons">
        <input className="sell-book__smaller-button submit-button-round submit-button-round--green" type="submit" value="Submit" onSubmit={(data) => {console.log(data)}} />
        <NewBook />
      </div>
    </form>
    <ToastContainer delay={6000}/>
  </>
  )
}
