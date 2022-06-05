import { UseFormReturn } from "react-hook-form";
import { useRecoilState } from "recoil";
import { IFormInput } from "./Models/IFormInput";
import { sellBookListAtom } from "./State/Atom";
import { ErrorMessage } from "@hookform/error-message";
import { getBookByISBN } from "../../resources/isbnApi";
import { MdDelete } from "react-icons/md";

interface SellBookLineProps {
  index: number;
  useFormRet: UseFormReturn<IFormInput, any>
}

const checkISBN = async (ISBN: string) => {
    const val = await getBookByISBN(ISBN)
    return (val !== null)
  }


export default function SellBookLine({ index, useFormRet }: SellBookLineProps) {
  const [sellBookList, setSellBookList] = useRecoilState(sellBookListAtom)
  
  const {
    register,
    getValues,
    setValue,
    formState: { errors }
  } = useFormRet

  const deleteClickEvent = () => {
    let sellBooks = [...sellBookList]
    sellBooks.splice(index, 1)
    setSellBookList(sellBooks)

    // unregister does weird stuff when used on value in array
    let books = getValues("books")
    books.splice(index, 1)
    setValue("books", books)

  };

  return (
    <li className="sell-book__item">
      <div className="sell-book__wrapper">
        <div className="mobile-oneline">
          <div className="sell-book__label-input-wrapper">
            <label className="sell-book__label">ISBN<span className="sell-book__label--red">*</span></label>
            <div className="sell-book__input-wrapper">
              <input
                type="text"
                className={`text-field`}
                placeholder="9780575089938"
                {...register(`books.${index}.ISBN`, { 
                  required:  true, 
                  minLength: 10,
                  maxLength: 13,
                  pattern: /^[0-9]*$/,
                  validate: {
                    invalidISBN: async (v) => await checkISBN(v)
                  }
                })}
              />
              <p className={`sell-book__error ${errors.books && errors.books[index] && !errors.books[index].ISBN ? "sell-book__error--hide" : ""}`}>
                {errors.books && errors.books[index] && errors.books[index].ISBN?.type === "required" && "Enter ISBN"}
                {errors.books && errors.books[index] && errors.books[index].ISBN?.type === "minLength" && "Invalid ISBN"}
                {errors.books && errors.books[index] && errors.books[index].ISBN?.type === "maxLength" && "Invalid ISBN"}
                {errors.books && errors.books[index] && errors.books[index].ISBN?.type === "pattern" && "Enter only numbers"}
                {errors.books && errors.books[index] && errors.books[index].ISBN?.type === "invalidISBN" && "Book does not exist"}
                &nbsp;
              </p>
            </div>
          </div>
          
          <div className="sell-book__label-input-wrapper">
            <label className="sell-book__label">price&nbsp;(€)<span className="sell-book__label--red">*</span></label>
            <div className="sell-book__input-wrapper">
              <input type="number" min="0.0" step={0.01}
                className={`text-field text-field--price ${errors.books && errors.books[index] && errors.books[index].price && "text-field--error"}`}
                placeholder="10.9"
                {...register(`books.${index}.price`, { 
                  required: true,
                  valueAsNumber: true,
                })}
              />
              <p className={`sell-book__error ${errors.books && errors.books[index] && !errors.books[index].price ? "sell-book__error--hide" : ""}`}>
                {errors.books && errors.books[index] && errors.books[index].price?.type === "required" && "Enter price"}
                {errors.books && errors.books[index] && errors.books[index].price?.type === "valueAsNumber" && "only numbers are allowed"}
                &nbsp;
              </p>
            </div>
          </div>
        </div>

        <div className="mobile-oneline sell-book__input-item">
          <div className="sell-book__label-input-wrapper sell-book__input-item">
            <label className="sell-book__label">note</label>
            <div className="sell-book__input-wrapper sell-book__input-wrapper--textarea">
              <textarea
                className="text-field text-field--textarea"
                placeholder="e.g. slightly damaged edges"
                {...register(`books.${index}.note`, { required: false, maxLength: {value: 2000, message: "maximum length is 2000 characters"} })}
              />
              <p className={`sell-book__error ${errors.books && errors.books[index] && !errors.books[index].note ? "sell-book__error--hide" : ""}`}>
                {errors.books && errors.books[index] && errors.books[index].note?.type === "maxLength" && "maximum length is 2000 characters"}
                &nbsp;
              </p>
            </div>
          </div>

          <div className="button-wrapper">
            <button type="button" className={`button-remove ${index === 0 && "list-top-item"}`} onClick={deleteClickEvent}><MdDelete />&nbsp;Remove</button>
            <p className="sell-book__error">&nbsp;</p>
          </div>
        </div>
      </div>
    </li>
  )
}