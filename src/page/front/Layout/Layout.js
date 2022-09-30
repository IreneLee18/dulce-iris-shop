import Header from "./Header";
import Footer from "./Footer";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { DataContext } from "../../../utils/Context";
import Loading from "../../../components/Loading";

function Layout() {
  const { isLoading, setIsLoading } = useContext(DataContext);
  useEffect(() => {
    setTimeout(()=>{
      setIsLoading(() => false);
    },[2000])
  }, []);
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
