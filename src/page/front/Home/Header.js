import { Link } from "react-router-dom";

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

  const productLink = [
    {
      title: "養肌課程系列",
      link: "/product/face",
    },
    {
      title: "睫毛課程系列",
      link: "/product/eye",
    },
    {
      title: "居家保養系列",
      link: "/product/home",
    },
  ];
  const discountLink = [
    {
      title: "養肌課程系列",
      link: "/product/face",
    },
    {
      title: "睫毛課程系列",
      link: "/product/eye",
    },
    {
      title: "居家保養系列",
      link: "/product/home",
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
                    <Link className="nav-shop-title" to="/product">
                      品牌主打
                    </Link>
                    <ul className="nav-shop-item">
                      {productLink.map((item) => (
                        <li key={item.title}>
                          <Link to={item.link}>{item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <Link className="nav-shop-title" to="/product">
                      優惠活動
                    </Link>
                    <ul className="nav-shop-item">
                      {discountLink.map((item) => (
                        <li key={item.title}>
                          <Link to={item.link}>{item.title}</Link>
                        </li>
                      ))}
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
  )
}

export default Header