import { Link } from "react-router-dom";
import { useState } from "react";
import { navAllLink, productLink } from "../../../utils/Data";

function Header() {
  const navLink = navAllLink.slice(5, 8);
  const [navToggle, setNavToggle] = useState(false);
  const navToggleDisplay = [{ left: "0px" }, { left: "-800px" }];
  return (
    <header className="user-header">
      <div className="container flex-jcsb">
        <span
          className="nav-toggle material-symbols-outlined"
          onClick={() => setNavToggle((prev) => !prev)}
        >
          reorder
        </span>
        <Link to="/" className="logo logo-font">
          DULCE IRIS
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/about">
              <span>關於我們</span>
              <span>ABOUT US</span>
            </Link>
          </li>
          <li className="nav-menu-allProduct">
            <Link to="/products">
              <span>所有商品</span>
              <span>SHOP ALL</span>
            </Link>
            <div className="nav-shop">
              <ul>
                <li>
                  <p className="nav-shop-title">
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
      <div
        className="sm-nav-menu"
        style={navToggle ? navToggleDisplay[0] : navToggleDisplay[1]}
      >
        <div
          className="close-nav material-symbols-outlined"
          onClick={() => setNavToggle((prev) => !prev)}
        >
          close
        </div>
        <ul>
          {navAllLink.map((item) => (
            <li key={item.englishTitle}>
              <Link to={item.link}>
                <span>{item.title}</span>
                <span>{item.englishTitle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;
