import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="dashbord-footer">
      <p>COPYRIGHT © 2022 IreneLee. All rights reserved.</p>
      <p className="mt10">
        僅供個人練習，無商業用途｜<Link to="/login">管理員登入</Link>
      </p>
    </footer>
  );
}

export default Footer;
