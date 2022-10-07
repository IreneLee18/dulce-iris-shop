import React from "react";
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
  const navLink = [
    {
      title: "產品",
      englishTitle: "PRODUCT",
      link: "/back/dashboard/product",
    },
    {
      title: "訂單",
      englishTitle: "ORDERS",
      link: "/back/dashboard/orders",
    },
    {
      title: "優惠卷",
      englishTitle: "COUPONS",
      link: "/back/dashboard/coupons",
    },
    {
      title: "文章",
      englishTitle: "ARTICLES",
      link: "/back/dashboard/articles",
    },
  ];
  return (
    <>
      <header className="dashboard-header">
        <ul>
          {navLink.map((item) => (
            <li key={item.englishTitle}>
              <Link to={item.link}>{item.title}</Link>
              <Link to={item.link}>{item.englishTitle}</Link>
            </li>
          ))}
        </ul>
      </header>
      <main className="dashboard-main">
        <Outlet />
      </main>
      <footer className="dashboard-footer">
        <p>COPYRIGHT © 2022 IreneLee. All rights reserved.</p>
        <div>
          <span className="material-symbols-outlined logout-icon">logout</span>
        </div>
      </footer>
    </>
  );
}

export default Dashboard;
