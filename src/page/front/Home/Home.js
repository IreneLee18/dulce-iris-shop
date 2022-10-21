import Slider from "./Component/Slider/Slider";
import { useNavigate } from "react-router-dom";
import { sweetAlert } from "../../../utils/SweetAlert";

import { useEffect, useState } from "react";
function Home() {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState({
    suggest: false,
    about: false,
  });
  const [subscribe, setSubscribe] = useState("");
  const handleClickSubscribe = () => {
    if (
      subscribe.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g) &&
      subscribe !== ""
    ) {
      sweetAlert("success", "訂閱成功", "恭喜獲得折扣碼：subscribeus");
      setSubscribe("");
    } else {
      sweetAlert("error", "請輸入正確Email");
    }
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.screen.width <= 414) {
        console.log(window.scrollY,window.innerHeight)
      } else if (window.screen.width <= 820 && window.screen.width > 414) {
        console.log(window.scrollY,window.innerHeight)
      } else {
        console.log(window.scrollY,window.innerHeight)

      }
    });
    window.addEventListener("scroll", () => {
      console.log(window.scrollY,window.innerHeight)
      if (
        window.scrollY > Math.ceil(window.innerHeight / 3) &&
        window.scrollY < Math.ceil(window.innerHeight * 1.7)
      ) {
        setScroll((state) => ({ ...state, suggest: true }));
        setScroll((state) => ({ ...state, about: false }));
      } else {
        setScroll((state) => ({ ...state, suggest: false }));
        setScroll((state) => ({ ...state, about: true }));
      }
    });
  });
  return (
    <>
      <section>
        <Slider />
      </section>
      <div className="home-background">
        <section style={{ background: "#fff" }}>
          <h2 className="home-item-title">推薦商品</h2>
          <div className="skin-product">
            <ul className="container">
              <li className="skin-product-item algal-needle">
                <div
                  className={
                    scroll.suggest
                      ? "skin-product-text"
                      : "skin-product-none-text"
                  }
                >
                  <h3>微晶澡針煥膚</h3>
                  <ul>
                    <li>促進角質更新</li>
                    <li>刺激膠原蛋白</li>
                    <li>收細毛孔</li>
                    <li>油脂調理</li>
                    <li>淨化色素</li>
                    <li>改善細紋</li>
                  </ul>
                </div>
                <div
                  className={
                    scroll.suggest
                      ? "skin-product-image"
                      : ""
                  }
                  onClick={() =>
                    navigate("/product/detail/-NDhnTNfNsJ09JRnCZhu")
                  }
                ></div>
              </li>
              <li className="skin-product-item korea-skincare">
                <div
                  className={
                    scroll.suggest
                      ? "skin-product-image"
                      : ""
                  }
                  onClick={() =>
                    navigate("/product/detail/-NDhmIhfGQhM6KsbFqhh")
                  }
                ></div>
                <div
                  className={
                    scroll.suggest
                      ? "skin-product-text"
                      : "skin-product-none-text"
                  }
                >
                  <h3>ES養膚課程</h3>
                  <ul>
                    <li>活絡膠原蛋白增生</li>
                    <li>延緩肌膚老化緊緻拉提</li>
                    <li>調節油水平衡補水透亮</li>
                    <li>快速補水滲透精華至基底層</li>
                    <li>緊實毛孔幫助肌膚恢復彈性</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section>
          <h2 className="home-item-title" style={{ background: "#fff" }}>
            品牌起源
          </h2>
          <p className="home-about-text">
            西班牙文， DULCE為甜美之意， IRIS為鳶尾花，又稱彩虹花、伊麗絲，
            希臘人認為彩虹化身的伊麗絲， 是天神與凡間傳遞好訊息 － 愛的天使，
            希望能成為如同伊麗絲的存在， 把這份愛、美麗及幸福傳遞給大家。
          </p>
        </section>
        <section style={{ background: "#fff" }}>
          <h2 className="home-item-title">關於DULCE IRIS</h2>
          <div className="home-about">
            <div className="home-logo"></div>
            <div className="home-about-text-group">
              <p
                className={
                  scroll.about ? "home-about-text" : "home-about-none-text"
                }
              >
                我的龜毛，吹毛求疵，品質堅持，品牌初衷， 追蹤我的朋友都知道，
                DULCE IRIS 所提供的任何服務， 不是低價優勢，而是品質保證，
                每一步的選擇，只為給您最好的。
              </p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="home-item-title">訂閱DULCE IRIS</h2>
          <div className="home-subscribe container">
            <p>
              想要獲得最新消息嗎？
              <br />
              <br />
              那就快點來訂閱我們吧！
            </p>
            <label htmlFor="">
              <input
                type="text"
                placeholder="請輸入 Email"
                value={subscribe}
                onChange={(e) => setSubscribe(e.target.value.trim())}
              />
              <button onClick={handleClickSubscribe}>訂閱</button>
            </label>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
