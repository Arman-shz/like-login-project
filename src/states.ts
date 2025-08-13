import { atom } from "recoil";

export const userAtom = atom<{ firstName: string; lastName: string; phone: string } | null>({
  key: "userAtom",
  default: null,
});

export const likeCountAtom = atom<number>({
  key: "likeCountAtom",
  default: 0,
});
