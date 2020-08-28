import React, { useEffect, useState, useCallback } from "react";
import { PersonCard } from "./components/person-card/person-card";
import axios from "axios";
import "./assets/site.css"
import "./App.css"

const PREVIOUS = "previous";
const NEXT = "next";

const App = () => {
  const [pageCount, setPageCount] = useState(0);
  const [offSet, setOffSet] = useState(0);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const entitiesPerPage: number = 20;

  const renderData = () => {
    const slice = data.slice(offSet, offSet + entitiesPerPage);
    return slice.map((pd: any) => (
      <PersonCard
        uuid={pd.uuid}
        company={pd.comapny}
        name={pd.name}
        bio={pd.bio}
        avatar={pd.avatar}
        title={pd.title}
      />
    ));
  };

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
    setData(res.data as any);
    setPageCount(Math.ceil(res.data.length / entitiesPerPage));
  }, []);

  useEffect(() => {
    initData();
  }, [initData]);

  return (
    <div className="App">
      <div onClick={() => handlePageClick(PREVIOUS) as any}>{"<"}</div>
      {data && data.length > 0 && renderData()}
      <div onClick={() => handlePageClick(NEXT) as any}>{">"}</div>
    </div>
  );
}

export default App;
