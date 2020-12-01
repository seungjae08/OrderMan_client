import React,{useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from "../reducers/index";
import {actionMainCreators as mainActions, Item, OderListInterface } from "../reducers/main";
import {actionOrderCreators as orderActions ,Market} from "../reducers/order"
import PastOrders from 'components/PastOrders'
import {Header}from 'components/Header'
import {Date} from 'components/Date'
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import OrderPage from 'components/OrderPage';

export default function Main() {
  const {orderList/*,isLoading,hasError*/} = useSelector((state:RootState)=> state.MainReducer);
  const {itemList} = useSelector((state:RootState)=> state.OrderReducer);
  const dates = Object.keys(orderList); dates.reverse();
  // Distpach 선언  
  const dispatch = useDispatch();
  useEffect(()=>{
    const orderList_ : OderListInterface = {
      "2020-11-20":[
          {item : "가지", quantity: 4, unit : "1kg",},
          {item : "고구마", quantity: 39,unit : "1kg" }
      ],       
      "2020-11-23":[
          {item : "감자", quantity: 400,unit : "2kg", },
          {item : "밀가루",quantity: 39, unit : "1kg" }
      ]
    }
    const market_ : Market ={
        mobile : "01047589928"
    }
    dispatch(mainActions.startUser())
    try{
      dispatch(mainActions.loginUser(orderList_))
      dispatch(orderActions.orderLoginUser([] ,market_))
    }
    catch(err){
      dispatch(mainActions.errorGet())
    }
  },[])
  

  // useSate
  const [todayOrder,setTodayOrder] = useState(true)
  const [selectDate, setSelectDate] = useState("");

  // 컴포넌트들이 쓸 함수들 모음
  // const rendering =() =>{
  //   if(isLoading) return <p>Loading~~</p>
  //   if(hasError) return <p>has Error</p>
  // }
  const createItem=(item:Item)=>{
    dispatch(orderActions.orderCreateNowOrder(item));
  }
  
  const deleteItem=(item:Item)=>{
    dispatch(orderActions.orderDeleteNowOrder(item))
  }

  const upItemsUnit = (item:Item)=>{
    dispatch(orderActions.orderUnitUP(item))
  }
  const downItemsUnit = (item:Item)=>{
    dispatch(orderActions.orderUnitDown(item))
  }
  
  
  return (  
    <div id="wrap" className="Main-wrap">
      <div className="mb-view">
      <Header />
      <Date 
        dates={dates} 
        nowdate={selectDate}
        setNowdate={setSelectDate} 
        todayOrder={todayOrder} 
        setTodayOrder={setTodayOrder}/>
      {(todayOrder) ? <OrderPage 
        createItem={createItem} 
        deleteItem={deleteItem}
        upItemsUnit={upItemsUnit}
        downItemsUnit={downItemsUnit}
        itemList={itemList}
      />:<PastOrders 
        orderItemList={itemList}
        itemList={(selectDate!=="")?orderList[selectDate]:[]}
        createItem={createItem}
      />}
      <div className="order">
        <Link to="/Order">
          <Button>주문하기</Button>
        </Link>
      </div>
      </div>
    </div>
  )
}
