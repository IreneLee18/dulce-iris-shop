import OrderViewModal from "../../../components/Modal/Order/OrderViewModal";
import Loading from "../../../components/Loading";
import PaginationDefault from "../../../components/PaginationDefault";
import { useRef, useEffect, useState } from "react";
import { getOrder, deleteOrder, deleteAllOrder } from "../../../utils/API";
import { sweetAlert } from "../../../utils/SweetAlert";
import currency from "../../../utils/Currency";
function Order() {
  const orderModalRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setPageData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [searchOrder, setSearchOrder] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const orderList = useRef([]);
  const handleClickGetCurrentOrder = (e) => {
    const data = pageData.filter((item) => item.id === e.target.id);
    setCurrentOrder(...data);
    const cartProductList = [];
    Object.entries(data[0].products).forEach((item) => {
      cartProductList.push(item[1]);
      orderList.current = cartProductList;
    });
    orderModalRef.current.openViewModal();
  };
  const handleClickDeleteOrder = (e) => {
    deleteOrder(e.target.id).then((res) => {
      if (res.success) {
        sweetAlert(
          "success",
          "刪除成功",
          `${res.message}訂單編號${e.target.id}`
        );
        getOrder(currentPage).then((res) => {
          setPageData(res.orders);
          setPagination(res.pagination);
        });
      } else {
        sweetAlert("error", res.message);
      }
    });
  };
  const handleClickDeleteAllOrder = () => {
    deleteAllOrder().then((res) => {
      if (res.success) {
        sweetAlert("success", "刪除成功", `${res.message}所有訂單`);
        getOrder(currentPage).then((res) => {
          setPageData(res.orders);
          setPagination(res.pagination);
        });
      } else {
        sweetAlert("error", res.message);
      }
    });
  };
  useEffect(() => {
    getOrder(currentPage).then((res) => {
      setPageData(res.orders);
      setPagination(res.pagination);
      setIsLoading(() => false);
    });
  }, [currentPage]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="dashboard-order container">
            {pageData.length !== 0 ? (
              <>
                <section>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>訂單編號</th>
                        <th>姓名 / 電話</th>
                        <th>付款</th>
                        <th>總金額</th>
                        <th>詳細</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageData.map((item) => (
                        <tr key={item.id}>
                          <td className={item.is_paid ? "" : "unPay"}>
                            {item.id}
                          </td>
                          <td>
                            {item.user.name}
                            <span> / {item.user.tel}</span>
                          </td>
                          <td>{item.is_paid ? "YES" : "NO"}</td>
                          <td>NT$ {currency(item.total)}</td>
                          <td>
                            <button
                              className="material-symbols-outlined"
                              id={item.id}
                              onClick={handleClickGetCurrentOrder}
                            >
                              visibility
                            </button>
                          </td>
                          <td>
                            <button
                              className="material-symbols-outlined"
                              id={item.id}
                              onClick={handleClickDeleteOrder}
                            >
                              delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
                <div className="dashboard-reminder">
                  <p>
                    ✶ 未付款顯示<span style={{ color: "#ff5f5f" }}>紅色</span>
                    訂單編號
                  </p>
                  <div className="clearAllOrder">
                    <button onClick={handleClickDeleteAllOrder}>
                      CLEAR ALL
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="noOrder">
                <p>目前無任何訂單！</p>
              </div>
            )}
          </div>
          {pagination.total_pages > 1 ? (
            <section className="dashboard-order-pagination">
              <PaginationDefault
                pagination={pagination}
                setCurrentPage={setCurrentPage}
              />
            </section>
          ) : null}
          <section className="orderViewModal">
            <OrderViewModal
              ref={orderModalRef}
              orderData={currentOrder}
              orderList={orderList.current}
            />
          </section>
        </>
      )}
    </>
  );
}

export default Order;
