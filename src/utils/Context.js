import { createContext, useEffect, useState } from "react";
import { getAllCart, addCart,deleteCart } from "./API";
import { sweetAlert } from "./SweetAlert";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [qty, setQty] = useState(1);
  useEffect(() => {
    getAllCart().then((res) => {
      console.log(res.data);
      setCart(res.data.carts);
      setIsLoading(() => false);
    });
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
  const handleClickDelete = (e) => {
    deleteCart(e.target.id).then((res) => {
      if (res.success) {
        const data = cart.filter((item) => item.id !== e.target.id);
        const deleteTitle = cart.filter((item) => item.id === e.target.id)[0].product.title
        sweetAlert('success',`${res.message}「${deleteTitle}」`);
        setCart(data);
      }
    });
  };
  return (
    <DataContext.Provider
      value={{
        cart,
        setCart,
        isLoading,
        setIsLoading,
        handleClickAddCart,
        handleClickDelete,
        qty,
        setQty,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
