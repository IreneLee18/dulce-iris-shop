import React from "react";
import { Link, Outlet } from "react-router-dom";

function Dashbord() {
  const navLink = [
    {
      title: "產品",
      englishTitle: "PRODUCT",
      link: "/back/dashbord",
    },
    {
      title: "訂單",
      englishTitle: "ORDERS",
      link: "/back/dashbord/orders",
    },
    {
      title: "優惠卷",
      englishTitle: "COUPONS",
      link: "/back/dashbord/coupons",
    },
    {
      title: "文章",
      englishTitle: "ARTICLES",
      link: "/back/dashbord/articles",
    },
  ];
  return (
    <>
      <header className="dashbord-header">
        <ul>
          {navLink.map((item) => (
            <li key={item.englishTitle}>
              <Link to={item.link}>{item.title}</Link>
              <Link to={item.link}>{item.englishTitle}</Link>
            </li>
          ))}
        </ul>
      </header>
      <main className="dashbord-main">
        <Outlet />
      </main>
      <footer className="dashbord-footer">
        <p>COPYRIGHT © 2022 IreneLee. All rights reserved.</p>
        <div>
          <span className="material-symbols-outlined logout-icon">logout</span>
        </div>
      </footer>
    </>
  );
}

export default Dashbord;
