import { Routes, Route } from "react-router-dom";
import Layout from "./page/front/Layout/Layout";
import Home from "./page/front/Home/Home";
import Products from "./page/front/Product/Products";
import ProductDetail from "./page/front/Product/ProductDetail";
import About from "./page/front/About/About";
import Reserve from "./page/front/Reserve/Reserve";
import Login from "./page/Login/Login";
import Dashboard from "./page/back/Layout/Dashboard";
import Product from "./page/back/Product/Product";
import CreateProduct from "./page/back/Product/CreateProduct";
import Order from "./page/back/Order";
import Coupon from "./page/back/Coupon/Coupon";
import CreateCoupon from "./page/back/Coupon/CreateCoupon";
import Article from "./page/back/Article";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
            <Route path="products/:ID" element={<Products />} />
            <Route path="product/detail/:ID" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
          <Route path="reserve" element={<Reserve />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="back/dashboard" element={<Dashboard />}>
          <Route path="products" element={<Product />} />
          <Route path="product/:ID" element={<CreateProduct />} />
          <Route path="orders" element={<Order />} />
          <Route path="coupons" element={<Coupon />} />
          <Route path="coupon/:ID" element={<CreateCoupon />} />
          <Route path="articles" element={<Article />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
