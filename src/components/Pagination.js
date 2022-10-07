import { useState, useEffect } from "react";
function Pagination({ perPage, data, currentPage, setCurrentPage }) {
  const [pagination, setPagination] = useState({
    current_page: currentPage,
    has_next: Math.ceil(data.length / perPage) > 1 ? true : false,
    has_pre: false,
    total_pages: Math.ceil(data.length / perPage),
  });

  const pageNum = [...Array(pagination.total_pages).keys()].map(
    (item) => item + 1
  );
  useEffect(() => {
    // 監聽currentPage的變化
    setPagination((state) => ({ ...state, current_page: currentPage }));
    pagination.current_page > 1
      ? setPagination((state) => ({ ...state, has_pre: true }))
      : setPagination((state) => ({ ...state, has_pre: false }));
    pagination.current_page < pagination.total_pages
      ? setPagination((state) => ({ ...state, has_next: true }))
      : setPagination((state) => ({ ...state, has_next: false }));
  }, [currentPage, pagination.current_page, pagination.total_pages]);

  return (
    <>
      <ul className="pagination">
        <li>
          <button
            id="pre"
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
        {pageNum.map((pageNum) => (
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
            chevron_right
          </button>
        </li>
      </ul>
    </>
  );
}

export default Pagination;
