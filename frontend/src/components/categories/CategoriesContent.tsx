import { useState } from "react"
import { BookPreview } from "../BookPreview/BookPreview"
import { CategoriesBooks } from "./CategoriesBooks"
import { CategoriesSidebar } from "./CategoriesSidebar"
import { PageChoice } from "./PageChoice";
import { SpinnerInfinity } from 'spinners-react';

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
        <div className="loading-wrapper"><SpinnerInfinity size={100} thickness={100} speed={100} color="rgba(57, 172, 96, 1)" secondaryColor="rgba(255, 255, 255, 1)" /></div>
      )
    }
  }
  return(
    <>
      {CategoriesPage(props)}
    </>
  )
}