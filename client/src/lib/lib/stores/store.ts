import { createContext } from "react";
import uiStore from "./uiStore";
import { ActivityStore } from "./activityStore";

interface Store {
    uiStore: uiStore
    activityStore: ActivityStore
}

export const store: Store = {
    uiStore: new uiStore(),
    activityStore: new ActivityStore()
}



export const StoreContext = createContext(store);