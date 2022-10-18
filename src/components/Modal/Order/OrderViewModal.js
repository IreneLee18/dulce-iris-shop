import {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import currency from "../../../utils/Currency";
function ProductViewModal({ orderData,orderList }, ref) {
  // open & close Modal
  const [modalState, setModalState] = useState(true);
  useImperativeHandle(ref, () => ({
    openViewModal: () => {
      setModalState(true);
    },
  }));
  
  return (
    <>
      {orderList.length!==0 ? (
        <div className="modal" style={modalState ? {} : { top: "-1500px" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title">訂單詳細資訊</h1>
              <button
                className="material-symbols-outlined"
                onClick={() => setModalState(false)}
              >
                close
              </button>
            </div>
            <div className="modal-body">
              <ul className="item-group">
                <li className="item">
                  <div className="title">編號：</div>
                  <div>{orderData.id}</div>
                </li>
                <li className="item">
                  <div className="title">姓名：</div>
                  <div>{orderData.user.name}</div>
                </li>
                <li className="item">
                  <div className="title">電話：</div>
                  <div>{orderData.user.tel}</div>
                </li>
                <li className="item">
                  <div className="title">信箱：</div>
                  <div>{orderData.user.email}</div>
                </li>
                <li className="item">
                  <div className="title">地址：</div>
                  <div>{orderData.user.address}</div>
                </li>
                <li className="item">
                  <div className="title">備註：</div>
                  <div>{orderData.message}</div>
                </li>
                <li className="item">
                  <div className="title">付款：</div>
                  <div>
                    {orderData.is_paid ? "YES ⭕️ ⭕️ ⭕️" : "NO ❌ ❌ ❌"}
                  </div>
                </li>
              </ul>
              <ul className="item-group orderList">
                {orderList.map((item) => (
                  <li className="item" key={item.id}>
                    <span>{item.product.title}</span>
                    <div>
                      <span>x {currency(item.qty)}</span>
                      <span>NT$ {currency(item.final_total)}</span>
                    </div>
                  </li>
                ))}
                <li>
                  <span>總金額：</span>
                  <span>
                    NT${" "}
                    {orderData.total > 5000
                      ? currency(orderData.total)
                      : currency(orderData.total + 500)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default forwardRef(ProductViewModal);
