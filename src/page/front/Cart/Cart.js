import { Outlet, useLocation } from "react-router-dom";
function Cart() {
  let location = useLocation();
  let info = location.pathname.includes("info");
  let unPay = location.pathname.includes("-");
  let finish = location.pathname.includes("finish");
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
