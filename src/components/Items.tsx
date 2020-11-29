import React from 'react';
import {Item} from 'reducers/main'

type ItemsProps ={
    item:Item
    deleteItem: (item:Item) => void
    upItemsUnit : (item:Item) =>void
    downItemsUnit :(item:Item) => void
}

export const Items = ({item,deleteItem,upItemsUnit,downItemsUnit}:ItemsProps)=>{
    
    return(
        <div>
            <p>item : {item.item}</p>
            <p>unit : {item.unit} </p>
            <div>
                <button onClick={()=>{upItemsUnit(item)}}>+</button>
                {item.quantity}
                <button onClick={()=>{downItemsUnit(item)}}>-</button>
            </div>
            <button onClick={()=>{deleteItem(item)}}>삭제</button>
        </div>
    )
}