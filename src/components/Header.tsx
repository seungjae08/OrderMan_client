import { type } from 'os';
import React,{ButtonHTMLAttributes, ChangeEvent, useState} from 'react';

type HeaderProps={
    dates : string[]
    changeItemsList: (e:string)=>void
}
export const Header=({dates,changeItemsList}:HeaderProps)=>{
    const [nowdate,setNowdate] = useState(dates[1]);
    const changeDate=(e:string)=>{
        changeItemsList(e)
        console.log("먹는다.")
    }

    return (
        <div>
            <h1>ORDERMAN</h1>
            {dates.map((ele)=>{return ((ele == nowdate)?  <button>{ele} </button> 
            : <button onClick={()=>{setNowdate(ele); changeDate(ele)}}>{ele}</button>)})}
        </div>
    )
}