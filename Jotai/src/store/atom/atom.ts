import axios from "axios";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const counterAtom = atom<number>(0);

export const doubleCounterAtom = atom<number>((get) => get(counterAtom) * 2);

const userDetails = atom(async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users/1"
  );
  return response.data;
});

export const loadableUserAtom = loadable(userDetails);

interface Item {
    itemName : string;
    price : number;
}

type ArrayofItem = Array<Item>

export const cartAtom = atom<ArrayofItem>([]);
export const totalAtom = atom((get) =>
  get(cartAtom).reduce((total, item) => total + item.price, 0)
);
