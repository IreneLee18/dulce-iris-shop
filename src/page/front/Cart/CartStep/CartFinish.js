import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../../utils/Context";
import { getOrderID, payOrder } from "../../../../utils/API";
import currency from "../../../../utils/Currency";
import { sweetAlert } from "../../../../utils/SweetAlert";
function CartFinish() {
  const { checkCartID } = useContext(DataContext);
  const [checkCart, setCheckCart] = useState(null);
  const [createDate, setCreateDate] = useState([]);
  const cartProduct = useRef([]);
  const [showItem, setShowItem] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const handleClickPay = (e) => {
    payOrder(checkCartID).then((res) => {
      if (res.success) {
        sweetAlert("success", res.message);
        setIsPay(() => true);
        setShowItem(()=>false)
      } else {
        sweetAlert("error", res.message);
      }
    });
  };
  useEffect(() => {
    getOrderID(checkCartID).then((res) => {
      setCheckCart(res.order);
      const cartProductList = [];
      Object.entries(res.order.products).forEach((item) => {
        cartProductList.push(item[1]);
        cartProduct.current = cartProductList;
      });
      setCreateDate(
        new Date(res.order.create_at * 1000)
          .toISOString()
          .split("T")[0]
          .split("-")
      );
    });
  }, [checkCartID]);
  return (
    <>
      {checkCart === null ? (
        <h1>hi</h1>
      ) : (
        <>
          <div className="cart-finish">
            <ul>
              <li>
                <div>訂單編號</div>
                <div>{checkCart.id}</div>
              </li>
              <li>
                <div>訂單日期</div>
                <div>
                  {createDate.map((item) => (
                    <span className="date" key={Math.random()}>
                      <span>{item}</span>
                      <span>/</span>
                    </span>
                  ))}
                </div>
              </li>
              <li>
                <div>姓名</div>
                <div>{checkCart.user.name}</div>
              </li>
              <li>
                <div>電話</div>
                <div>{checkCart.user.tel}</div>
              </li>
              <li>
                <div>信箱</div>
                <div>{checkCart.user.email}</div>
              </li>
              <li>
                <div>地址</div>
                <div>{checkCart.user.address}</div>
              </li>
              <li>
                <div>備註</div>
                <div>{checkCart.message}</div>
              </li>
              <li>
                <div>總金額</div>
                <div>NT$ {currency(checkCart.total)}</div>
              </li>
              <li>
                <div>訂購商品</div>
                <div className="productList">
                  <span>共 {currency(cartProduct.current.length)} 項</span>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => setShowItem((state) => !state)}
                  >
                    {showItem ? "visibility" : "visibility_off"}
                  </span>
                </div>
              </li>
            </ul>
          </div>
          {showItem ? (
            <ul className="cart-finish-product-list">
              {cartProduct.current &&
                cartProduct.current.map((item) => (
                  <li key={item.id}>
                    <div>{item.product.title}</div>
                    <div>
                      <span>x {currency(item.qty)}</span>
                      <span>NT$ {currency(item.final_total)}</span>
                    </div>
                  </li>
                ))}
            </ul>
          ) : null}
          <div className="cart-finish-payBtn">
            {isPay ? (
              <Link to="/">返回首頁</Link>
            ) : (
              <button onClick={handleClickPay}>確認付款</button>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default CartFinish;