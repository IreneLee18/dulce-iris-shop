import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
function Layout() {
  // 切換頁面都跳到最上面
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <>
        <Header />
        <main className="user-main">
          <Outlet />
        </main>
        <Footer />
      </>
    </>
  );
}

export default Layout;
