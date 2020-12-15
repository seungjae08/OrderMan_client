import React,{useEffect, useState} from 'react';
import { Item} from "../reducers/main";

type HistoryRenderProps={
    date :string;
    state : number;
    orderList :Item[];
    paymentMethod : string;
    deliveryTime : string;
}
export default function HistoryRender({date,state,orderList,paymentMethod,deliveryTime}:HistoryRenderProps){
    const [showState, setShowState] = useState(true)
    
    const orderListRender=({item,quantity,unit}:Item)=>(
        <div className="items">
            <p className="item-unit">{item}{unit}</p>
            <p className="quantity">{quantity}개</p>
        </div>
    )
    return(
        <div className="orderEle">
            <div className="date-state">
                <div className="date"> {date}</div>
                <button onClick={()=>{setShowState(!showState)}}>{(showState)?"위":"아래"}</button>
                <div className="state"> {(state===0)? "주문 대기중" : "주문 완료"
                }</div>
                
            </div>
            {(showState)?<div className="items-area">{orderList.map(ele=>{return orderListRender(ele)})}</div>:""}            
            <div className="payment-delivery">
                <div className="payment"> {paymentMethod}</div>
                <div className="delivery">time: {deliveryTime}</div>
            </div>
            
        </div>
    )
}