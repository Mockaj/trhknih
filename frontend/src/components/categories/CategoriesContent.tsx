import { useState } from "react"
import { BookPreview } from "../BookPreview/BookPreview"
import { CategoriesBooks } from "./CategoriesBooks"
import { CategoriesSidebar } from "./CategoriesSidebar"
import { PageChoice } from "./PageChoice"

export const CategoriesContent = (props) => {
  const CategoriesPage = (props) => {
    if ((props.books || (props.books && props.books.length === 0)) && props.tags) {
      const {books, tags, pages, selected, setSelected} = props
      const options = tags.map((tag) => ({ ["label"]: tag, ["value"]: tag}))
  
      return (
        <div className="categories-flex-wrap">
          <CategoriesSidebar options={options} selected={selected} setSelected={setSelected}/>
          <CategoriesBooks books={books} pages={pages}/>
        </div>
      );
    } else {
      return (
        <h1>Loading</h1>
      )
    }
  }
  return(
    <>
      {CategoriesPage(props)}
    </>
  )
}