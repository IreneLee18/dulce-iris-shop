import { useState } from "react";
function DashboardSearch({ searchGroup, data, setPageData }) {
  const [searchSelect, setSearchSelect] = useState("DEFAULT");
  const [searchValue, setSearchValue] = useState("");
  const handleClick = () => {
    if (searchSelect !== "DEFAULT" && searchValue !== "") {
      setPageData(data.filter((item) => item[searchSelect].includes(searchValue)));
    }else{
      setPageData([])
    }
  };
  return (
    <>
      <div className="search">
        <select
          name=""
          id=""
          value={searchSelect}
          onChange={(e) => setSearchSelect(e.target.value)}
        >
          <option value="DEFAULT" disabled>
            請選擇搜尋對象
          </option>
          {searchGroup.map((item) => (
            <option key={item.id} value={item.id}>
              {item.value}
            </option>
          ))}
        </select>
        <label htmlFor="search">
          <input
            type="text"
            id="search"
            placeholder={searchValue === "" ? "SEARCH" : ""}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.trim())}
          />
          <button className="material-symbols-outlined" onClick={handleClick}>
            search
          </button>
        </label>
      </div>
    </>
  );
}

export default DashboardSearch;
