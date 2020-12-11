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
                    {item.item+"  "+item.unit}<img src="assets/ico_multiply.png"/>{item.quantity}
                
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