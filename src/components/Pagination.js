import { useState, useEffect } from "react";
function Pagination({
  perPage,
  allData,
  searchData,
  currentPage,
  setCurrentPage,
}) {
  const [pagination, setPagination] = useState({
    current_page: currentPage,
    has_next: Math.ceil(allData.length / perPage) > 1 ? true : false,
    has_pre: false,
    total_pages: Math.ceil(allData.length / perPage),
  });
  const [totalPage, setTotalPage] = useState(
    Math.ceil(allData.length / perPage)
  );
  useEffect(() => {
    if (searchData.length !== 0 && searchData !== undefined) {
      setTotalPage(Math.ceil(searchData.length / perPage));
    } else {
      setTotalPage(Math.ceil(allData.length / perPage));
    }
    setPagination((state) => ({
      ...state,
      has_next: totalPage > 1 ? true : false,
      total_pages: totalPage,
    }));
  }, [allData.length, perPage, searchData, totalPage]);

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
      {pagination.total_pages > 1 ? (
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
                id={pageNum}
                onClick={(e) => setCurrentPage(Number(e.target.id))}
              >
                <span id={pageNum}>{pageNum}</span>
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
      ) : null}
    </>
  );
}

export default Pagination;
