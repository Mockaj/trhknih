import React, { useState } from "react";

// import SellBookItem from "./Models/SellBookItem";

import { useRecoilState, useRecoilValue } from "recoil";
import { sellBookListAtom } from "./State/Atom";
import { useForm } from "react-hook-form";
import { IFormInput } from "./Models/IFormInput";
import NewBook from "./State/NewBook";
import SellBookLine from "./SellBookLine";

import { getBookByISBN } from "../../resources/isbnApi";
import { Book } from "../../resources/types/book";


const getBooks = (data: IFormInput) => {
  let responses: Book[] = []

  data.books.map(async ({ISBN}) => {
    // null already checked with validation
    const val = await getBookByISBN(ISBN)
    if (val !== null) {
      responses.push(val)
    }
  })

  return (responses);
}

export default function SellBookList() {
  const [SellBooks, setSellBookList] = useRecoilState(sellBookListAtom);

  const useFormRet = useForm<IFormInput>({
    defaultValues: {books: [{ ISBN: "", price: undefined, note: "" }]}
    }
  );
  
  const { handleSubmit } = useFormRet

  const onSubmit = async (data: IFormInput) => {
    const responses = getBooks(data)

    console.log("books:", data.books.length, data.books)
    console.log("responses", responses.length, responses)
    console.log("POST REQUEST")
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
        <input className="sell-book__smaller-button submit-button submit-button--green" type="submit" value="Submit" onSubmit={(data) => {console.log(data)}} />
        <NewBook />
      </div>
    </form>

  </>
  )
}
