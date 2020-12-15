import { serverPath } from 'modules/serverPath';
import React,{useEffect, useState} from 'react';
import { Item} from "../reducers/main";
import {Header}from 'components/Header'
import HisotryRender from 'components/HistoryRender'
type propsTypes={
    history:History
}
type dataTypes={
    date :string;
    state : number;
    orderList :Item[];
    paymentMethod : string;
    deliveryTime : string;
}

export default function OrderHistory(props:propsTypes){
    const [data,setData]  = useState<dataTypes[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin,setIsLogin] = useState(false)// 리덕스로 변환

    useEffect(()=>{
        try{
            fetch(serverPath+"/user/login",{
                method:"GET",
                mode:"cors",
                credentials:"include",
                headers:{
                  "Content-Type":"application/json"
                }
            })
            .then(login=>{
                if(login.status===200){
                  setIsLogin(true);
                }else if(login.status ===202){
                  setIsLogin(false);
                }
            })

            fetch(serverPath+"/order/history",{
                method:"GET",
                mode:"cors",
                credentials:"include",
                headers:{
                'Content-Type' : 'application/json'
                }
            })
            .then(data=>data.json())
            .then(data=>{
                setData(data.data)
            })
            setIsLoading(false)
        }catch(err){
            setData([])
        }
    },[])

    const orderListRender=({item,quantity,unit}:Item)=>(
        <div className="items">
            <p className="item-unit">{item}{unit}</p>
            <p className="quantity">{quantity}개</p>
        </div>
    )
    
    const rendering = ({date,state,orderList,paymentMethod,deliveryTime}:dataTypes)=>{
        return(
            <div className="orderEle">
                <div className="date-state">
                    <div className="date"> {date}</div>
                    <div className="state"> {(state===0)? "주문 대기중" : "주문 완료"
                    }</div>
                </div>
                
                <div className="items-area">{orderList.map(ele=>{return orderListRender(ele)})}</div>
                <div className="payment-delivery">
                    <div className="payment"> {paymentMethod}</div>
                    <div className="delivery">time: {deliveryTime}</div>
                </div>
                
            </div>
        )
    }

    return (
        <div id="wrap" className="History-wrap">
            <div className="mb-view">
                <Header isLogin={isLogin} setIsLogin={setIsLogin} />
                <div className="content_inner">
                <h2>주문 내역</h2>
                <div className="orderHistory">
                    {
                    (data.length===0)?"주문 내역이 없습니다":
                    data.map(ele=>(<HisotryRender 
                        date={ele.date} 
                        state={ele.state} 
                        orderList={ele.orderList} 
                        paymentMethod={ele.paymentMethod}
                        deliveryTime={ele.deliveryTime}
                    />))
                    }
                </div>
                </div>
            </div>
        </div>
    )
}