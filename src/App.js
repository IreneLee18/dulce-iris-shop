import { Routes, Route } from "react-router-dom";
import Home from "./page/front/Home/Home";
import Login from "./page/Login";
import Dashbord from "./page/Dashbord";
import Product from "./page/back/Product";
import Order from "./page/back/Order";
import Coupon from "./page/back/Coupon";
import Article from "./page/back/Article";
function App() {
  
  return (
    <>
    <Routes>
      <Route index element={<Home/>} />
      <Route path="login" element={<Login/>} />
      <Route path="back/dashbord" element={<Dashbord/>}>
        <Route index element={<Product/>}/>
        <Route path="orders" element={<Order/>}/>
        <Route path="coupons" element={<Coupon/>}/>
        <Route path="articles" element={<Article/>}/>
      </Route>
    </Routes>
    </>
  );
}

export default App;
