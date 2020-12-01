import React,{useState} from 'react';

type DateProps = {
    dates : string[]
    todayOrder : boolean
    nowdate : string
    setNowdate : (e:string) => void
    setTodayOrder : (e:boolean)=>void
}

export const Date = ({dates,nowdate,setNowdate,todayOrder,setTodayOrder}:DateProps)=>{
    return(
        <div className="Main-Date">
            {dates.map((ele)=>{return ((ele == nowdate)?  <button className="btn st1">{ele.slice(5,7)+"월\n"+ele.slice(8)+"일"} </button> 
            : <button className="btn st1" onClick={()=>{
                setNowdate(ele); 
                setTodayOrder(false); 
                }}>{ele.slice(5,7)+"월\n"+ele.slice(8)+"일"}</button>)})}
            {(todayOrder)? "":<button className="btn st1" onClick={()=>{setNowdate("");setTodayOrder(true)}}>
                오늘의 주문</button>}
        </div>
    )
}