import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../../utils/Context";
import Loading from "../../../components/Loading";
function Layout() {
  const { isLoading } = useContext(DataContext);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <main className="user-main">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default Layout;
