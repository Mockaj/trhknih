import { BookPreview } from "../BookPreview";

export const BookPreviewExample = () => {
  const name = "Mistborn: The Final Empire"
  const author = "Brandon Sanderson"
  const price = 14.99
  const image = "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/5750/9780575089914.jpg"

  const name2 = "The Lion King"
  const author2 = "Justine Korman"
  const price2 = 20
  const image2 = "https://images-na.ssl-images-amazon.com/images/I/51Q0R48W6PL._SX335_BO1,204,203,200_.jpg"

  const name3 = "An Ember in the Ashes"
  const author3 = "Sabaa Tahir"
  const price3 = 0
  const image3 = "https://www.knihydobrovsky.cz/thumbs/book-detail/mod_eshop/produkty/a/an-ember-in-the-ashes-9780008108427.jpg"
  return (
    <>
    <BookPreview id={1} image={image} name={name} author={author} price={price} />
    <BookPreview id={2} image={image2} name={name2} author={author2} price={price2} />
    <BookPreview id={3} image={image3} name={name3} author={author3} price={price3} />
    </>
  )
}