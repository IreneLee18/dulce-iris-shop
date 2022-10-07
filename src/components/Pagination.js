function Pagination({ pagination, setCurrentPage }) {
  const page = [...Array(pagination.total_pages).keys()].map(
    (item) => item + 1
  );
  return (
    <>
      <ul className="pagination">
        <li>
          <button
            className={`material-icons-outlined ${
              pagination.has_pre ? "" : "disabled"
            }`}
            onClick={() =>
              setCurrentPage((state) => (state === 1 ? state : state - 1))
            }
          >
            chevron_left
          </button>
        </li>
        {page.map((pageNum) => (
          <li key={pageNum} id={pageNum}>
            <button
              className={pageNum === pagination.current_page ? "active" : ""}
              value={pageNum}
              onClick={(e) => setCurrentPage(Number(e.target.value))}
            >
              {pageNum}
            </button>
          </li>
        ))}
        <li className={pagination.has_next ? "" : "disabled"}>
          <button
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
            chevron_right
          </button>
        </li>
      </ul>
    </>
  );
}

export default Pagination;
