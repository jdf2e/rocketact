import {
  observable,
  computed,
  action,
  runInAction,
  extendObservable,
  entries,
  set
} from "mobx";

export interface IGlobalLoadingStore {
  text: string;
  show: (text: string) => void;
  hide: () => void;
}

const store = observable({
  text: "",
  show(text: string) {
    this.text = text;
  },
  hide() {
    this.text = "";
  }
} as IGlobalLoadingStore);

export default store;
