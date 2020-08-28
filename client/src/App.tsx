import React, { useEffect, useState, useCallback, useContext } from "react";
import { PersonCard } from "./components/person-card/person-card";
import axios from "axios";
import { appContext, AppStore, Person } from "./store/AppStore";
import "./assets/site.css"
import "./App.css"
import { observer } from "mobx-react";

const PREVIOUS = "previous";
const NEXT = "next";

export const App = observer(() => {
  const store: AppStore = useContext(appContext);
  const [pageCount, setPageCount] = useState(0);
  const [offSet, setOffSet] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const entitiesPerPage: number = 20;

  const renderData = useCallback(() => {

    const entities = store.data.slice(offSet, offSet + entitiesPerPage);
    return entities.map((pd: Person, index: number) => (
      <PersonCard
        uuid={pd.uuid}
        company={pd.company}
        name={pd.name}
        bio={pd.bio}
        avatar={pd.avatar}
        title={pd.title}
        label={pd.label || ""}
        color={pd.color || "255, 255, 255"}
      />)
    );
  }, []);

  const handlePageClick = (op: string) => {
    let selectedPage = currentPage;
    if (op === NEXT && selectedPage + 1 < pageCount) {
      setCurrentPage(++selectedPage);
    } else if (op === PREVIOUS && selectedPage > 0) {
      setCurrentPage(--selectedPage);
    }
    const offset = selectedPage * entitiesPerPage;
    setOffSet(offset);
  };

  const initData = useCallback(async () => {
    const res: any = await axios.get("/list");
    store.setData(res.data);
    setPageCount(Math.ceil(res.data.length / entitiesPerPage));
  }, []);

  useEffect(() => {
    console.log("store length => ",store.data.length)
    if (store && store.data.length === 0) {
      initData();
    }
  }, []);

  return (
    <div className="App">
      <div onClick={() => handlePageClick(PREVIOUS) as any}>{"<"}</div>
      {store.data && store.data.length > 0 && renderData()}
      <div onClick={() => handlePageClick(NEXT) as any}>{">"}</div>
    </div>
  );
})
