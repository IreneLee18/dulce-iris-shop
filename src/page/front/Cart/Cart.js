import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DataContext } from "../../../utils/Context";
import { sweetAlert } from "../../../utils/SweetAlert";

function Cart() {
  const { cart } = useContext(DataContext);
  const navigate = useNavigate();
  let location = useLocation();
  let info = location.pathname.includes("info");
  let unPay = location.pathname.includes("-");
  let finish = location.pathname.includes("finish");
  useEffect(() => {
    console.log(info, unPay, finish, cart.length);
    if (cart.length === 0 && !info && !unPay && !finish) {
      sweetAlert(
        "error",
        "目前購物車沒東西！",
        "由於目前購物車沒東西幫你跳回產品頁面！"
      );
      navigate("/products/所有商品");
    }
  }, [cart.length, finish, info, navigate, unPay]);
  return (
    <>
      <div className="cartPage container">
        <div className="nav">
          <ul>
            <li
              className={`nav-step ${
                !info && !finish && !unPay
                  ? "nav-currentStep"
                  : "nav-finishStep"
              }`}
            >
              <div>確認清單</div>
            </li>
            <li
              className={`nav-line ${
                info || finish || unPay ? "nav-finishLine" : ""
              }`}
            ></li>
            <li
              className={`nav-step ${info ? "nav-currentStep" : ""} ${
                finish || unPay ? "nav-finishStep" : ""
              }`}
            >
              <div>填寫資料</div>
            </li>
            <li
              className={`nav-line ${finish || unPay ? "nav-finishLine" : ""}`}
            ></li>
            <li
              className={`nav-step ${unPay ? "nav-currentStep" : ""}${
                finish ? "nav-finishStep" : ""
              }`}
            >
              <div>確認付款</div>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Cart;
