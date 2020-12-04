import { useEffect, useState } from "react";

type DateProps = {
    dates : string[]
    todayOrder : boolean
    nowdate : string
    setNowdate : (e:string) => void
    setTodayOrder : (e:boolean)=>void
}

export const Date = ({dates,nowdate,setNowdate,todayOrder,setTodayOrder}:DateProps)=>{
    var width = dates.length
    var [slideIndex,setSlideIndex] = useState(0);
    var [slide_wrap,setSlide_wrap] = useState(Number(document.getElementById("slide-wrap")?.clientWidth))
    var ulstyle_width = String(slide_wrap/5*dates.length) + "px"
    useEffect(()=>{
        console.log(dates.length)
        setSlide_wrap(Number(document.getElementById("slide-wrap")?.clientWidth))
        ulstyle_width = String(slide_wrap/5*dates.length) + "px"
    },[])
   
    function plusSlides(n:number) {
        console.log("slideIndex : ",slideIndex)
        setSlideIndex(slideIndex= slideIndex+ n)
        showSlides(slideIndex );
    }
    
    function  showSlides(n:number) {
        var totalSlides = width-5;
        var slider = document.querySelector('#slide-wrap ul#slide');
        setSlide_wrap(Number(document.getElementById("slide-wrap")?.clientWidth))
        const dateBox = slide_wrap/5


        console.log("slideIndex : ",slideIndex,"totalSlide : ",totalSlides)
        if (slideIndex ===-1) {
            setSlideIndex(totalSlides - 1);
            (slider as HTMLElement).style.left = -(dateBox*totalSlides) + 'px';
        } else if (slideIndex === totalSlides+3) {
            setSlideIndex(0);
            (slider as HTMLElement).style.left = -(0) + 'px';
        }else{
            (slider as HTMLElement).style.left = -(dateBox*slideIndex) + 'px';
        }
    }
    
    return(
        <div id="Date-wrap">{(dates.length>0)?"구매 내역 선택":""}
        {(dates.length>5)?<button className="slide-btn" id="previous" onClick={(()=>{plusSlides(-1)})}>{"<"}</button>:""}
        {(dates.length>5)?<button className="slide-btn" id="next"onClick={(()=>{plusSlides(1)})}>{">"}</button>:""}
        <div className="Main-Date">
            
            <div id="slide-wrap">
                <ul style={{
                    left:"0px",
                    width: ulstyle_width, 
                    display:"flex",
                    transform:"1s",
                    alignItems : "center"
                }}id="slide">
                    {dates.map((ele)=>{return ((ele === nowdate)? 
                    <li style={{width:"18%",height:"60px",margin:"0.5%",alignItems:"center"}}>                    
                        <button className="btn st1">
                            <p>{ele.slice(5,7)+"월"}</p>
                            <p>{ele.slice(8)+"일"}</p> 
                        </button>
                    </li>
                    : 
                    <li style={{width:"18%",height:"60px" ,margin:"0.5%",alignItems:"center"}}>
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
                
            </div>
            
        </div>
        
            <div>
                {(todayOrder)? "":<button className="btn st1 today" onClick={()=>{setNowdate("");setTodayOrder(true)}}>
                오늘의주문</button>}
            </div>
        </div>
    )
}