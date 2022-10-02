// import TableFrom from '../../components/TableFrom'
import ProductModal from "../../components/Modal/ProductModal";
import { useRef } from "react";
function Product() {
  const productModalRef = useRef();
  const handleClickOpenModal = () => {
    productModalRef.current.openModal();
  };
  return (
    <>
      <div className="dashbord-product container">
        <section>
          <div className="search">
            <select name="" id="">
              <option value="類別">類別</option>
              <option value="名稱">名稱</option>
              <option value="啟用">啟用</option>
            </select>
            <label htmlFor="search">
              <input type="text" id="search" placeholder="SEARCH" />
              <button className="material-symbols-outlined">search</button>
            </label>
          </div>
        </section>
        <section>
          <table className="table">
            <thead>
              <tr>
                <th>類別</th>
                <th>名稱</th>
                <th className="m-d-none">原價</th>
                <th>詳細</th>
                <th>編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>養肌系列</td>
                <td>藻針</td>
                <td className="m-d-none">3000</td>
                <td>
                  <button className="material-symbols-outlined">
                    visibility
                  </button>
                </td>
                <td>
                  <button
                    className="material-symbols-outlined"
                    onClick={handleClickOpenModal}
                  >
                    edit
                  </button>
                  <button className="material-symbols-outlined">delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <div className="dashbord-reminder">
          <p>
            ✶ 特價商品顯示<span style={{ color: "#99dd00" }}>綠色</span>價格
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

export default Product;
