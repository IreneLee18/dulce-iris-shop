import { createContext, useEffect, useState, useRef } from "react";
import { getProductsData, getAllCart, addCart, deleteCart } from "./API";
import { sweetAlert } from "./SweetAlert";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [checkCartID, setCheckCartID] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [heart, setHeart] = useState([]);
  const [heartID, setHeartID] = useState([]);
  const allProducts = useRef([]);
  useEffect(() => {
    getAllCart().then((res) => {
      setCart(res.data.carts);
      setTotalPrice(res.data.total);
      setFinalPrice(Math.ceil(res.data.final_total));
      console.log(res);
      setIsLoading(() => false);
    });
    getProductsData().then((res) => (allProducts.current = res.products));
    setHeartID(JSON.parse(window.localStorage.getItem("heartID")) || []);
    setHeart(JSON.parse(window.localStorage.getItem("heart")) || []);
  }, []);
  const handleClickAddCart = (e) => {
    const data = { data: { product_id: e.target.id, qty: qty } };
    addCart(data).then((res) => {
      if (res.success) {
        sweetAlert("success", `「${res.data.product.title}」${res.message}`);
        getAllCart().then((res) => {
          setCart(res.data.carts);
          setTotalPrice(res.data.total);
          setFinalPrice(Math.ceil(res.data.final_total));
        });
        setQty(1);
      }
    });
  };
  const handleClickDeleteCart = (e) => {
    deleteCart(e.target.id).then((res) => {
      if (res.success) {
        // const data = cart.filter((item) => item.id !== e.target.id);
        const deleteTitle = cart.filter((item) => item.id === e.target.id)[0]
          .product.title;
        sweetAlert("success", `${res.message}「${deleteTitle}」`);
        getAllCart().then((res) => {
          setCart(res.data.carts);
          setTotalPrice(res.data.total);
          setFinalPrice(Math.ceil(res.data.final_total));
        });
        // setCart(data);
      }
    });
  };
  const handleClickAddHeart = (e) => {
    if (!heartID.includes(e.target.id)) {
      const [currentData] = allProducts.current.filter(
        (item) => item.id === e.target.id
      );
      const data = [...heart, currentData];
      const dataID = [...heartID, currentData.id];
      window.localStorage.setItem("heart", JSON.stringify(data));
      window.localStorage.setItem("heartID", JSON.stringify(dataID));
      setHeart(data);
      setHeartID(dataID);
      sweetAlert(
        "success",
        `新增我的最愛`,
        `已新增「${currentData.title}」至我的最愛`
      );
    } else {
      sweetAlert("error", "我的最愛已經含有此商品了！");
    }
  };
  const handleClickDeleteHeart = (e) => {
    const [currentData] = allProducts.current.filter(
      (item) => item.id === e.target.id
    );
    // filter回傳新值
    const data = heart.filter((item) => item.id !== currentData.id);
    const dataID = heartID.filter((item) => item !== currentData.id);
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
        totalPrice,
        setTotalPrice,
        finalPrice,
        setFinalPrice,
        handleClickAddCart,
        handleClickDeleteCart,
        checkCartID,
        setCheckCartID,
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
