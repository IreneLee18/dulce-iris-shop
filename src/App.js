import { Routes, Route } from "react-router-dom";
import Layout from "./page/front/Layout/Layout";
import Home from "./page/front/Home/Home";
import About from "./page/front/About/About";
import Reserve from "./page/front/Reserve/Reserve";
import Login from "./page/Login/Login";
import Dashbord from "./page/back/Layout/Dashbord";
import Product from "./page/back/Product";
import Order from "./page/back/Order";
import Coupon from "./page/back/Coupon";
import Article from "./page/back/Article";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="reserve" element={<Reserve/>}/>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="back/dashbord" element={<Dashbord />}>
          <Route index element={<Product />} />
          <Route path="orders" element={<Order />} />
          <Route path="coupons" element={<Coupon />} />
          <Route path="articles" element={<Article />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
