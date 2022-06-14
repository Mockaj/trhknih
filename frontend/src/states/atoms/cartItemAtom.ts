import { atom } from "recoil";

export type CartItem = {
  id: string;
  image: string;
  title: string;
  language: string;
  price: number;
};

export const cartItemListAtom = atom<CartItem[]>({
  key: "cartItemList",
  default: [],
});
