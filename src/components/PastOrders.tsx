import PastOderItems from "components/PastOrderItems"
import { Item } from "reducers/main"

type PastOrdersProps={
    orderItemList : Item[]
    itemList : Item[]
    createItem : (item:Item) =>void
}

export default function PastOrders({orderItemList,itemList,createItem}:PastOrdersProps) {

    

    return(
        <div>
            <button onClick={()=>{
                itemList.forEach((ele)=>{
                    const find =orderItemList.find(orderele=>orderele.item===ele.item)
                    if(find ===undefined){
                        createItem(ele)
                    }
                })
            }}>전체담기</button>
            {itemList.map((ele)=>{return <PastOderItems 
                itemList={orderItemList}
                item={ele}
                createItem={createItem}
            />})}
        </div>
    )
}