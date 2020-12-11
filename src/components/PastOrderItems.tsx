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
            return "주문담기"
        }else{
            return "담기완료"
        }
    }

    return(
        <div className="PastOrderItems-wrap">
            <div className="items">               
                    <div>{item.item+"  "+item.unit}<img src="assets/ico_multiply.png" alt="곱하기"/>{item.quantity}</div>
                
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