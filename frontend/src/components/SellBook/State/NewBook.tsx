import { randomId } from "@mantine/hooks";
import { useSetRecoilState } from "recoil";
import { sellBookListAtom } from "../State/Atom"

export default function NewBook() {
  const setSellBookList = useSetRecoilState(sellBookListAtom);

  const addBook = () => {
    const newBookObj = { id: randomId() };
    setSellBookList((sellBooks) => [...sellBooks, newBookObj]);
  }
    return (
        <button type="button" className="sell-book__smaller-button submit-button-round" onClick={() => addBook()}>Add&nbsp;another</button>
    )
}