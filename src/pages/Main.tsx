import React,{  useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from "../reducers/index";
import {actionMainCreators as mainActions, endLoading, Item} from "../reducers/main";
import {actionOrderCreators as orderActions} from "../reducers/order"
import PastOrders from 'components/PastOrders'
import {Header}from 'components/Header'
import {Date} from 'components/Date'
import OrderPage from 'components/OrderPage';
import { serverPath } from 'modules/serverPath';

function Main() {
  // Distpach 선언  
  const dispatch = useDispatch();
  
  const {orderList,isLoading,hasError} = useSelector((state:RootState) => state.MainReducer);
  const {itemList} = useSelector((state:RootState)=> state.OrderReducer);
  
  // useSate
  const [todayOrder,setTodayOrder] = useState(true)
  const [selectDate, setSelectDate] = useState("");
  const [dates, setDates] = useState([""])
  const [hopePrice,setHopePrice] = useState("")
  const [isLogin,setIsLogin] = useState(false)

  useEffect(()=>{
    dispatch(mainActions.startUser())
    try{
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
        .then(temp=> temp.json())
        .then(temp=>{
          dispatch(mainActions.loginUser(data.orderList));
          dispatch(orderActions.orderLoginUser(temp.itemList,data.market));
          
          setDates( Object.keys(data.orderList))
          dispatch(mainActions.endLoading())
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

  // 컴포넌트들이 쓸 함수들 모음
  
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
        body: JSON.stringify({itemList,hopePrice})
      })
  }

  // 렌더링에 관한 함수들
  const rendering =() =>{
    if(isLoading) return <p>Loading~~</p>
    if(hasError) return <p>has Error</p>
    return <div className="mb-view">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} itemList={itemList} hopePrice={hopePrice}/>
      {(dates.length>0)?<Date 
        dates={dates} 
        nowdate={selectDate}
        setNowdate={setSelectDate} 
        todayOrder={todayOrder} 
        setTodayOrder={setTodayOrder}/>:""}
      
      {todayOderPick()}
    </div>
  }
  const todayOderPick=()=>{
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
  return (  
    <div id="wrap" className="Main-wrap">
        {rendering()}
    </div>
  )
}


export default Main;