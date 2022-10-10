import currency from "../../../utils/Currency";
import { sweetAlert } from "../../../utils/SweetAlert";
import { wheelData } from "../../../utils/Data";
import { useState, useEffect, useCallback } from "react";
function Promotion() {
  const handleClick = () => {
    sweetAlert("success", "恭喜您找到隱藏折扣代碼！", "代碼：littlegift");
  };
  const [startPress, setStartPress] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [startDeg, setStartDeg] = useState(0);
  const [deg, setDeg] = useState(startDeg);
  const handleClickPress = () => {
    if (!isStart) {
      setIsStart(() => true);
      setStartPress(() => true);
    }
  };
  const getDeg = useCallback(() => {
    const perDeg = 360 / 6;
    const moreDeg = startDeg % 360;
    const picked = Math.floor(Math.random() * 6);
    const getCode = wheelData[picked];
    const currentDeg = 1800 + startDeg + picked * perDeg - moreDeg;
    setDeg(currentDeg);
    setStartDeg(currentDeg);
    setTimeout(() => {
      setIsStart(() => false);
      if (picked === 0 || picked === 2 || picked === 4) {
        sweetAlert("success", `${getCode.code}`);
      } else {
        sweetAlert(
          "success",
          `恭喜您獲得${getCode.id}%折扣`,
          `代碼：${getCode.code}`
        );
      }
    }, [4000]);
  }, [startDeg]);
  useEffect(() => {
    if (startPress) {
      getDeg();
      setStartPress(() => false);
    }
  }, [getDeg, startPress]);
  return (
    <>
      <section className="promotion container">
        <h1>PROMOTION</h1>
        <section className="promotion-wheel">
          <h2>轉盤抽抽樂</h2>
          <div className="promotion-wheel-item">
            <p>
              HEY!
              <br />
              來碰個運氣
              <br />
              抽抽看唄～
            </p>
            <div className="promotion-spin-the-wheel">
              <div className="promotion-spin-the-wheel-outside">
                <ul className="promotion-spin-the-wheel-inner">
                  {wheelData.map((item) => (
                    <li
                      style={{ transform: item.rotateDeg }}
                      key={item.id}
                      id={item.id}
                    >
                      <div>{item.title}</div>
                    </li>
                  ))}
                </ul>
                <div
                  className={`promotion-spin-the-wheel-pointer ${
                    isStart ? "no-drop" : "pointer"
                  }`}
                  onClick={handleClickPress}
                >
                  <div
                    className="promotion-spin-the-wheel-hand"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="promotion-stored">
          <h2>儲值方案</h2>
          <ul className="promotion-stored-group">
            <li className="promotion-stored-item">
              <h3>
                儲<br className="d-sm-none" />值
              </h3>
              <ul>
                <li>NT${currency(5000)}</li>
                <li>NT${currency(10000)}</li>
                <li>NT${currency(20000)}</li>
                <li>NT${currency(30000)}</li>
                <li>NT${currency(50000)}</li>
              </ul>
            </li>
            <li className="promotion-stored-item">
              <h3 className="give" onClick={handleClick}>
                送
              </h3>
              <ul>
                <li>NT${currency(500)}</li>
                <li>NT${currency(1200)}</li>
                <li>NT${currency(2500)}</li>
                <li>
                  NT${currency(3000)}
                  <span>(課程享9.5折)</span>
                </li>
                <li>
                  NT${currency(5000)}
                  <span>(課程享9折)</span>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <section>
          <h2>注意事項</h2>
          <ul className="promotion-notice">
            <li>
              <span>✩</span>儲值金福利僅可使用現金｜轉帳支付
            </li>
            <li>
              <span>✩</span>僅限會員本人使用不得轉讓會員權利
            </li>
            <li>
              <span>✩</span>臉、睫項目皆可使用
            </li>
            <li>
              <span>✩</span>可用於扣抵課程、產品購買
            </li>
            <li>
              <span>✩</span>不可退款
            </li>
            <li>
              <span>✩</span>無使用期限
            </li>
            <li>
              <span>✩</span>優惠代碼與儲值方案折扣擇一
            </li>
          </ul>
        </section>
      </section>
    </>
  );
}

export default Promotion;
