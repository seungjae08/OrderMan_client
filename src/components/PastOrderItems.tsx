import { useState } from "react";
import { Item } from "reducers/main";

type PastOrderItemsProps ={
    itemList:Array<Item>
    item :Item
    createItem : (item:Item)=>void
}

export default function PastOrderItems({itemList,item,createItem}:PastOrderItemsProps) {
    const [add,setAdd] = useState(false)
    const addState =()=>{
        const find = itemList.find(ele=>ele.item===item.item)
        if(find===undefined){
            return "담기"
        }else{
            return "담기완료"
        }
    }

    return(
        <div>
            <p>item : {item.item}</p>
            <p>unit : {item.unit}</p>
            <p>quantity : {item.quantity}</p>
            <button onClick={()=>{
                const find = itemList.find(ele=>ele.item===item.item)
                if(find===undefined){
                    createItem(item)
                }
            }}>{addState()}</button>
        </div>
    )
}