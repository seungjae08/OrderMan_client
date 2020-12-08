import React,{ChangeEvent, useState} from 'react';
import { Item } from 'reducers/main';

type ItemsInputProps = {
    OrderCreateItem : (item :Item)=> void
}

export default function ItemsInput({OrderCreateItem}:ItemsInputProps) {
    const [itemname ,setItemname] = useState('');
    const [unit,setUnit] = useState('');
    const [quantity,setQuantity] = useState("0");

    const itemnameChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setItemname(e.target.value)
    }
    const unitChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setUnit(e.target.value)
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
        <div >
            <div >
                <div>
                    <p>주문하실 품목을 적어주세요!</p>
                    <input 
                    className="item-input"
                    placeholder="주문하실 물건을 입력해주세요"
                    value = {itemname}
                    onChange={itemnameChange}
                    />
                </div>
                <div>
                    <p>단위를 적어주세요! </p>
                    <p>ex)1kg,1망,1단,1개</p>
                    <input 
                    className="item-input"
                    placeholder="주문 하실 물건의 단위를 입력해주세요"
                    value = {unit}
                    onChange={unitChange}
                    />
                </div>
                <div className="item-input-btn">
                    <p id="quantity">수량</p>
                    <div className="item-input-unit">
                        <button onClick={()=>{setQuantity(`${Number(quantity)+1}`)}}>+</button>
                        <input type="tel" value={quantity}  onChange={inputQuantityChange}/>
                        <button onClick={()=>{setQuantity((Number(quantity)<=0)?"0":`${Number(quantity)-1}`)}}>-</button>
                    </div>
                    <button onClick={onSubmit}>주문 올려놓기!</button>
                </div>
            </div>
            
            
        </div>
    )
}