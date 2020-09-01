import React, { useContext } from "react";
import { appContext, AppStore } from "../../store/AppStore";
import { observer } from "mobx-react";
import "./search-bar.css";

export const SearchBar = observer(() => {
  const store: AppStore = useContext(appContext);

  const handleSearchClick = () => {
    const searchInput: any = document.getElementById("search-bar-input");
    const searchValue = searchInput.value;

    store.setCurrentPage(0);
    store.setOffset(0);
    store.applyFilter(searchValue);
    
  };

  const handleForceRefreshClick = () => {
    store.setupHardRefresh();
    store.isLoading = true;
  };

  return (
    <div className="search-bar">
      <div>
        <input type="text" id="search-bar-input" />
        <i className="fas fa-search" onClick={handleSearchClick}></i>
      </div>
      <button onClick={handleForceRefreshClick}>force refresh</button>
    </div>
  );
});
