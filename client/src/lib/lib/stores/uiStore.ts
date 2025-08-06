import { makeAutoObservable } from "mobx";

export default class uiStore {
    isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    isBusy(){
        this.isLoading = true;
    }

    isIdle(){
        this.isLoading = true;
    }
}
