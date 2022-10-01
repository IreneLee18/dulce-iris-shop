import { useCallback, useEffect, useState } from "react";
let today = {};
let calendar = {};
const day = ["日", "一", "二", "三", "四", "五", "六"];

function Calendar() {
  const [calendarAll, setCalendarAll] = useState([]);
  const init = () => {
    const data = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      date: new Date().getDate(),
      day: new Date().getDay(),
    };
    today = data;
    calendar = data;
  };
  const getCalendar = useCallback(() => {
    init();
    const monthFirstDate = new Date(calendar.year, calendar.month, 1);
    const firstDate = new Date(
      calendar.year,
      calendar.month,
      1 - monthFirstDate.getDay()
    );
    const calendarFirstDate = {
      year: firstDate.getFullYear(),
      month: firstDate.getMonth(),
      date: firstDate.getDate(),
      day: firstDate.getDay(),
    };
    const data = [];
    let date;
    for (let i = 0; i < 42; i++) {
      date = new Date(
        calendarFirstDate.year,
        calendarFirstDate.month,
        calendarFirstDate.date + i
      );
      data.push({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        day: date.getDay(),
      });
    }
    const finalData = [
      data.slice(0, 7),
      data.slice(7, 14),
      data.slice(14, 21),
      data.slice(21, 28),
      data.slice(28, 35),
      data.slice(35, 42),
    ];
    return finalData;
  }, []);
  useEffect(() => {
    setCalendarAll(getCalendar());
  }, [getCalendar]);
  return (
    <>
      <div className="calendar container">
        <h2>
          {today.year}/{today.month + 1}月
        </h2>
        <ul className="day">
          {day.map((day) => (
            <li key={Math.random()}>{day}</li>
          ))}
        </ul>
        {calendarAll.map((week, i) => (
          <ul className="week" key={Math.random() + i}>
            {week.map((item, i) => (
              <li key={Math.random() + i}>
                {" "}
                <span
                  className={`
                    ${
                      Number(item.date) === Number(today.date) &&
                      Number(item.month) === Number(today.month)
                        ? "today"
                        : ""
                    }${item.month !== calendar.month ? "other" : ""}`}
                >
                  {item.date}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </>
  );
}

export default Calendar;
