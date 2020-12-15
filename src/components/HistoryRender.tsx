import React,{useEffect, useState} from 'react';
import { Item} from "../reducers/main";

type HistoryRenderProps={
    date :string;
    state : number;
    orderList :Item[];
    paymentMethod : string;
    deliveryTime : string;
    hopePrice : number;
}
export default function HistoryRender({date,state,orderList,paymentMethod,deliveryTime,hopePrice}:HistoryRenderProps){
    const [showState, setShowState] = useState(true)
    
    const orderListRender=({item,quantity,unit}:Item,index:number)=>(
        <div className="items" key={index}>
            <p className="item-unit">{item} {unit}</p>
            <p className="quantity">{quantity}개</p>
        </div>
    )
    return(
        <div className="orderEle">
            <div className="date-state">
                <div className="date"> {date} 주문건</div>
                <button onClick={()=>{setShowState(!showState)}}>{(showState)?
                <img  src="/assets/orderHistory.png" className="up"/>:
                <img  src="/assets/orderHistory.png" className="down"/>}</button>
                 {(state===0)? <div className="state-stay">주문대기</div> :
                  <div className="state-success">처리완료</div>
                }
                
            </div>
            <div className="payment-delivery">
                <div className="delivery">희망 배달 시간 : {deliveryTime}</div>
                <div className="payment">희망 가격 : {hopePrice}원 [{(paymentMethod==="cash")?"현금결제":"카드결제"}]</div>
            </div>
            {(showState)?<div className="items-area">{orderList.map((ele,index)=>{return orderListRender(ele,index)})}</div>:""}            
            
            
        </div>
    )
}