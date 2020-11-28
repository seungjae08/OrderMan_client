import {actionMainCreators as actions, Item, OderListInterface} from "../reducers/main";
import {Market} from "../reducers/order"

export function fetchOrders(){
    return async (dispatch:Function)  =>{
        dispatch(actions.startUser());
        try{
            // const response : any = await fetch("http://localhost:8000/",{method:"GET"});
            // const data : object = await response.json();
            // const date : Array<string> = Object.keys(data);
            // 로그인 논로그인은 fetch로 분류
            const nowdate : Date = new Date();
            const nowdateStr : string = nowdate.toISOString().slice(0,10).replace(/-/gi,"");
            const nowdateNum : number = Number(nowdateStr);
            let distinction : number = 0;
            // date.forEach((ele)=>{
            //   const dateNum : number = Number(ele.replace(/-/gi,""));
            //   distinction = nowdateNum - dateNum
            // })
            const orderList : OderListInterface = {
            "2020-11-20":[
                {item : "가지", unit : "1kg",quantity: 4, },
                {item : "고구마", unit : "1kg",quantity: 39 }
            ],       
            "2020-11-23":[
                {item : "가지", unit : "1kg",quantity: 4, },
                {item : "고구마", unit : "1kg",quantity: 39 }
            ]
            }
            const market : Market ={
                name : "세계로마트",
                mobile : "01047589928"
            }
            let nowitemList :Array<Item>
            nowitemList = orderList["2020-11-20"] 
            //dispatch(actions.loginUser(orderList))
            //dispatch( order.ts => orderListAction(nowitemList, market))
        }catch(error){
            dispatch(actions.errorGet())
        }
    }
  }