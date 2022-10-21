import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { DataContext } from "../../../utils/Context";
import { navAllLink, productLink } from "../../../utils/Data";
import currency from "../../../utils/Currency";

function Header() {
  const navLink = navAllLink.slice(5, 8);
  const [navToggle, setNavToggle] = useState(false);
  const navToggleDisplay = [{ left: "0px" }, { left: "-900px" }];
  const {
    cart,
    handleClickAddCart,
    handleClickDeleteCart,
    heart,
    handleClickDeleteHeart,
  } = useContext(DataContext);

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
          <li className="nav-menu-allProduct">
            <Link to="/products/所有商品">
              <span>所有商品</span>
              <span>SHOP ALL</span>
            </Link>
            <div className="nav-shop">
              <ul>
                <li>
                  <p className="nav-shop-title">品牌主打</p>
                  <ul className="nav-shop-item">
                    {productLink.map((item) => (
                      <li key={item.title}>
                        <Link to={item.link}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* <li>
                  <p className="nav-shop-title">優惠活動</p>
                  <ul className="nav-shop-item">
                    <li>
                      <Link to="/product/promotions">全部優惠活動</Link>
                    </li>
                  </ul>
                </li> */}
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
          <li className="heart">
            <span className="material-symbols-outlined">favorite</span>
            <div className="heart-count">{heart.length}</div>
            <div className="heart-items">
              {heart !== undefined && heart.length !== 0 ? (
                <ul>
                  {heart !== undefined &&
                    heart.map((item) => (
                      <li key={item.id}>
                        <div>
                          <Link to={`/product/detail/${item.id}`}>
                            <span>{item.title}</span>
                          </Link>
                        </div>
                        <div>
                          <div
                            className="material-symbols-outlined"
                            id={item.id}
                            onClick={handleClickAddCart}
                          >
                            shopping_cart
                          </div>
                          <div
                            className="material-symbols-outlined"
                            id={item.id}
                            onClick={handleClickDeleteHeart}
                          >
                            delete
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <p>
                  目前沒有喜愛項目唷～
                  <br />
                  <br />
                  請去新增點東西
                </p>
              )}
            </div>
          </li>
          <li className="cart">
            {cart.length === 0 ? (
              <span
                className="material-symbols-outlined"
                style={{ cursor: "default" }}
              >
                shopping_cart
              </span>
            ) : (
              <Link to="/cart">
                <span className="material-symbols-outlined">shopping_cart</span>
              </Link>
            )}
            <div className="cart-count">{cart.length}</div>
            <div className="cart-items">
              {cart !== undefined && cart.length !== 0 ? (
                <ul>
                  {cart !== undefined &&
                    cart.map((item) => (
                      <li key={item.product.id}>
                        <div>
                          <Link to={`/product/detail/${item.product.id}`}>
                            <span>{item.product.title}</span>
                          </Link>
                          <span>x</span>
                          <span>{currency(item.qty)}</span>
                        </div>
                        <div
                          className="material-symbols-outlined"
                          id={item.id}
                          onClick={handleClickDeleteCart}
                        >
                          delete
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <p>
                  目前購物車是空的唷～
                  <br />
                  <br />
                  請去新增點東西
                </p>
              )}
            </div>
          </li>
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
