import React,{ useEffect, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from "../reducers/index";
import {actionMainCreators as mainActions, Item} from "../reducers/main";
import {actionOrderCreators as orderActions} from "../reducers/order"
import PastOrders from 'components/PastOrders'
import Header from 'components/Header'
import {Date} from 'components/Date'
import OrderPage from 'components/OrderPage';
import { serverPath } from 'modules/serverPath';
import { History } from "history"
import Loading from 'components/Loading';

type propsTypes = {
  history:History
}
function Main(props : propsTypes) {
  // Distpach 선언  
  const dispatch = useDispatch();
  
  const {orderList} = useSelector((state:RootState) => state.MainReducer);
  const {itemList} = useSelector((state:RootState)=> state.OrderReducer);
  
  // useSate
  const [isLoading,setIsLoading] = useState(true)
  const [todayOrder,setTodayOrder] = useState(true)
  const [selectDate, setSelectDate] = useState("");
  const [dates, setDates] = useState([""])
  const [hopePrice,setHopePrice] = useState("")
  const [isLogin,setIsLogin] = useState(false)// 리덕스로 변환
  
  useEffect(()=>{
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
          dispatch(mainActions.loginUser(data));
          dispatch(orderActions.orderLoginUser(temp.itemList,data.market));
          setDates( Object.keys(data.orderList))
          dispatch(mainActions.endLoading());
        })
        fetch(serverPath+"/user/login",{
          method:"GET",
          mode:"cors",
          credentials:"include",
          headers:{
            "Content-Type":"application/json"
          }
        }).then(login=>{
          if(login.status===200 || login.status===203){
            setIsLogin(true);
          }else if(login.status ===202){
            setIsLogin(false);
          }
          setIsLoading(false)
        })
      })
    }catch(err){
      dispatch(mainActions.errorGet());
    }
  },[isLogin, dispatch]);

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
  
  const changeDatesClickLogout = ()=>{
    setDates([""])
  }

  const clickOrderButton = (isLogin:boolean)=>{
      dispatch(mainActions.startUser());
      fetch(serverPath+"/order/temp",{
        method: 'POST',
        mode: 'cors', 
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({itemList,hopePrice})
      })
      .then(res=>{
        if(isLogin){
          props.history.push("/order")
        }else{
          props.history.push("/order/unsignin")
        }
        dispatch(mainActions.endLoading())
      })
  }

  // 렌더링에 관한 함수들
  const rendering =() =>{
    return (
    <div className="mb-view">
      <Header isLogin={isLogin} setIsLogin={setIsLogin}
        changeDatesClickLogout={changeDatesClickLogout}
        itemList={itemList} hopePrice={hopePrice} history={props.history}/>
      <div className="content_inner">
        {(dates.length===0||dates[0]==="")?
        "":<Date 
        dates={dates} 
        nowdate={selectDate}
        setNowdate={setSelectDate} 
        todayOrder={todayOrder} 
        setTodayOrder={setTodayOrder}/>}
        {todayOderPick()}
      </div>
    </div>
    )
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
    itemList={itemList}
  />:<PastOrders 
    orderItemList={itemList}
    itemList={(selectDate!=="")?orderList[selectDate]:[]}
    createItem={createItem}
    selectDate={selectDate}
  />
  }
  return (  
    <div id="wrap" className="Main-wrap">
        {rendering()}
        {
          isLoading&&
          <Loading />
        }
    </div>
  )
}


export default Main;