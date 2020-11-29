import {actionMainCreators as mainActions, Item, OderListInterface ,MainActionTypes} from "../reducers/main";
import {actionOrderCreators as orderActions ,Market} from "../reducers/order"
import {ThunkAction} from "redux-thunk"; 
import { RootState } from "reducers";
export function fetchOrders() : ThunkAction<void,RootState,null,MainActionTypes>{
    return async dispatch  =>{
        // dispatch(mainActions.startUser());
        try{
            // const response : any = await fetch("http://localhost:8000/",{method:"GET"});
            // const data : object = await response.json();
            // const date : Array<string> = Object.keys(data);
            // 로그인 논로그인은 fetch로 분류
            // const nowdate : Date = new Date();
            // const nowdateStr : string = nowdate.toISOString().slice(0,10).replace(/-/gi,"");
            // const nowdateNum : number = Number(nowdateStr);
            // let distinction : number = 0;
            // date.forEach((ele)=>{
            //   const dateNum : number = Number(ele.replace(/-/gi,""));
            //   distinction = nowdateNum - dateNum
            // })
            const orderList : OderListInterface = {
            "2020-11-20":[
                {item : "가지", quantity: 4, unit : "1kg",},
                {item : "고구마", quantity: 39,unit : "1kg" }
            ],       
            "2020-11-23":[
                {item : "가지", quantity: 4,unit : "1kg", },
                {item : "고구마",quantity: 39, unit : "1kg" }
            ]
            }
            const market : Market ={
                name : "세계로마트",
                mobile : "01047589928"
            }
            let nowitemList :Array<Item> = orderList["2020-11-20"] 
            // dispatch(mainActions.loginUser(orderList))
            // dispatch(orderActions.orderLoginUser(nowitemList ,market))
        }catch(error){
            // dispatch(mainActions.errorGet())
        }
    }
  }