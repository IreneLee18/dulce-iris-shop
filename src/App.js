import { Routes, Route } from "react-router-dom";
import Home from "./page/front/Home/Home";
import Login from "./page/Login/Login";
import Dashbord from "./page/back/Dashbord";

function App() {
  
  return (
    <>
    <Routes>
      <Route index element={<Home/>} />
      <Route path="login" element={<Login/>} />
      <Route path="back/dashbord" element={<Dashbord/>} />
    </Routes>
    </>
  );
}

export default App;
