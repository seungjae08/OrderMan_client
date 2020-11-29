import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from "../reducers/index";
import { Items } from '../components/Items'
import {actionMainCreators as mainActions, Item, OderListInterface ,MainActionTypes} from "../reducers/main";
import {actionOrderCreators as orderActions ,Market} from "../reducers/order"
import ItemsInput from 'components/ItemsInput';
import {Header}from 'components/Header'
import { Link } from 'react-router-dom';
import Button from 'components/Button';

export default function Main() {
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
        name : "세계로마트",
        mobile : "01047589928"
    }
    dispatch(mainActions.startUser())
    try{
      let nowitemList :Array<Item> = orderList_["2020-11-23"] 
      dispatch(mainActions.loginUser(orderList_))
      dispatch(orderActions.orderLoginUser(nowitemList ,market_))
    }
    catch(err){
      dispatch(mainActions.errorGet())
    }
  },[])

  const {orderList,isLoading,hasError} = useSelector((state:RootState)=> state.MainReducer);
  const {market,itemList} = useSelector((state:RootState)=> state.OrderReducer);
  const dates = Object.keys(orderList); dates.reverse();
  
  const dispatch = useDispatch();

  // 컴포넌트들이 쓸 함수들 모음
  const rendering =() =>{
    if(isLoading) return <p>Loading~~</p>
    if(hasError) return <p>has Error</p>
    return  itemList.map((item:Item)=><Items item ={item} deleteItem={deleteItem} upItemsUnit={upItemsUnit} downItemsUnit={downItemsUnit} /> )
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
  const changeItemsList = (e:string)=>{
    let nowdate=orderList[e] 
    dispatch(orderActions.orderChangeDates(nowdate))
  }
  const clickOrder = ()=>{
    
  }
  return (  
    <div id="wrap">
      <Header dates={dates} changeItemsList={changeItemsList}/>
      <ItemsInput OrderCreateItem={createItem} />
      {rendering()}
      <Link to="/Order">
        <Button>주문하기</Button>
      </Link>
    </div>
  )
}
