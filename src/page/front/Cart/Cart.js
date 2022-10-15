import { Outlet } from "react-router-dom";
function Cart() {
  return (
    <>
      <div className="cartPage container">
        <div className="nav">
          <ul>
            <li className="nav-step nav-currentStep">
              <div>確認清單</div>
            </li>
            <li className="nav-line"></li>
            <li className="nav-step">
              <div>填寫資料</div>
            </li>
            <li className="nav-line"></li>
            <li className="nav-step">
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
