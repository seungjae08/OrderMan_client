import { Item } from "reducers/main";

type PastOrderItemsProps ={
    itemList:Array<Item>
    item :Item
    createItem : (item:Item)=>void
}

export default function PastOrderItems({itemList,item,createItem}:PastOrderItemsProps) {
    const addState =()=>{
        const find = itemList.find(ele=>ele.item===item.item)
        if(find===undefined){
            return "담기"
        }else{
            return "담기완료"
        }
    }

    return(
        <div className="PastOrderItems-wrap">
            <div className="items">
                <ul>
                    <li>품명 : {item.item}</li>
                    <li>단위 : {item.unit}</li>
                    <li>갯수 : {item.quantity}</li>
                </ul>
                <button onClick={()=>{
                const find = itemList.find(ele=>ele.item===item.item)
                if(find===undefined){
                    createItem(item)
                }
            }}>{addState()}</button>
            </div>
            
            
        </div>
    )
}