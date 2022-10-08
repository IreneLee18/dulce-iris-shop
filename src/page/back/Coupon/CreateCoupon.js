import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addCoupon, editCoupon, getCoupon } from "../../../utils/API";
import { sweetAlert } from "../../../utils/SweetAlert";
import Loading from "../../../components/Loading";
const CreateCoupon = () => {
  const { ID } = useParams();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState({
    title: "",
    is_enabled: 0,
    percent: 100,
    due_date: "",
    code: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isError, setIsError] = useState({
    title: false,
    code: false,
    due_date: false,
  });
  const handleClickSaveCoupon = () => {
    setIsSave(() => true);
    const data = { data: { ...coupon } };
    if (ID === "add") {
      addCoupon(data).then((res) => {
        console.log(res);
        if (res.success) {
          sweetAlert("success", "新增成功");
          setTimeout(() => {
            navigate("/back/dashboard/coupons");
          }, [3000]);
        }
      });
    } else {
      editCoupon(data, ID).then((res) => {
        if (res.success) {
          sweetAlert("success", "編輯成功");
          setTimeout(() => {
            navigate("/back/dashboard/coupons");
          }, [3000]);
        }
      });
    }
  };
  useEffect(() => {
    if (ID !== "add") {
      const currentPage = window.localStorage.getItem("editCouponCurrentPage");
      getCoupon(currentPage).then((res) => {
        res.coupons.forEach((item) => {
          if (item.id === ID) {
            setCoupon(item);
            setIsLoading(() => true);
          }
        });
        window.localStorage.removeItem("editCouponCurrentPage");
      });
    } else {
      setIsLoading(() => true);
    }
  }, [ID]);
  useEffect(() => {
    if (isSave) {
      // error input
      // title
      if (coupon.title !== "" && coupon.title !== undefined) {
        setIsError((state) => ({ ...state, title: false }));
      } else {
        setIsError((state) => ({ ...state, title: true }));
      }
      // code
      if (coupon.code !== "" && coupon.code !== undefined) {
        setIsError((state) => ({ ...state, code: false }));
      } else {
        setIsError((state) => ({ ...state, code: true }));
      }
      // due_date
      if (coupon.due_date !== "" && coupon.due_date !== undefined) {
        setIsError((state) => ({ ...state, due_date: false }));
      } else {
        setIsError((state) => ({ ...state, due_date: true }));
      }
    }
  }, [coupon.code, coupon.due_date, coupon.title, isSave]);
  return (
    <>
      {isLoading ? (
        <div className="createCoupon container">
          <div className="createCoupon-header">
            <h1>
              {ID === "add" ? <span>新增</span> : <span>新增</span>}優惠卷
            </h1>
          </div>
          <div className="createCoupon-body">
            <div className="createCoupon-input">
              <label className={isError.title ? "error" : ""} htmlFor="title">
                <span>折扣名稱：</span>
                <input
                  id="title"
                  type="text"
                  value={coupon.title}
                  onChange={(e) =>
                    setCoupon((state) => ({
                      ...state,
                      title: e.target.value,
                    }))
                  }
                />
              </label>
              <label className={isError.code ? "error" : ""} htmlFor="code">
                <span>折扣代碼：</span>
                <input
                  id="code"
                  type="text"
                  value={coupon.code}
                  onChange={(e) =>
                    setCoupon((state) => ({
                      ...state,
                      code: e.target.value,
                    }))
                  }
                />
              </label>
              <div className="input-half">
                <label className="checked" htmlFor="is_enabled">
                  <span>是否啟用：</span>
                  <input
                    id="is_enabled"
                    type="checkbox"
                    value={coupon.is_enabled}
                    checked={coupon.is_enabled}
                    onChange={(e) =>
                      setCoupon((state) => ({
                        ...state,
                        is_enabled: e.target.checked ? 1 : 0,
                      }))
                    }
                  />
                  {coupon.is_enabled ? <div>YES</div> : <div>NO</div>}
                </label>
                <label htmlFor="percent">
                  <span>折扣％數：</span>
                  <input
                    id="percent"
                    type="number"
                    value={coupon.percent}
                    onChange={(e) =>
                      setCoupon((state) => ({
                        ...state,
                        percent: Number(e.target.value),
                      }))
                    }
                  />
                </label>
              </div>
              <label
                className={isError.due_date ? "error" : ""}
                htmlFor="due_date"
              >
                <span>截止日期：</span>
                <input
                  id="due_date"
                  type="date"
                  value={
                    typeof coupon.due_date === "number" &&
                    coupon.due_date !== "NaN"
                      ? new Date(coupon.due_date).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setCoupon((state) => ({
                      ...state,
                      due_date: new Date(e.target.value).getTime(),
                    }))
                  }
                />
              </label>
            </div>
            <div className="createCoupon-backgroundImage">
              <img
                src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2115&q=80"
                alt=""
              />
            </div>
          </div>
          <div className="createCoupon-footer">
            <button onClick={() => navigate("/back/dashboard/coupons")}>
              CANCEL
            </button>
            <button onClick={handleClickSaveCoupon}>SAVE</button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default CreateCoupon;
