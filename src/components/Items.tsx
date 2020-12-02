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
                <p>품명 : {item.item}</p>
                <p>단위 : {item.unit} </p>
                <div className="quantity-delete">
                
                    <div className="quantity">
                        <p>수량 :</p>
                        <div>
                        <button onClick={()=>{upItemsUnit(item)}}>+</button>
                        <input  value={item.quantity} onChange={changeQuantity} />
                        <button onClick={()=>{downItemsUnit(item)}}>-</button>
                        </div>
                    </div>
                    <div className="delete">
                        <button onClick={()=>{deleteItem(item)}}>삭제</button>
                    </div>
                    
                </div>
            </div>
            
            
            
        </div>
    )
}