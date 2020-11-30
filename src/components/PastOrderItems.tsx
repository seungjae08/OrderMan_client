import { Item } from "reducers/main";

type PastOrderItemsProps ={
    itemList:Array<Item>
    item :Item
    createItem : (item:Item)=>void
}

export default function PastOrderItems({itemList,item,createItem}:PastOrderItemsProps) {
    
    return(
        <div>
            <p>item : {item.item}</p>
            <p>unit : {item.unit}</p>
            <p>quantity : {item.quantity}</p>
            <button onClick={()=>{
                const find = itemList.find(ele=>ele.item===item.item)
                console.log(find)
                if(find===undefined){
                    createItem(item)
                }
            }}>담기</button>
        </div>
    )
}