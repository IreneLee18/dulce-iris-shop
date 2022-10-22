function PaginationDefault({ pagination, setCurrentPage }) {
  const pageNum = [...Array(pagination.total_pages).keys()].map(
    (item) => item + 1
  );
  return (
    <ul className="pagination">
      <li>
        <div
          id="pre"
          className={`material-icons-outlined ${
            pagination.has_pre ? "" : "disabled"
          }`}
          onClick={() =>
            setCurrentPage((state) => (state === 1 ? state : state - 1))
          }
        >
          <span>chevron_left</span>
        </div>
      </li>
      {pageNum.map((pageNum) => (
        <li key={pageNum} id={pageNum}>
          <div
            className={pageNum === pagination.current_page ? "active" : ""}
            value={pageNum}
            onClick={(e) => setCurrentPage(Number(e.target.value))}
          >
            <span>{pageNum}</span>
          </div>
        </li>
      ))}
      <li className={pagination.has_next ? "" : "disabled"}>
        <div
          id="next"
          className={`material-icons-outlined ${
            pagination.has_next ? "" : "disabled"
          }`}
          onClick={() =>
            setCurrentPage((state) =>
              state === pagination.total_pages
                ? pagination.total_pages
                : state + 1
            )
          }
        >
          <span>chevron_right</span>
        </div>
      </li>
    </ul>
  );
}

export default PaginationDefault;
