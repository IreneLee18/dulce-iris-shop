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
    if (window.localStorage.getItem("heartID")) {
      setHeartID(JSON.parse(window.localStorage.getItem("heartID")));
    }
    if (window.localStorage.getItem("heart")) {
      setHeart(JSON.parse(window.localStorage.getItem("heart")));
    }
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
    const data = JSON.parse(window.localStorage.getItem("heart"));
    const dataID = JSON.parse(window.localStorage.getItem("heartID"));
    const currentData = allProducts.current.filter(
      (item) => item.id === e.target.id
    );
    data.push(currentData[0]);
    dataID.push(currentData[0].id);
    window.localStorage.setItem("heartID", JSON.stringify(dataID));
    window.localStorage.setItem("heart", JSON.stringify(data));
    // setHeart(data);
    // setHeartID(dataID);
    setHeart(JSON.parse(window.localStorage.getItem("heart")));
    setHeartID(JSON.parse(window.localStorage.getItem("heartID")));
    console.log(data, dataID, "heart", heart, heartID);
    sweetAlert(
      "success",
      `新增我的最愛`,
      `已新增「${currentData[0].title}」至我的最愛`
    );
  };
  const handleClickDeleteHeart = (e) => {
    let data = JSON.parse(window.localStorage.getItem("heart"));
    let dataID = JSON.parse(window.localStorage.getItem("heartID"));
    const currentData = allProducts.current.filter(
      (item) => item.id === e.target.id
    );
    data = data.filter((item) => item.id !== currentData[0].id);
    dataID = dataID.filter((item) => item !== currentData[0].id);
    window.localStorage.setItem("heartID", JSON.stringify(dataID));
    window.localStorage.setItem("heart", JSON.stringify(data));
    // setHeart(data);
    // setHeartID(dataID);
    setHeart(JSON.parse(window.localStorage.getItem("heart")));
    setHeartID(JSON.parse(window.localStorage.getItem("heartID")));
    console.log(data, dataID, "heart", heart, heartID);
    sweetAlert(
      "success",
      `刪除我的最愛`,
      `已從我的最愛刪除「${currentData[0].title}」`
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
