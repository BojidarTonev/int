import React, { useEffect, useContext, useCallback } from "react";
import { appContext, AppStore, Person } from "./store/AppStore";
import { observer } from "mobx-react";
import { PersonCard } from "./components/person-card/person-card";
import { SearchBar } from "./components/search-bar/search-bar";
import { Pagination } from "./components/pagination/pagination";
import { Loader } from "./components/loader/loader";
import axios from "axios";
import "./assets/site.css";
import "./App.css";

export const App = observer(() => {
  const store: AppStore = useContext(appContext);

  const renderData = () => {
    if (store.error) {
      return;
    }
    const entities = store.displayData.slice(
      store.offSet,
      store.offSet + store.entitiesPerPage
    );
    store.setPageCount(store.displayData.length);

    store.isLoading = false;
    return entities.map((pd: Person) => (
      <PersonCard
        uuid={pd.uuid}
        company={pd.company}
        name={pd.name}
        bio={pd.bio}
        avatar={pd.avatar}
        title={pd.title}
        label={pd.label || ""}
        color={pd.color || "255, 255, 255"}
      />
    ));
  };

  const initData = useCallback(async () => {
    const res: any = await axios.get("/list");
    if (res.data.message) {
      store.setError(res.data.message);
      return;
    }
    store.setError("");
    store.setData(res.data);
    store.removeFilter();
  }, [store]);

  useEffect(() => {
    store.isLoading = true;
    if (store && store.data.length === 0) {
      initData();
    } else {
      store.removeFilter();
    }
    if (store.hardRefresh) {
      initData();
      store.hardRefresh = false;
    }
  }, [store, store.hardRefresh, initData]);

  return (
    <div className="App">
      <SearchBar />
      {store.error ? (
        <>{store.isLoading ? <Loader /> : store.error}</>
      ) : (
        <>
          {store.isLoading ? <Loader /> : renderData()}
          {!store.isLoading && <Pagination />}
        </>
      )}
    </div>
  );
});
