function DashboardSearch({ searchGroup,data }) {
  return (
    <>
      <div className="search">
        <select name="" id="" defaultValue={'DEFAULT'}>
          <option value="DEFAULT">請選擇搜尋對象</option>
          {searchGroup.map((item) => (
            <option key={item.id} value={item.id}>
              {item.value}
            </option>
          ))}
        </select>
        <label htmlFor="search">
          <input type="text" id="search" placeholder="SEARCH" />
          <button className="material-symbols-outlined">search</button>
        </label>
      </div>
    </>
  );
}

export default DashboardSearch;
