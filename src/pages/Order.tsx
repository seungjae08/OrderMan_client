import React, {useRef, useState, useEffect, useCallback, ChangeEvent, MouseEvent} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {serverPath} from 'modules/serverPath';
import { History } from 'history';
import Button from 'components/Button';
import {Header} from 'components/Header';
import getDayOption from 'modules/calcurateDayOption';
import { renderHour } from 'modules/calcurateDayOption';
import { resultType, validateOrderDate} from 'modules/calcurateDayOption';
import { RootState } from 'reducers';
import { changeMarketMobile, changePayment, changeDeliveryTime } from 'reducers/order';

type propsTypes = {
  history : History
}

export default function Order(props:propsTypes) {

  const dispatch = useDispatch();

  let [dayList, hourList, minList, toDay, nextDay, afterTomorrow]:resultType = getDayOption;

  const [inputs, setInputs] = useState({
    marketMobile:"",
  });
  const [selectOption, setSelectOption] = useState({
    date:dayList[0],
    hour:hourList[0],
    min:"00"
  })

  const [hList, setHList] = useState(hourList);
  const [mList, setMList] = useState(minList);
  const [isLogin,setIsLogin] = useState(false);
  const [itemList,setItemList] = useState([]);
  const [hopePrice,setHopePrice] = useState("");
  const [errorMsg,setErrorMsg] = useState("");

  const marketMobile = useSelector((state:RootState)=>state.OrderReducer.market.mobile);
  const OrderOption = useSelector((state:RootState)=>state.OrderReducer.option);
  
  const marketRadio1 = useRef<HTMLInputElement>(null);
  const marketRadio2 = useRef<HTMLInputElement>(null);
  const marketPayment1 = useRef<HTMLInputElement>(null);
  const marketPayment2 = useRef<HTMLInputElement>(null);

  
  //marketMobile
  useEffect(() => {
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
  }, [marketMobile, marketRadio1, marketRadio2]);

  useEffect(() => {

    //로그인여부 반환
    fetch(serverPath+"/user/login",{
      method:"GET",
      mode:"cors",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      }
    }).then(login=>{
      if(login.status===200){
        setIsLogin(true);
      }else if(login.status ===202){
        setIsLogin(false);
      }
    }).catch(err=>{
      console.log(err);
    });
    //temp 확인
    fetch(serverPath+"/order/temp",{
      method:"GET",
      mode:"cors",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      }
    }).then((res)=>res.json()).then((data)=>{
      //console.log('temp-data',JSON.parse(data));
      setItemList(data.itemList);
      setHopePrice(data.hopePrice);
    }).catch(err=>{
      console.log(err)
      alert('주문데이터가 없습니다. 주문을 다시 진행해주세요');
      props.history.push('/');
    })
    onValidateDate();
  }, [props.history]);

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

  const dispatchChangeMarket = useCallback(() => {
    console.log('onblur');
    if (!marketRadio1.current) {
      return;
    }
    if(marketRadio1.current.checked===true && inputs.marketMobile !== ""){
      dispatch(changeMarketMobile(inputs.marketMobile))
    }else{
      dispatch(changeMarketMobile(""))
      if (!marketRadio2.current) {
        return;
      }
      marketRadio2.current.checked = true; 
    }
  },[inputs.marketMobile, dispatch])

  const dispatchChangeMarketClick = useCallback(() => {
    console.log('onClick');
    if (!marketRadio1.current) {
      return;
    }
    if(marketRadio1.current.checked===false && inputs.marketMobile !== ""){
      dispatch(changeMarketMobile(inputs.marketMobile))
    }else{
      dispatch(changeMarketMobile(""))
      if (!marketRadio2.current) {
        return;
      }
      marketRadio2.current.checked = true; 
    }
  },[inputs.marketMobile, dispatch])

  const onHandleChangeSelect = useCallback((e:ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(name==="date"){
      let result = renderHour(value);
      setHList(result);
    }else if(name==="hour"){
      if(value==="20"){
        setMList(['00']);
      }else{
        setMList(['00','30'])
      }
    }
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
      dispatch(changeDeliveryTime(`${date.slice(2)} ${selectOption.hour}:${selectOption.min}`))
    }else{
    }
  }

  const onChangePayment = useCallback((event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>)=>{
    let value = (event.target as HTMLInputElement).value;
    dispatch(changePayment(value))
  },[dispatch]);

  const onSubmitOrderOption = useCallback((event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>)=>{
    let dataSuccess:boolean[] = [false,false];
    if(marketMobile !== null && marketMobile !== ""){
      fetch( serverPath + "/order/market", {
        method: 'POST',
        mode: 'cors', 
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
          mobile: marketMobile
        })
      }).then(res=>{
        if(res.status===200){
          dataSuccess[0] = true;
          if(dataSuccess[0] && dataSuccess[1]){
            alert('주문완료됐습니다!');
            props.history.push('/');
          }
        }
        
      }).catch(e=>{
        setErrorMsg('주문에 실패했습니다. 재주문 부탁드립니다');
      })
    }else{
      dataSuccess[0] = true;
    }

    fetch(serverPath + '/order/items', {
      method: 'POST',
      mode: 'cors', 
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({
        paymentMethod:OrderOption.payment,
        deliveryTime: OrderOption.deliveryTime,
        itemList,
        hopePrice,
        date: toDay.slice(2)
      })
    }).then(res=>{
      if(res.status===200){
        dataSuccess[1] = true;
        if(dataSuccess[0] && dataSuccess[1]){
          alert('주문완료됐습니다!');
          props.history.push('/');
        }
      }
    }).catch(e=>{
      setErrorMsg('주문에 실패했습니다. 재주문 부탁드립니다');
    });

  },[ marketMobile, OrderOption, props.history, itemList, hopePrice]);

  
  return (
    <div id="wrap" className="Order-wrap">
      <div className="mb-view verCenter">
        <Header isLogin={isLogin} setIsLogin={setIsLogin}/>
        <div className="content_inner">
          <h2>주문 옵션 설정</h2>   
          { hopePrice && 
            (<div className="flex Order-hopePrice">
              <h3>희망가격</h3>
              <div className="flexWrap">
                <p>{hopePrice}</p>
                <span>원</span>
              </div>
            </div>)
          } 
          <h3>선호하는 거래처(연락처)가 있으신가요?</h3>
          <ul className="flex Order-selList1" onBlur={dispatchChangeMarket} >
            <li className="flex">
              <div className="labelStyle">
                <input type="radio" id="fav1" name="favoriteMarket" ref={marketRadio1}/>
                <label htmlFor="fav1" onClick={dispatchChangeMarketClick}></label>
              </div>
              <input type="text" value={inputs.marketMobile} onChange={onChange} name="marketMobile"  placeholder="01012341234" />
            </li>
            <li>
              <input type="radio" id="fav2" name="favoriteMarket"  ref={marketRadio2} />
              <label htmlFor="fav2" onClick={dispatchChangeMarketClick}></label>
              <span>아니오</span>
            </li>
          </ul>

          <h3>언제 받으시겠어요?</h3>
          <div className="flex Order-selList2" onBlur={onValidateDate}>
            <select style={{marginRight:'10px'}} value={selectOption.date} onChange={onHandleChangeSelect} name="date">
              {
                dayList.map(day=><option key={day} value={day}>{day}</option>)
              }
            </select>
            <select value={selectOption.hour} onChange={onHandleChangeSelect} name="hour">
              {hList && hList.map((hour:string)=>{
                return <option key={`hour${hour}`} value={hour}>{hour}</option>
              })}
            </select>
            <span>시</span>
            <select value={selectOption.min} onChange={onHandleChangeSelect} name="min">
              {mList && mList.map((min:string)=><option key={`min${min}`}>{min}</option>)}
            </select>
            <span>분</span>
          </div>
          <div className="warning_text" style={{marginTop:'10px', marginBottom:'0'}}>
            배송 가능 시간:<br/> 
            오전 11시 이전 주문 - 당일 오후부터 가능,<br/> 
            오후 5시 이전 주문 - 익일 오전부터 가능,<br/> 
            오후 5시 이후 주문 - 익일 오후부터 가능
          </div>
          <h3>어떻게 결제하시겠어요?</h3>
          <div className="warning_text">
            오다맨 결제는 현장결제로 이뤄집니다
          </div>
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
          {
            errorMsg &&
            <div className="warning_text">{errorMsg}</div>
          }
          <div onClick={onSubmitOrderOption}>
              <Button>주문완료</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
