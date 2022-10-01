import Calendar from "./Component/Calendar";

function Reserve() {
  return (
    <>
      <section className="reserve-calendar">
        <Calendar />
      </section>
      <section>
        <div className="reserve container">
          <div>
            <h2>注意事項</h2>
            <div>
              <h3>採預約制服務，確保每位顧客權益</h3>
              <p>遲到10分鐘是同取消預約！空間有限請勿攜伴、寵物。</p>
              <p>體溫超過37.5°c將不提供服務請見諒</p>
            </div>
            <div className="list">
              <ul>
                <li>
                  <span className="list-icon">✦</span>可預約時段：上午11:00 ～
                  下午08:30
                </li>
                <li>
                  <div>
                    <span className="list-icon">✦</span>消費可使用
                  </div>
                  <ul className="payment">
                    <li>✔︎現金</li>
                    <li>✔︎轉帳</li>
                    <li>✔︎儲值金</li>
                    <li>✔︎LinePay(2000up)</li>
                  </ul>
                </li>
                <li>
                  <div>
                    <span className="list-icon">✦</span>預約請給予
                  </div>
                  <ul className="reserve-supply-info">
                    <li>❶預約項目(課程時常不依，能約時間也不同)</li>
                    <li>❷按排序提供2-3個想預約的日期、時段</li>
                    <li>❸中文全名</li>
                    <li>❹行動電話</li>
                  </ul>
                  <div>才能快速幫您安排٩(๑•̀ω•́๑)۶</div>
                </li>
                <li>
                  <span className="list-icon">✦</span>
                  完成預約後要修改盡量於「2天前」告知
                </li>
                <li>
                  <span className="list-icon">✦</span>
                  臨時預約當天、隔天時段卡位者，取消、改時間視同「無故未到顧客」
                </li>
                <li>
                  <span className="list-icon">✦</span>
                  遲到未抵達、無故未到爾後預約須先匯訂金$500，可於當日課堂扣除，反之則沒收
                </li>
                <li>
                  <span className="list-icon">✦</span>
                  可戴隱形眼鏡，盡量勿帶抗油水眼妝
                </li>
                <li>
                  <div>
                    <span className="list-icon">✦</span>
                    有施作部位發炎、傷口、不適狀況，請先以治療養傷為優先，並聯繫延期、取消
                  </div>
                  <div className="warring">
                    為保障所有客人安全權益，若隱瞞未盡告知義務當日發現，將拒絕施作且收取場地及時間預留費用$1000
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Reserve;
