import { useEffect} from "react";
import {Swiper,SwiperSlide} from "swiper/react"
import SwiperSlider from "./SwiperSlider"
import 'swiper/swiper.scss';

type DateProps = {
    dates : string[]
    todayOrder : boolean
    nowdate : string
    setNowdate : (e:string) => void
    setTodayOrder : (e:boolean)=>void
}

export const Date = ({dates,nowdate,setNowdate,todayOrder,setTodayOrder}:DateProps)=>{
    useEffect(()=>{
        return console.log(dates)
    },[dates])
    return(
        <div id="Date-wrap">{(dates.length>0)?"구매 내역 선택":""}
        <div className="Main-Date">
            <div id="slide-wrap">
                <SwiperSlider dates={dates} nowdate={nowdate} setNowdate={setNowdate}
                    setTodayOrder={setTodayOrder}
                />
            </div>
        </div>
            <div>
                {(todayOrder)? "":<button className="btn st1 today" onClick={()=>{setNowdate("");setTodayOrder(true)}}>
                오늘의주문</button>}
            </div>
        </div>
    )
}