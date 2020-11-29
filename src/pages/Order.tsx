import React, {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Button from 'components/Button'
import getDayOption from 'modules/calcurateDayOption';
import {resultType} from 'modules/calcurateDayOption';
import { RootState } from 'reducers';

export default function OrderOption() {

  const [monthList, dayList, hourList, minList, thisMonth, thisDay, thisHour]:resultType = getDayOption;
  const {itemList} = useSelector((state:RootState)=>state.OrderReducer)
  //마운트시 한번만 실행
  useEffect(() => {
    // return () => {
    // };
    console.log(itemList)
  }, []);

  return (
    <div id="wrap" className="Order-wrap">
      <div className="mb-view verCenter">
        <h2>주문 옵션 설정</h2>

        <h3>선호하는 거래처가 있으신가요?</h3>
        <ul className="flex Order-selList1">
          <li className="flex">
            <div className="labelStyle">
              <input type="radio" id="fav1" name="favoriteMarket"/>
              <label htmlFor="fav1"></label>
            </div>
            <input type="text"/>
          </li>
          <li>
            <input type="radio" id="fav2" name="favoriteMarket"/>
            <label htmlFor="fav2"></label>
            <span>아니오</span>
          </li>
        </ul>

        <h3>언제 받으시겠어요?</h3>
        <div className="flex Order-selList2">
          <select defaultValue={thisMonth}>
            {monthList && monthList.map((month:string)=>{
              return <option key={`month${month}`}>{month}</option>
            })}
          </select>
          <span>월</span>
          <select defaultValue={thisDay}>
            {dayList && dayList.map((day:string)=>{
              return <option key={`day${day}`}>{day}</option>
            })}
          </select>
          <span>일</span>
          <select  defaultValue={thisHour}>
            {hourList && hourList.map((hour:string)=>{
              return <option key={`hour${hour}`}>{hour}</option>
            })}
          </select>
          <span>시</span>
          <select>
            {minList && minList.map((min:string)=><option key={`min${min}`}>{min}</option>)}
          </select>
          <span>분</span>
        </div>

        <h3>어떻게 결제하시겠어요?</h3>
        <div className="warning_text">오다맨 결제는 현장결제로 이뤄집니다</div>
        <ul className="flex Order-selList3">
          <li className="labelStyle">
            <input type="radio" id="pay1" name="payment"/>
            <label htmlFor="pay1"></label>
            <span>카드결제</span>
          </li>
          <li className="labelStyle">
            <input type="radio" id="pay1" name="payment"/>
            <label htmlFor="pay1"></label>
            <span>현금결제</span>
          </li>
        </ul>
        <Link to="/signup" className="Login-submitBtn">
          <Button>주문완료</Button>
        </Link>
      </div>
    </div>
  )
}
