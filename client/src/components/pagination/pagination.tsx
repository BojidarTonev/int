import React, { useContext } from "react";
import { AppStore, appContext } from "../../store/AppStore";
import { observer } from "mobx-react";
import "./pagination.css";

export const Pagination = observer(() => {
  const store: AppStore = useContext(appContext);
  const PREVIOUS = "previous";
  const NEXT = "next";

  const handlePageClick = (op: string) => {
    let selectedPage = store.currentPage;
    if (op === NEXT && selectedPage < store.pageCount - 1) {
      selectedPage++;
      store.setCurrentPage(selectedPage);
    } else if (op === PREVIOUS && store.currentPage >= 1) {
      selectedPage--;
      store.setCurrentPage(selectedPage);
    }
    const offset = selectedPage * store.entitiesPerPage;
    store.setOffset(offset);
  };

  return (
    <div className="pagination-wrapper">
      <button onClick={() => handlePageClick(PREVIOUS) as any}>
        PREVIOUS PAGE
      </button>
      <div className="current-page">{store.currentPage}</div>
      <button onClick={() => handlePageClick(NEXT) as any}>NEXT PAGE</button>
    </div>
  );
});
