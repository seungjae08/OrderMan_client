import React, {useRef, useState, useEffect, useCallback, ChangeEvent, MouseEvent} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {serverPath} from 'modules/serverPath';
import axios from 'axios';
import Button from 'components/Button'
import getDayOption from 'modules/calcurateDayOption';
import { resultType, validateOrderDate} from 'modules/calcurateDayOption';
import { RootState } from 'reducers';
import { changeMarketMobile, changePayment, changeDeliveryTime } from 'reducers/order';

export default function Order() {

  const dispatch = useDispatch();

  const [hourList, minList, toDay, nextDay, afterTomorrow]:resultType = getDayOption;

  const [inputs, setInputs] = useState({
    marketMobile:"",
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [selectOption, setSelectOption] = useState({
    date:"당일",
    hour:"10",
    min:"00"
  })

  const marketMobile = useSelector((state:RootState)=>state.OrderReducer.market.mobile);
  const OrderOption = useSelector((state:RootState)=>state.OrderReducer.option);

  const marketRadio1 = useRef<HTMLInputElement>(null);
  const marketRadio2 = useRef<HTMLInputElement>(null);
  const marketPayment1 = useRef<HTMLInputElement>(null);
  const marketPayment2 = useRef<HTMLInputElement>(null);

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

  const onHandleChangeSelect = useCallback((e:ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectOption((selectOption) => ({
    ...selectOption,
    [name]: value
    }));
  },[]);
  

  const onValidateDate = function(){
    let date = '';
    if(selectOption.date === "당일"){
      date = toDay;
    }else if(selectOption.date === "익일"){
      date = nextDay;
    }else {
      date = afterTomorrow;
    }

    let result = validateOrderDate(`${date} ${selectOption.hour}:${selectOption.min}`); 
    if(result){
      setErrorMsg('');
      dispatch(changeDeliveryTime(`${date.slice(2)} ${selectOption.hour}:${selectOption.min}`))
    }else{
      setErrorMsg('배송 가능 시간: 오전 11시 이전 주문 - 당일 오후부터 가능, 오후 5시 이전 주문 - 익일 오전부터 가능, 오후 5시 이후 주문 - 익일 오후부터 가능')
    }
  }

  const onChangePayment = useCallback((event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>)=>{
    let value = (event.target as HTMLInputElement).value;
    dispatch(changePayment(value))
  },[dispatch]);

  const onSubmitOrderOption = useCallback((event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>)=>{
    
    //배송시간을 다시 설정해야 할 경우
    if(errorMsg !== ""){
      return;
    }
    console.log('주문들어갑니다');

    axios.post(serverPath + '/order/market',{
      mobile: marketMobile
    },{ withCredentials: true }).then(res=>{
      console.log(res);
    })
    axios.post(serverPath + '/order/option',{
      payment:OrderOption.payment,
      deliveryTime: OrderOption.deliveryTime
    },{ withCredentials: true }).then(res=>{
      console.log(res);
    })
  },[errorMsg, marketMobile, OrderOption]);

  //marketMobile
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

  //한번만 실행
  useEffect(() => {
    onValidateDate();
  }, []);
  
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
        <div className="flex Order-selList2" onBlur={onValidateDate}>
          <select style={{marginRight:'10px'}} value={selectOption.date} onChange={onHandleChangeSelect} name="date">
            <option>당일</option>
            <option>익일</option>
            <option>모레</option>
          </select>
          <select value={selectOption.hour} onChange={onHandleChangeSelect} name="hour">
            {hourList && hourList.map((hour:string)=>{
              return <option key={`hour${hour}`}>{hour}</option>
            })}
          </select>
          <span>시</span>
          <select value={selectOption.min} onChange={onHandleChangeSelect} name="min">
            {minList && minList.map((min:string)=><option key={`min${min}`}>{min}</option>)}
          </select>
          <span>분</span>
        </div>
        {
          errorMsg && 
          <div className="warning_text" style={{marginTop:'10px'}}>{errorMsg}</div>
        }
        <h3>어떻게 결제하시겠어요?</h3>
        <div className="warning_text">오다맨 결제는 현장결제로 이뤄집니다</div>
        <ul className="flex Order-selList3">
          <li className="labelStyle">
            <input type="radio" id="pay1" name="payment" ref={marketPayment1} defaultChecked value="card"  onClick={onChangePayment}/>
            <label htmlFor="pay1"></label>
            <span>카드결제</span>
          </li>
          <li className="labelStyle">
            <input type="radio" id="pay2" name="payment" ref={marketPayment2} value="cash" onClick={onChangePayment}/>
            <label htmlFor="pay2"></label>
            <span>현금결제</span>
          </li>
        </ul>
        <div onClick={onSubmitOrderOption}>
          <Button>주문완료</Button>
        </div>
      </div>
    </div>
  )
}
