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
        <div className="orderEle" onClick={()=>{setShowState(!showState)}}>
            {/* <button onClick={()=>{setShowState(!showState)}}>{(showState)?
                <img src="/assets/orderHistory.png" className="up" alt="접기"/>:
                <img src="/assets/orderHistory.png" className="down" alt="펼치기"/>}
            </button> */}
            <div className="date-state">
                <div className="date"> {date} 주문건</div>
                 {(state===0)? <div className="state-stay">주문대기</div> :
                  <div className="state-success">처리완료</div>
                }
                
            </div>
            <div className="payment-delivery">
                <div className="delivery"><span>희망배달시간 :</span> {deliveryTime}</div>
                <div className="payment"><span>희망가격 :</span> {hopePrice}원 [{(paymentMethod==="cash")?"현금결제":"카드결제"}]</div>
            </div>
            {(showState)?<div className="items-area">{orderList.map((ele,index)=>{return orderListRender(ele,index)})}</div>:""}            
            
            
        </div>
    )
}