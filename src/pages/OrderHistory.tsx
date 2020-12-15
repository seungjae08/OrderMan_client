import { serverPath } from 'modules/serverPath';
import {History} from 'history';
import React,{useEffect, useState} from 'react';
import { Item} from "../reducers/main";
import Header from 'components/Header'
import HisotryRender from 'components/HistoryRender'
import Loading from 'components/Loading';
type propsTypes={
    history:History
}
type dataTypes={
    date :string;
    state : number;
    orderList :Item[];
    paymentMethod : string;
    deliveryTime : string;
    hopePrice : number;
}

export default function OrderHistory(props:propsTypes){
    const [data,setData]  = useState<dataTypes[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin,setIsLogin] = useState(false)// 리덕스로 변환

    useEffect(()=>{
        setIsLoading(true);
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
                setData(data.data.reverse())
                setIsLoading(false)
            })
            
        }catch(err){
            setData([])
        }
    },[])

    return (
        <div id="wrap" className="History-wrap">
            <div className="mb-view">
                <Header isLogin={isLogin} setIsLogin={setIsLogin} history={props.history}/>
                <div className="content_inner">
                <h2>주문 내역</h2>
                <div className="orderHistory">
                    {
                        (isLoading)? <Loading />:(data && data.length===0)?"주문 내역이 없습니다":
                        data && data.map((ele,index)=>(<HisotryRender
                            key={index} 
                            date={ele.date} 
                            state={ele.state} 
                            orderList={ele.orderList} 
                            paymentMethod={ele.paymentMethod}
                            deliveryTime={ele.deliveryTime}
                            hopePrice={ele.hopePrice}
                        />))
                    }
                </div>
                </div>
            </div>
        </div>
    )
}