import PastOderItems from "components/PastOrderItems"
import { Item } from "reducers/main"

type PastOrdersProps={
    orderItemList : Item[]
    itemList : Item[]
    selectDate: string
    createItem : (item:Item) =>void
}

export default function PastOrders({orderItemList,itemList,selectDate,createItem}:PastOrdersProps) {
    return(
        <div id="PastOrders">
            <div id="date-orderlist">
                <h1 ><span>{selectDate.slice(3,5)+"."+selectDate.slice(6)+"의 주문리스트"}</span>
                <button className="All-select" onClick={()=>{
                    itemList.forEach((ele)=>{
                        const find =orderItemList.find(orderele=>orderele.item===ele.item)
                        if(find ===undefined){
                            createItem(ele)
                        }
                    })
                }}>전체담기</button>
                </h1>
            </div>
            <div>
            {itemList.map((ele,index)=>{
                return <PastOderItems
                key={index} 
                itemList={orderItemList}
                item={ele}
                createItem={createItem}
            />})}
            </div>
        </div>
    )
}