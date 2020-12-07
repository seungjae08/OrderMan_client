import {Swiper,SwiperSlide} from "swiper/react"
import React from 'react';

import 'swiper/swiper.scss';
type SwiperSliderProps={
    dates : string[]
    nowdate : string
    setNowdate : (e:string) => void
    setTodayOrder : (e:boolean)=>void
}
const SwiperSlider =({dates,nowdate,setNowdate,setTodayOrder}:SwiperSliderProps)=>{
    return(
        <Swiper
                    spaceBetween={5}
                    slidesPerView={5}              
                >{dates.map((ele)=>{return ((ele === nowdate)?
                        <SwiperSlide>
                            <button >
                                <p>{ele.slice(3,5)+"월"}</p>
                                <p>{ele.slice(6)+"일"}</p> 
                            </button>
                        </SwiperSlide>:
                        <SwiperSlide>
                            <button onClick={()=>{
                                setNowdate(ele); 
                                setTodayOrder(false); 
                            }}>
                                <p>{ele.slice(3,5)+"월"}</p>
                                <p>{ele.slice(6)+"일"}</p>
                            </button>
                        </SwiperSlide>
                        
                        
                    )})}
                </Swiper>
    )
}
export default SwiperSlider;