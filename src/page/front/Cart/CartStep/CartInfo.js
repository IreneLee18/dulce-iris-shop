import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DataContext } from "../../../../utils/Context";
import currency from "../../../../utils/Currency";
import { sweetAlert } from "../../../../utils/SweetAlert";
import { submitOrder } from "../../../../utils/API";
function CartInfo() {
  const {
    cart,
    setCart,
    setTotalPrice,
    finalPrice,
    setFinalPrice,
    setCheckCartID,
  } = useContext(DataContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const onSubmit = (data) => {
    const userData = { user: { ...data } };
    if (message !== "") userData.message = message;
    submitOrder({ data: { ...userData } }).then((res) => {
      if (res.success) {
        sweetAlert("success", res.message);
        navigate("/cart/finish");
        // 淨空購物車
        setCart([]);
        setTotalPrice(0);
        setFinalPrice(0);
        setCheckCartID(res.orderId)
      } else {
        sweetAlert("error", res.message);
      }
    });
  };
  const formData = [
    {
      id: "name",
      title: "姓名*",
      type: "text",
      placeholder: "請輸入收件人名稱",
      validation: {
        required: {
          value: true,
          message: "請輸入收件人名稱",
        },
      },
      errors: errors.name?.message,
    },
    {
      id: "tel",
      title: "手機號碼*",
      type: "number",
      placeholder: "請輸入收件人手機號碼",
      validation: {
        required: {
          value: true,
          message: "請輸入收件人手機號碼",
        },
        pattern: {
          value: /^[0-9]{10}$/g,
          message: "格式有誤!",
        },
      },
      errors: errors.tel?.message,
    },
    {
      id: "email",
      title: "信箱*",
      type: "text",
      placeholder: "請輸入收件人郵件地址",
      validation: {
        required: {
          value: true,
          message: "請輸入收件人郵件地址",
        },
        pattern: {
          value: /^\S+@\S+$/i,
          message: "格式有誤!",
        },
      },
      errors: errors.email?.message,
    },
    {
      id: "address",
      title: "地址*",
      type: "text",
      placeholder: "請輸入收件人地址",
      validation: {
        required: {
          value: true,
          message: "請輸入收件人地址",
        },
      },
      errors: errors.address?.message,
    },
  ];
  return (
    <>
      <h1 className="cart-info-title">購買清單</h1>
      <div className="cart-info">
        <div className="cart-info-cart-item">
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <span>{item.product.title}</span>
                <span>x{item.qty}</span>
                <span>NT$ {currency(item.total)}</span>
              </li>
            ))}
          </ul>
          <div className="cart-info-cart-item-total">
            <div>共{cart.length}項</div>
            <div>
              <span>總計：</span>
              <span>NT$ {currency(finalPrice)}</span>
            </div>
          </div>
        </div>
        <div className="cart-info-userInfo">
          <form onSubmit={handleSubmit(onSubmit)}>
            {formData.map((item) => (
              <label htmlFor={item.id} key={item.id}>
                <span>{item.title}</span>
                <input
                  type={item.type}
                  id={item.id}
                  placeholder={item.placeholder}
                  {...register(`${item.id}`, { ...item.validation })}
                  style={item.errors ? { borderColor: "#ff5f5f" } : {}}
                />
                <span className="input-error">{item.errors}</span>
              </label>
            ))}
            <label htmlFor="message">
              <span>備註</span>
              <textarea
                name="message"
                id="message"
                cols="5"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </label>
            <div className="stepBtn">
              <Link to="/cart">上一步</Link>
              <input type="submit" value="下一步" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CartInfo;
