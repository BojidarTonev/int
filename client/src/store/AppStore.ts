import { createContext } from "react";
import { observable, action, } from "mobx";
import { create, persist } from "mobx-persist";

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});

export interface Person {
  uuid: string;
  company: string;
  name: string;
  avatar: string;
  title: string;
  color: string;
  label: string;
  bio: string;
}

export class AppStore {
  @persist("list") @observable data: Person[] = [];
  @observable isLoading: boolean = true;
  @observable forceRerender: boolean = true;

  @action
  setData = (data: Person[]) => {
    this.data = data;
    this.isLoading = false;
  };

  @action
  findById = (uuid: string) => {
    const person = this.data.find((item: Person) => item.uuid === uuid);
    if (person) return person;
  };
  @action toggleRender = () => {
    this.forceRerender = !this.forceRerender;
  };
  @action
  updatePersonById = (uuid: string, label: string, color: string) => {
    let copyArr = [...this.data];
    const person = this.findById(uuid);
    if (person) {
      const index = this.data.indexOf(person);
      const personCopy = { ...person, label, color };
      copyArr[index] = personCopy;
      this.setData(copyArr);
    }
  };
}

const appStore = new AppStore();
hydrate('list', appStore)
export const appContext = createContext(appStore);
