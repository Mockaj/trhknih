import { randomId } from "@mantine/hooks";
import { atom } from "recoil";

export type SellBookItem = {
    id: string;
  }
  
export const sellBookListAtom = atom<SellBookItem[]>({
    key: "sellBookList",
    default: [{ id: randomId() }]
});
