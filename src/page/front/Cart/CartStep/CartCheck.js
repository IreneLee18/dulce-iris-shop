import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DataContext } from "../../../../utils/Context";
import currency from "../../../../utils/Currency";
import { editCart, getAllCart, enterCoupon } from "../../../../utils/API";
import { sweetAlert } from "../../../../utils/SweetAlert";
function CartCheck() {
  const navigate = useNavigate();
  const {
    cart,
    setCart,
    totalPrice,
    setTotalPrice,
    finalPrice,
    setFinalPrice,
    handleClickDeleteCart,
  } = useContext(DataContext);
  const [canEdit, setCanEdit] = useState(true);
  const [coupon, setCoupon] = useState({ code: "" });
  const handleClickEditCartItem = (e) => {
    const { id, value } = e.target;
    const data = { data: { product_id: id, qty: Number(value) } };
    setCanEdit(() => false);
    editCart(data, id).then((res) => {
      if (res.success) {
        sweetAlert("success", res.message);
        getAllCart().then((res) => {
          setCart(res.data.carts);
          setTotalPrice(res.data.total);
          setFinalPrice(Math.ceil(res.data.final_total));
          setCanEdit(() => true);
        });
      }
    });
  };
  const handleChangeEditCartItem = (e) => {
    const { id, value } = e.target;
    // 刪過頭會導致東西被刪掉...要想辦法解決這問題
    const data = cart.filter((item) =>
      item.id === id ? (item.qty = value) : item
    );
    setCart(data);
  };
  const handleClickAddCoupon = () => {
    const data = { data: coupon };
    enterCoupon(data).then((res) => {
      if (res.success) {
        sweetAlert("success", res.message);
        console.log(res);
      } else {
        sweetAlert("error", res.message);
      }
    });
    console.log(data);
  };
  return (
    <>
      <div className="cart-check">
        <div className="cart-check-item">
          <table>
            <thead>
              <tr>
                <th>產品</th>
                <th>單價</th>
                <th>數量</th>
                <th>總計</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product.title}</td>
                    <td>
                      NT$
                      {item.product.price === item.product.origin_price
                        ? currency(item.product.origin_price)
                        : currency(item.product.price)}
                    </td>
                    <td className="cart-check-item-count">
                      <label htmlFor="count">
                        <button
                          id={item.id}
                          value={item.qty === 1 ? item.qty : item.qty - 1}
                          onClick={handleClickEditCartItem}
                          disabled={!canEdit}
                          className={canEdit ? "" : "no-drop"}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          id={item.id}
                          value={item.qty}
                          onChange={handleChangeEditCartItem}
                          disabled={!canEdit}
                          className={canEdit ? "" : "no-drop"}
                        />
                        <button
                          id={item.id}
                          value={item.qty + 1}
                          onClick={handleClickEditCartItem}
                          disabled={!canEdit}
                          className={canEdit ? "" : "no-drop"}
                        >
                          +
                        </button>
                      </label>
                    </td>
                    <td>NT${currency(item.total)}</td>
                    <td>
                      <button id={item.id} onClick={handleClickDeleteCart}>
                        刪除
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ul className="cart-check-item-sm">
            {cart &&
              cart.map((item) => (
                <li key={item.id}>
                  <div className="cart-check-item-sm-image">
                    <img src={item.product.imageUrl} alt={item.id} />
                  </div>
                  <div className="cart-check-item-sm-detail">
                    <div>{item.product.title}</div>
                    <div>
                      NT$
                      {item.product.price === item.product.origin_price
                        ? currency(item.product.origin_price)
                        : currency(item.product.price)}
                    </div>
                    <div className="cart-check-item-count">
                      <label htmlFor="count">
                        <button
                          id={item.id}
                          value={item.qty === 1 ? item.qty : item.qty - 1}
                          onClick={handleClickEditCartItem}
                          disabled={!canEdit}
                          className={canEdit ? "" : "no-drop"}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          id={item.id}
                          value={item.qty}
                          onChange={handleChangeEditCartItem}
                          disabled={!canEdit}
                          className={canEdit ? "" : "no-drop"}
                        />
                        <button
                          id={item.id}
                          value={item.qty + 1}
                          onClick={handleClickEditCartItem}
                          disabled={!canEdit}
                          className={canEdit ? "" : "no-drop"}
                        >
                          +
                        </button>
                      </label>
                    </div>
                  </div>
                  <div className="cart-check-item-sm-delete">
                    <button id={item.id} onClick={handleClickDeleteCart}>
                      x
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="cart-check-confirm">
          <label htmlFor="coupon">
            <input
              id="coupon"
              type="text"
              value={coupon.code}
              onChange={(e) =>
                setCoupon((state) => ({ ...state, code: e.target.value }))
              }
            />
            <button onClick={handleClickAddCoupon}>確認</button>
          </label>
          <ul>
            <li>
              <span>小計</span>
              <span>NT$ {currency(totalPrice)}</span>
            </li>
            <li>
              <span>優惠折抵</span>
              <span>
                - NT$ {finalPrice !== totalPrice ? totalPrice - finalPrice : 0}
              </span>
            </li>
            <li>
              <span>
                運費<span className="delivery-fee-describe">(滿5,000免運)</span>
              </span>
              <span>NT$ {totalPrice > 5000 ? 0 : 500}</span>
            </li>
            <li className="free-delivery-fee">
              {totalPrice > 5000
                ? "商品滿 NT$ 5,000 免運 ♡ ♡ ♡"
                : `還差NT$ ${currency(5000 - totalPrice)}就可免運～`}
            </li>
            <li className="finalPrice">
              <span>總金額</span>
              <span>
                NT$
                {finalPrice !== totalPrice
                  ? currency(finalPrice > 5000 ? finalPrice : finalPrice + 500)
                  : currency(totalPrice > 5000 ? totalPrice : totalPrice + 500)}
              </span>
            </li>
            <li className="confirmBtn">
              <button onClick={() => navigate("/cart/info")}>立即結帳</button>
            </li>
          </ul>
        </div>
        <div className="cart-check-confirm-sm">
          <div>
            <div className="coupon-input">
              <div>
                <span className="material-symbols-outlined">
                  confirmation_number
                </span>
                <span>優惠卷</span>
              </div>
              <label htmlFor="coupon">
                <input
                  id="coupon"
                  type="text"
                  value={coupon.code}
                  onChange={(e) =>
                    setCoupon((state) => ({ ...state, code: e.target.value }))
                  }
                />
                <button onClick={handleClickAddCoupon}>確認</button>
              </label>
            </div>
            <p>
              {totalPrice > 5000
                ? "商品滿 NT$ 5,000 免運 ♡ ♡ ♡"
                : `還差NT$ ${currency(5000 - totalPrice)}就可免運～`}
            </p>
          </div>
          <div className="allPriceANDgoPay">
            <span>總金額</span>
            <span className="allPrice">
              NT$
              {finalPrice !== totalPrice
                ? currency(finalPrice > 5000 ? finalPrice : finalPrice + 500)
                : currency(totalPrice > 5000 ? totalPrice : totalPrice + 500)}
            </span>
            <button onClick={() => navigate("/cart/info")}>立即結帳</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartCheck;
