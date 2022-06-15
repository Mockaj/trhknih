import { atom } from "recoil";

export const showSearchAtom = atom<boolean>({
  key: "showSearch",
  default: false,
});
