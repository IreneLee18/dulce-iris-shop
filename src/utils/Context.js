import { createContext, useEffect, useState, useRef } from "react";
import { getProductsData, getAllCart, addCart, deleteCart } from "./API";
import { sweetAlert } from "./SweetAlert";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [heart, setHeart] = useState([]);
  const [heartID, setHeartID] = useState([]);
  const allProducts = useRef([]);
  useEffect(() => {
    getAllCart().then((res) => {
      console.log(res.data);
      setCart(res.data.carts);
      setIsLoading(() => false);
    });
    getProductsData().then((res) => (allProducts.current = res.products));
    setHeartID(JSON.parse(window.localStorage.getItem("heartID")) || []);
    setHeart(JSON.parse(window.localStorage.getItem("heart")) || []);
    console.log("cart");
  }, []);
  const handleClickAddCart = (e) => {
    const data = { data: { product_id: e.target.id, qty: qty } };
    addCart(data).then((res) => {
      if (res.success) {
        sweetAlert("success", `「${res.data.product.title}」${res.message}`);
        getAllCart().then((res) => setCart(res.data.carts));
        setQty(1);
      }
    });
  };
  const handleClickDeleteCart = (e) => {
    deleteCart(e.target.id).then((res) => {
      if (res.success) {
        const data = cart.filter((item) => item.id !== e.target.id);
        const deleteTitle = cart.filter((item) => item.id === e.target.id)[0]
          .product.title;
        sweetAlert("success", `${res.message}「${deleteTitle}」`);
        setCart(data);
      }
    });
  };
  const handleClickAddHeart = (e) => {
    // 防止最一開始的getItem回傳的資料是null導致出錯下面程式碼不能執行
    const data = JSON.parse(window.localStorage.getItem("heart")) || [];
    const dataID = JSON.parse(window.localStorage.getItem("heartID")) || [];
    // let data = heart;
    // let dataID = heartID;
    if (!heartID.includes(e.target.id)) {
      const [currentData] = allProducts.current.filter(
        (item) => item.id === e.target.id
      );
      console.log(e.target.id)
      data.push(currentData);
      dataID.push(currentData.id);
      window.localStorage.setItem("heart", JSON.stringify(data));
      window.localStorage.setItem("heartID", JSON.stringify(dataID));
      setHeart(data);
      setHeartID(dataID);
      sweetAlert(
        "success",
        `新增我的最愛`,
        `已新增「${currentData.title}」至我的最愛`
      );
    }else{
      sweetAlert('error','我的最愛已經含有此商品了！')
    }
  };
  const handleClickDeleteHeart = (e) => {
    let data = heart;
    let dataID = heartID;
    const [currentData] = allProducts.current.filter(
      (item) => item.id === e.target.id
    );
    // filter回傳新值
    data = data.filter((item) => item.id !== currentData.id);
    dataID = dataID.filter((item) => item !== currentData.id);
    window.localStorage.setItem("heart", JSON.stringify(data));
    window.localStorage.setItem("heartID", JSON.stringify(dataID));
    setHeart(data);
    setHeartID(dataID);
    sweetAlert(
      "success",
      `刪除我的最愛`,
      `已從我的最愛刪除「${currentData.title}」`
    );
  };
  return (
    <DataContext.Provider
      value={{
        isLoading,
        setIsLoading,
        cart,
        setCart,
        handleClickAddCart,
        handleClickDeleteCart,
        qty,
        setQty,
        heart,
        setHeart,
        heartID,
        setHeartID,
        handleClickAddHeart,
        handleClickDeleteHeart,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
