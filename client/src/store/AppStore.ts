import { createContext } from "react";
import { observable, action } from "mobx";
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
  @observable displayData: Person[] = [];
  @observable filter: string = "";
  @observable isLoading: boolean = true;
  @observable pageCount: number = 1;
  @observable entitiesPerPage: number = 20;
  @observable offSet: number = 0;
  @observable currentPage: number = 0;
  @observable hardRefresh: boolean = false;
  @observable error: string = "";

  @action
  setData = (data: Person[]) => {
    this.data = data;
    this.isLoading = false;
  };

  @action
  setFilter = (filterString: string) => (this.filter = filterString);
  @action
  setPageCount = () => {
    this.pageCount = Math.ceil(this.data.length / this.entitiesPerPage);
  };
  @action
  setOffset = (number: number) => (this.offSet = number);
  @action
  setCurrentPage = (number: number) => (this.currentPage = number);

  @action
  applyFilter = () => {
    if (!this.filter) {
      this.displayData = this.data;
      return;
    }
    const filteredData = this.data.filter((el) => el.label === this.filter);
    this.displayData = filteredData;
  };
  @action
  removeFilter = () => {
    this.filter = "";
    this.displayData = this.data;
    this.isLoading = false;
  };

  @action
  findById = (uuid: string) => {
    const person = this.data.find((item: Person) => item.uuid === uuid);
    if (person) return person;
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
      this.removeFilter();
    }
  };

  @action
  setupHardRefresh = () => {
    this.hardRefresh = !this.hardRefresh;
  };

  @action
  setError = (errorText: string) => (this.error = errorText);
}

const appStore = new AppStore();
hydrate("list", appStore);
export const appContext = createContext(appStore);
