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
        <div>
            {dates.map((ele)=>{return ((ele == nowdate)?  <button>{ele} </button> 
            : <button onClick={()=>{
                setNowdate(ele); 
                setTodayOrder(false); 
                }}>{ele}</button>)})}
            {(todayOrder)? "":<button onClick={()=>{setNowdate("");setTodayOrder(true)}}>
                오늘의 주문</button>}
        </div>
    )
}