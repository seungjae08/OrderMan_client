import React,{ useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from "../reducers/index";
import {actionMainCreators as mainActions, Item, OrderListInterface } from "../reducers/main";
import {actionOrderCreators as orderActions ,Market} from "../reducers/order"
import PastOrders from 'components/PastOrders'
import {Header}from 'components/Header'
import {Date} from 'components/Date'
import OrderPage from 'components/OrderPage';

function Main() {
  // Distpach 선언  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(mainActions.startUser())
    try{
      fetch("https://dhejaos.tk/totalinfo",{
        method:"GET",
        mode:"cors",
        credentials:"include",
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      .then(data=>data.json())
      .then(data=>{
        fetch("httpsL//ordermanserver.online/order/temp",{
          method:"GET",
          mode:"cors",
          credentials:"include",
          headers:{
            'Content-Type' : 'application/json'
          }
        })
        .then(data=>data.json())
        .then(temp=>{
          dispatch(mainActions.loginUser(data.orderList));
          dispatch(orderActions.orderLoginUser(temp.itemList,data.market));
          let dates_ = Object.keys(data.orderList); 
          setDates(dates_)
        })
      })
    }catch(err){
      dispatch(mainActions.errorGet());
    }
  },[])
  const {orderList,isLoading,hasError} = useSelector((state:RootState) => state.MainReducer);
  const {itemList} = useSelector((state:RootState)=> state.OrderReducer);
  
  // useSate
  const [todayOrder,setTodayOrder] = useState(true)
  const [selectDate, setSelectDate] = useState("");
  const [dates, setDates] = useState([""])

  
  // 컴포넌트들이 쓸 함수들 모음
  const rendering =() =>{
    if(isLoading) return <p>Loading~~</p>
    if(hasError) return <p>has Error</p>
    return (todayOrder) ? <OrderPage 
    createItem={createItem} 
    deleteItem={deleteItem}
    upItemsUnit={upItemsUnit}
    downItemsUnit={downItemsUnit}
    changeItemsQuantity={changeItemsQuantity}
    itemList={itemList}
  />:<PastOrders 
    orderItemList={itemList}
    itemList={(selectDate!=="")?orderList[selectDate]:[]}
    createItem={createItem}
  />
  }
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
  
  const changeItemsQuantity = (item:Item)=>{
    dispatch(orderActions.orderQuantityChange(item))
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
      {rendering()}
      
      </div>
    </div>
  )
}


export default Main;