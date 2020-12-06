import React,{  useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from "../reducers/index";
import {actionMainCreators as mainActions, Item} from "../reducers/main";
import {actionOrderCreators as orderActions} from "../reducers/order"
import PastOrders from 'components/PastOrders'
import {Header}from 'components/Header'
import {Date} from 'components/Date'
import OrderPage from 'components/OrderPage';
import { serverPath } from 'modules/serverPath';

function Main() {
  // Distpach 선언  
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(mainActions.startUser())
    try{
      console.log("fetch 안해?")
      fetch(serverPath+"/totalinfo",{
        method:"GET",
        mode:"cors",
        credentials:"include",
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      .then(data=>data.json())
      .then(data=>{
        fetch(serverPath+"/order/temp",{
          method:"GET",
          mode:"cors",
          credentials:"include",
          headers:{
            'Content-Type' : 'application/json'
          }
        })
        .then(temp=>{console.log(temp); return temp.json()})
        .then(temp=>{
          console.log(temp)
          dispatch(mainActions.loginUser(data.orderList));
          dispatch(orderActions.orderLoginUser(temp.itemList,data.market));
          let dates_ = Object.keys(data.orderList); 
          setDates(dates_)
        })
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
        })
      })
    }catch(err){
      console.log(err)
      dispatch(mainActions.errorGet());
    }
  },[]);

  const {orderList,isLoading,hasError} = useSelector((state:RootState) => state.MainReducer);
  const {itemList} = useSelector((state:RootState)=> state.OrderReducer);
  
  // useSate
  const [todayOrder,setTodayOrder] = useState(true)
  const [selectDate, setSelectDate] = useState("");
  const [dates, setDates] = useState([""])
  const [hopePrice,setHopePrice] = useState(0)
  const [isLogin,setIsLogin] = useState(false)

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
    clickOrderButton={clickOrderButton}
    setHopePrice={setHopePrice}
    setisLogin={setIsLogin}
    isLogin={isLogin}
    hopePrice={hopePrice}
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

  const clickOrderButton = ()=>{
    fetch(serverPath+"/order/temp",{
      method: 'POST',
      mode: 'cors', 
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        itemList,
        hopePrice
      })
    })
  }
  

  return (  
    <div id="wrap" className="Main-wrap">
      <div className="mb-view">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
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