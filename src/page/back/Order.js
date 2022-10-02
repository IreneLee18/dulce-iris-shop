// import TableFrom from '../../components/TableFrom'
import ProductModal from "../../components/Modal/ProductModal";
import { useRef } from "react";
function Order() {
  const productModalRef = useRef();
  const handleClickOpenModal = () => {
    productModalRef.current.openModal();
  };
  return (
    <>
      <div className="dashbord-order container">
        <section>
          <div className="search">
            <label htmlFor="search">
              <input type="text" id="search" placeholder="SEARCH COUPON CODE" />
              <button className="material-symbols-outlined">search</button>
            </label>
          </div>
        </section>
        <section>
          <table className="table">
            <thead>
              <tr>
                <th>訂單編號</th>
                <th>姓名<span> / 電話</span></th>
                <th className="m-d-none">付款</th>
                <th>詳細</th>
                <th>編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>-L9u2EUkQSoEmW7QzGLF</td>
                <td>李若羽<span> / 0931148229</span></td>
                <td className="m-d-none">YES</td>
                <td>
                  <button className="material-symbols-outlined">visibility</button>
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
          <p>✶ 未啟用<span style={{ color: "#ccc" }}>灰色</span>文字</p>
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

export default Order;
