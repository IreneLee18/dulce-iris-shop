import { getCoupon, deleteCoupon } from "../../../utils/API";
// import { dashboardCouponSearch } from "../../../utils/Data";
import PaginationDefault from "../../../components/PaginationDefault";
import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sweetAlert } from "../../../utils/SweetAlert";
// import DashboardSearch from "../../../components/DashboardSearch";
import Loading from "../../../components/Loading";
function Coupon() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [coupons, setCoupons] = useState([]);
  const allCoupon = useRef([]);
  // const [searchCoupon, setSearchCoupon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  useLayoutEffect(() => {
    getCoupon(currentPage).then((res) => {
      setCoupons(res.coupons);
      setPagination(res.pagination);
      setIsLoading(() => false);
    });
  }, [currentPage]);
  useEffect(() => {
    const data = [];
    for (let i = 1; i <= pagination.total_pages; i++) {
      getCoupon(i).then((res) => {
        data.push(...res.coupons);
        allCoupon.current = data;
      });
    }
  }, [pagination.total_pages]);
  const handleClick = (e) => {
    const { id } = e.target;
    if (id !== "add") {
      // edit
      navigate(`/back/dashboard/coupon/${id}`);
      window.localStorage.setItem("editCouponCurrentPage", currentPage);
    } else {
      // add
      navigate("/back/dashboard/coupon/add");
    }
  };
  const handleClickDelete = (e) => {
    const { id } = e.target;
    deleteCoupon(id).then((res) => {
      if (res.success) {
        sweetAlert("success", "刪除成功");
        getCoupon(currentPage).then((res) => {
          setCoupons(res.coupons);
          setPagination(res.pagination);
        });
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="dashboard-coupon container">
            {/* <section>
              <DashboardSearch
                searchGroup={dashboardCouponSearch}
                data={coupons}
                setPageData={setSearchCoupon}
              />
            </section> */}
            <section>
              <table className="table">
                <thead>
                  <tr>
                    <th>名稱</th>
                    <th>代碼</th>
                    <th>％數</th>
                    <th>截止日期</th>
                    <th>編輯</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.code}</td>
                      <td>{item.percent}</td>
                      <td>
                        {new Date(item.due_date).toISOString().split("T")[0]}
                      </td>
                      <td>
                        <button
                          id={item.id}
                          className="material-symbols-outlined"
                          onClick={handleClick}
                        >
                          edit
                        </button>
                        <button
                          id={item.id}
                          className="material-symbols-outlined"
                          onClick={handleClickDelete}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <div>
              <button
                className="dashboard-add material-symbols-outlined"
                id="add"
                onClick={handleClick}
              >
                add_circle
              </button>
              <button className="scroll-top material-symbols-outlined">
                assistant_navigation
              </button>
            </div>
          </div>
          {pagination.total_pages > 1 ? (
            <section className="dashboard-coupon-pagination">
              <PaginationDefault
                pagination={pagination}
                setCurrentPage={setCurrentPage}
              />
            </section>
          ) : null}
        </>
      )}
    </>
  );
}

export default Coupon;
