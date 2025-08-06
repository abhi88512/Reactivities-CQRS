import { createContext } from "react";
import uiStore from "./uiStore";

interface Store {
    uiStore: uiStore
}

export const store : Store ={
    uiStore: new uiStore()
}

export const StoreContext = createContext(store);