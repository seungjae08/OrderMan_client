import React, {useRef, useState, useEffect, useCallback, ChangeEvent} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Button from 'components/Button'
import getDayOption from 'modules/calcurateDayOption';
import { resultType } from 'modules/calcurateDayOption';
import { RootState } from 'reducers';
import { changeMarketMobile } from 'reducers/order';

export default function Order() {

  const dispatch = useDispatch();

  const [monthList, dayList, hourList, minList, thisMonth, thisDay, thisHour]:resultType = getDayOption;

  const [inputs, setInputs] = useState({
    marketMobile:"",
  });

  const marketMobile = useSelector((state:RootState)=>state.OrderReducer.market.mobile);

  const marketRadio1 = useRef<HTMLInputElement>(null);
  const marketRadio2 = useRef<HTMLInputElement>(null);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name === "marketMobile"){
      if (!marketRadio1.current) {
        return;
      }
      marketRadio1.current.checked = true; 
    }
    setInputs((inputs) => ({
      ...inputs,
      [name]: value
    }));
  },[])

  const dispatchChangeMarket = function(){
    if (!marketRadio1.current) {
      return;
    }
    if(marketRadio1.current.checked===true && inputs.marketMobile !== ""){
      dispatch(changeMarketMobile(inputs.marketMobile))
    }else{
      dispatch(changeMarketMobile(null))
      if (!marketRadio2.current) {
        return;
      }
      marketRadio2.current.checked = true; 
    }
  }

  useEffect(() => {
    console.log('마운트')
    if(marketMobile!=="" && marketMobile!==null){
      setInputs(inputs=>({
        ...inputs,
        marketMobile:marketMobile
      }));
      if (!marketRadio1.current) {
        return;
      }
      marketRadio1.current.checked = true; 
    }else{
      if (!marketRadio2.current) {
        return;
      }
      marketRadio2.current.checked = true; 
    }
  }, [marketMobile]);


  return (
    <div id="wrap" className="Order-wrap">
      <div className="mb-view verCenter">
        <h2>주문 옵션 설정</h2>

        <h3>선호하는 거래처가 있으신가요?</h3>
        <ul className="flex Order-selList1" onBlur={dispatchChangeMarket}>
          <li className="flex">
            <div className="labelStyle">
              <input type="radio" id="fav1" name="favoriteMarket" ref={marketRadio1}/>
              <label htmlFor="fav1"></label>
            </div>
            <input type="text" value={inputs.marketMobile} onChange={onChange} name="marketMobile"/>
          </li>
          <li>
            <input type="radio" id="fav2" name="favoriteMarket"  ref={marketRadio2}/>
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
            <input type="radio" id="pay1" name="payment" defaultChecked/>
            <label htmlFor="pay1"></label>
            <span>카드결제</span>
          </li>
          <li className="labelStyle">
            <input type="radio" id="pay1" name="payment"/>
            <label htmlFor="pay1"></label>
            <span>현금결제</span>
          </li>
        </ul>
        <div>
          <Button>주문완료</Button>
        </div>
      </div>
    </div>
  )
}
