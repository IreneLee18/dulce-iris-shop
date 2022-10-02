// import TableFrom from '../../components/TableFrom'
import ProductModal from "../../components/Modal/ProductModal";
import { useRef } from "react";
function Coupon() {
  const productModalRef = useRef();
  const handleClickOpenModal = () => {
    productModalRef.current.openModal();
  };
  return (
    <>
      <div className="dashbord-coupon container">
        <section>
          <div className="search">
            <label htmlFor="search">
              <input type="text" id="search" placeholder="SEARCH ORDER ID" />
              <button className="material-symbols-outlined">search</button>
            </label>
          </div>
        </section>
        <section>
          <table className="table">
            <thead>
              <tr>
                <th>截止日期</th>
                <th>
                  代碼<span> / %數</span>
                </th>
                <th className="m-d-none">％數</th>
                <th>詳細</th>
                <th>編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2022/09/09</td>
                <td>
                  hello<span> / 10</span>
                </td>
                <td className="m-d-none">10</td>
                <td>
                  <button className="material-symbols-outlined">
                    visibility
                  </button>
                </td>
                <td>
                  <button className="material-symbols-outlined">edit</button>
                  <button className="material-symbols-outlined">delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <div className="dashbord-reminder">
          <p>
            ✶ 未付款顯示<span style={{ color: "#ff5f5f" }}>紅色</span>訂單編號
          </p>
          <p>
            ✶ 未啟用<span style={{ color: "#ccc" }}>灰色</span>文字
          </p>
        </div>
        <div>
          <button
            className="dashbord-add material-symbols-outlined"
            onClick={handleClickOpenModal}
          >
            add_circle
          </button>
          <button className="scroll-top material-symbols-outlined">
            assistant_navigation
          </button>
        </div>
      </div>
      <section>
        <ProductModal ref={productModalRef} />
      </section>
    </>
  );
}

export default Coupon;
