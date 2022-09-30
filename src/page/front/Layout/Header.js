import { Link } from "react-router-dom";
import { productLink } from "../../../utils/Data";

function Header() {
  const navLink = [
    {
      title: "關於我們",
      englishTitle: "ABOUT US",
      link: "/about",
    },
    {
      title: "預約時間",
      englishTitle: "RESERVE",
      link: "/reserve",
    },
    {
      title: "優惠卷",
      englishTitle: "Coupons",
      link: "/coupons",
    },
    {
      title: "訂單查詢",
      englishTitle: "ORDERS",
      link: "/orders",
    },
  ];

  return (
    <header className="user-header">
      <div className="container flex-jcsb">
        <Link to="/" className="logo logo-font">
          DULCE IRIS
        </Link>
        <ul className="nav-menu">
          <li className="nav-menu-allProduct">
            <Link to="/product">
              <span>所有商品</span>
              <span>SHOP ALL</span>
            </Link>
            <div className="nav-shop">
              <ul>
                <li>
                  <p className="nav-shop-title" to="/product">
                    品牌主打
                  </p>
                  <ul className="nav-shop-item">
                    {productLink.map((item) => (
                      <li key={item.title}>
                        <Link to={item.link}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <p className="nav-shop-title">優惠活動</p>
                  <ul className="nav-shop-item">
                    <li>
                      <Link to="/product/promotions">全部優惠活動</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
          {navLink.map((item) => (
            <li key={item.englishTitle}>
              <Link to={item.link}>
                <span>{item.title}</span>
                <span>{item.englishTitle}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="nav-icons">
          <li className="material-symbols-outlined">favorite</li>
          <li className="material-symbols-outlined">shopping_cart</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
