import { atom, createStore } from "jotai";
import { User } from "../interfaces/GlobalTypes";

export const myStore = createStore();

const userAtom = atom<User | null>(null);
myStore.set(userAtom, null);

export default userAtom;
