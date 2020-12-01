import { useState } from "react";

type DateProps = {
    dates : string[]
    todayOrder : boolean
    nowdate : string
    setNowdate : (e:string) => void
    setTodayOrder : (e:boolean)=>void
}

export const Date = ({dates,nowdate,setNowdate,todayOrder,setTodayOrder}:DateProps)=>{
    const width = dates.length
    var ulstyle_width = String(60*width) + "px"
    var [slideIndex,setSlideIndex] = useState(0);

    function plusSlides(n:number) {
        console.log("slideIndex : ",slideIndex)
        setSlideIndex(slideIndex= slideIndex+ n)
        showSlides(slideIndex );
    }
    
    function  showSlides(n:number) {
        var slides = document.querySelectorAll("#slide-wrap ul li");
        var totalSlides = slides.length-5;
        var slider = document.querySelector('#slide-wrap ul#slide');
        
        console.log("slideIndex : ",slideIndex,"totalSlide : ",totalSlides)
        if (slideIndex ===-1) {
            setSlideIndex(totalSlides - 1);
            (slider as HTMLElement).style.left = -(60*totalSlides) + 'px';
        } else if (slideIndex === totalSlides+1) {
            setSlideIndex(0);
            (slider as HTMLElement).style.left = -(0) + 'px';
        }else{
            (slider as HTMLElement).style.left = -(60*slideIndex) + 'px';
        }
    }
    
    return(
        <div id="Date-wrap">
        <div className="Main-Date">
            {(dates.length>5)?<button className="slide-btn" id="previous" onClick={(()=>{plusSlides(-1)})}>{"<"}</button>:""}
            <div id="slide-wrap">
                <ul style={{
                    left:"0px",
                    width:ulstyle_width, 
                    display:"flex",
                    transform:"1s",
                    alignItems : "center"
                }}id="slide">
                    {dates.map((ele)=>{return ((ele === nowdate)? 
                    <li style={{width:"60px",height:"60px",margin:"5px",alignItems:"center"}}>                    
                        <button className="btn st1">
                            <p>{ele.slice(5,7)+"월"}</p>
                            <p>{ele.slice(8)+"일"}</p> 
                        </button>
                    </li>
                    : 
                    <li style={{width:"60px",height:"60px" ,margin:"5px",alignItems:"center"}}>
                        <button className="btn st1" onClick={()=>{
                            setNowdate(ele); 
                            setTodayOrder(false); 
                            }}>
                            <p>{ele.slice(5,7)+"월"}</p>
                            <p>{ele.slice(8)+"일"}</p>
                        </button>
                    </li>
                    )})}
                </ul>
                <div id="slider-pagination-wrap">
                    <ul>
                    </ul>
                </div>
                
            </div>
            {(dates.length>5)?<button className="slide-btn" id="next"onClick={(()=>{plusSlides(1)})}>{">"}</button>:""}
        </div>
            <div>
                {(todayOrder)? "":<button className="btn st1 today" onClick={()=>{setNowdate("");setTodayOrder(true)}}>
                오늘의주문</button>}
            </div>
        </div>
    )
}