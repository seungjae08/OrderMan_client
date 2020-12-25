import React, { ChangeEvent } from 'react';
import {Item} from 'reducers/main'

type ItemsProps ={
    item:Item
    deleteItem: (item:Item) => void
    upItemsUnit : (item:Item) =>void
    downItemsUnit :(item:Item) => void
    changeItemsQuantity:(item:Item)=>void
}

export const Items = ({item,deleteItem,upItemsUnit,downItemsUnit,changeItemsQuantity}:ItemsProps)=>{
    const changeQuantity =(e:ChangeEvent<HTMLInputElement>)=>{
        changeItemsQuantity({item:item.item, unit:item.unit,quantity:Number(e.target.value)})
    }


    return(
        <div className="Items">
            <div className="item-unit">
                <p>{item.item + " "} {item.unit} </p>
                <div className="quantity-delete">
                    <button className="delete" onClick={()=>{deleteItem(item)}}>삭제</button>
                    <div className="item-input-unit">
                        <button onClick={()=>{downItemsUnit(item)}}><img src="/assets/ico_minus.png" alt="수량빼기"/></button>
                        <input  value={item.quantity} onChange={changeQuantity} />
                        <button onClick={()=>{upItemsUnit(item)}}><img src="/assets/ico_plus.png" alt="수량더하기"/></button>
                    </div>

                </div>
            </div>
        </div>
    )
}