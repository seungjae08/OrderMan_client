import React,{ChangeEvent, useEffect, useState} from 'react';
import { Item } from 'reducers/main';
import SearchPreview from 'components/SearchPreview'
import { serverPath } from 'modules/serverPath';
type ItemsInputProps = {
    OrderCreateItem : (item :Item)=> void
}

export default function ItemsInput({
    OrderCreateItem,
    }:ItemsInputProps) {
    const [itemname ,setItemname] = useState('');
    const [unit,setUnit] = useState('');
    const [quantity,setQuantity] = useState("1");
    const [itemInputFocus,setItemInputFocus] = useState(false)
    const [unitInputFocus,setUnitInputFocus] = useState(false)
    const [itemautoState,setItemAutoState] = useState({
        data : [""],
        results : [""]
    })
    const [unitAutoState,setUnitAutoState]=useState({
        data : [""],
        results : [""]
    })
    useEffect(()=>{
        fetch(serverPath+"/order/items",{
            method:"GET",
            mode:"cors",
            credentials:"include",
            headers:{
              'Content-Type' : 'application/json'
            }
        })
        .then(data=>data.json())
        .then(data=>{
            setItemAutoState({
                ...itemautoState,
                data:data.itemNames
            })
            setUnitAutoState({
                ...unitAutoState,
                data:data.unitNames
            })
        })
    },[])
    //자동완성기능
    const matchName = (name:string,keyword:string)=>{
        let keylen = keyword.length;
        if(keylen===0){
            return false;
        }
        let nameArr = name.split("");
        let keyArr = keyword.split("");
        for(let i = 0; i<keylen;i++){
            let state = nameArr.indexOf(keyArr[i])
            if(state===-1){
                return false;
            }
        }
        return true;
    }

    const onItemSearch =(text:string)=>{
        let {data} = itemautoState;
        let results = data.filter(item=>true===matchName(item,text))
        setItemAutoState({
            ...itemautoState,
            results:results
        })
    }

    const onUnitSearch = (text:string)=>{
        let {data} = unitAutoState;
        let results = data.filter(item=>true===matchName(item,text))
        setUnitAutoState({
            ...unitAutoState,
            results:results
        })
    }

    const updateItemText =(text:string)=>{
        setItemname(text)
        setItemAutoState({
            ...itemautoState,
            results:[""]
        })
    }
    const updateUnitText =(text:string) =>{
        setUnit(text)
        setUnitAutoState({
            ...unitAutoState,
            results:[""]
        })
    }


    const itemnameChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setItemname(e.target.value)
        onItemSearch(e.target.value)
    }
    const unitChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setUnit(e.target.value)
        onUnitSearch(e.target.value)
    }
    const onSubmit = ()=>{
        if(itemname!==""&&unit !==""){
            OrderCreateItem({item:itemname,unit:unit,quantity:Number(quantity)})
            setItemname('')
            setUnit('')
            setQuantity('')
        }
    }
    const inputQuantityChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setQuantity(e.target.value)
    }
    return(
        <div className="input-wrap">
            <div >
                <div className="input-order-area">
                    <p>품목</p>
                    <input 
                    className="input-style"
                    placeholder="ex)감자"
                    value = {itemname}
                    onChange={itemnameChange}
                    
                    onFocus={()=>{setItemInputFocus(true)}}
                    onBlur={()=>{setTimeout(()=>{setItemInputFocus(false)},100) }}
                    />
                    <div className={(itemInputFocus)?
                    "autoComplete-wrap focus":"autoComplete-wrap none"}>
                        {itemautoState.results.map((text,index)=>{
                            if(index<10){
                                return(
                                    <SearchPreview 
                                        text={text}
                                        index={index}
                                        updateText={updateItemText}
                                    />
                                )
                            }
                            return "";
                        })}
                        {/* <div className="explanation">자동완성기능</div> */}
                    </div>
                       
                </div>
                <div className="input-order-area">
                    <p>단위</p>
                    <input 
                    className="input-style"
                    placeholder="ex)1kg"
                    value = {unit}
                    onChange={unitChange}
                    onFocus={()=>{setUnitInputFocus(true)}}
                    onBlur={()=>{setTimeout(()=>{setUnitInputFocus(false)},100)}}
                    />
                    <div className={(unitInputFocus)?
                    "autoComplete-wrap focus":"autoComplete-wrap none"}>
                        {unitAutoState.results.map((text,index)=>{
                            if(index<10){
                                return(
                                    <SearchPreview 
                                        text={text}
                                        index={index}
                                        updateText={updateUnitText}
                                    />
                                )
                            }
                            return "";
                        })}
                    </div>
                </div>
                <div className="input-order-area">
                    <p >수량</p>
                    <div className="item-input-unit">
                        <button onClick={()=>{setQuantity((Number(quantity)<=0)?"0":`${Number(quantity)-1}`)}}>
                            <img src="/assets/ico_minus.png" alt="수량빼기"/>
                        </button>
                        <input className="quantity" type="tel" value={quantity}  onChange={inputQuantityChange}/>
                        <button onClick={()=>{setQuantity(`${Number(quantity)+1}`)}}>
                            <img src="/assets/ico_plus.png" alt="수량더하기"/>
                        </button>
                    </div>
                </div>
                <button className="orderBtn" onClick={onSubmit}>주문 추가하기</button>
            </div>
            
            
        </div>
    )
}