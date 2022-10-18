import { Routes, Route } from "react-router-dom";
// front
import Layout from "./page/front/Layout/Layout";
import Home from "./page/front/Home/Home";
import Products from "./page/front/Product/Products";
import ProductDetail from "./page/front/Product/ProductDetail";
import Promotion from "./page/front/Promotion/Promotion";
import About from "./page/front/About/About";
import Reserve from "./page/front/Reserve/Reserve";
import Cart from "./page/front/Cart/Cart";
import CartCheck from "./page/front/Cart/CartStep/CartCheck";
import CartInfo from "./page/front/Cart/CartStep/CartInfo";
import CartFinish from "./page/front/Cart/CartStep/CartFinish";
import Login from "./page/Login/Login";
//back
import Dashboard from "./page/back/Layout/Dashboard";
import Product from "./page/back/Product/Product";
import CreateProduct from "./page/back/Product/CreateProduct";
import Order from "./page/back/Order/Order";
import Coupon from "./page/back/Coupon/Coupon";
import CreateCoupon from "./page/back/Coupon/CreateCoupon";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products/:ID" element={<Products />} />
          <Route path="product/detail/:ID" element={<ProductDetail />} />
          <Route path="promotion" element={<Promotion />} />
          <Route path="about" element={<About />} />
          <Route path="reserve" element={<Reserve />} />
          <Route path="cart" element={<Cart />}>
            <Route index element={<CartCheck />} />
            <Route path="info" element={<CartInfo />} />
            <Route path=":ID" element={<CartFinish />} />
            <Route path="finish" element={<CartFinish />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="back/dashboard" element={<Dashboard />}>
          <Route path="products" element={<Product />} />
          <Route path="product/:ID" element={<CreateProduct />} />
          <Route path="orders" element={<Order />} />
          <Route path="coupons" element={<Coupon />} />
          <Route path="coupon/:ID" element={<CreateCoupon />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
