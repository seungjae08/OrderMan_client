import ItemsInput from 'components/ItemsInput';
import { Item } from 'reducers/main';
import { Items } from 'components/Items'

type OrderPageProps ={
    createItem : (item:Item) => void
    deleteItem : (item:Item) => void
    upItemsUnit : (item:Item) => void
    downItemsUnit : (item:Item)=>void
    itemList : Item[];
}

export default function OrderPage({createItem ,deleteItem,upItemsUnit,downItemsUnit,itemList} : OrderPageProps) {
    return (
        <div>
            <ItemsInput OrderCreateItem={createItem} />
            {itemList.map((item:Item)=><Items item ={item} deleteItem={deleteItem} upItemsUnit={upItemsUnit} downItemsUnit={downItemsUnit} /> )}
        </div>
    )
    
}