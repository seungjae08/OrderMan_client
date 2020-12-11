type DateProps = {
  dates: string[]
  todayOrder: boolean
  nowdate: string
  setNowdate: (e: string) => void
  setTodayOrder: (e: boolean) => void
}

export const Date = ({ dates, nowdate, setNowdate, todayOrder, setTodayOrder }: DateProps) => {
  return (
    <div id="Date-wrap">
      <h2 className="order-listSelect-text">{(dates.length > 0) ? "구매 목록 선택" : ""}</h2>
      {(todayOrder) ? "" : <button className="today" onClick={() => { setNowdate(""); setTodayOrder(true) }}>
        오늘의주문</button>}

      <p className="orderlist">주문 목록</p>
      <div className="Main-Date">
        <div id="slide-wrap">
          <div className="scroll-container">
            {dates.map((ele) => {
              return ((ele === nowdate) ?
                <button>
                  <p>{ele.slice(3, 5) + "-" + ele.slice(6)}</p>
                </button>
                :
                <button onClick={() => {
                  setNowdate(ele);
                  setTodayOrder(false);
                }}>
                  <p>{ele.slice(3, 5) + "-" + ele.slice(6)}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

    </div>
  )
}