import React,{ChangeEvent, useState} from 'react';
import { Item } from 'reducers/main';

type ItemsInputProps = {
    OrderCreateItem : (item :Item)=> void
}

export default function ItemsInput({OrderCreateItem}:ItemsInputProps) {
    const [itemname ,setItemname] = useState('');
    const [unit,setUnit] = useState('');
    const [quantity,setQuantity] = useState(0);

    const itemnameChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setItemname(e.target.value)
    }
    const unitChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setUnit(e.target.value)
    }
    const onSubmit = ()=>{
        OrderCreateItem({item:itemname,unit:unit,quantity:quantity})
        setItemname('')
        setUnit('')
        setQuantity(0)
    }
    return(
        <div>
            <input 
            placeholder="주문하실 물건을 입력해주세요"
            value = {itemname}
            onChange={itemnameChange}
            />
            <input 
            placeholder="주문 하실 물건의 단위를 입력해주세요"
            value = {unit}
            onChange={unitChange}
            />
            <div>
                <button onClick={()=>{setQuantity(quantity+1)}}>+</button>
                {quantity}
                <button onClick={()=>{setQuantity((quantity<=0)?0:quantity-1)}}>-</button>
            </div>
            <button onClick={onSubmit}>주문 올려놓기!</button>
        </div>
    )
}