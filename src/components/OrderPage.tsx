import ItemsInput from 'components/ItemsInput';
import { Item } from 'reducers/main';
import { Items } from 'components/Items'
import Button from 'components/Button';
import { Link } from 'react-router-dom';



type OrderPageProps ={
    createItem : (item:Item) => void
    deleteItem : (item:Item) => void
    upItemsUnit : (item:Item) => void
    downItemsUnit : (item:Item)=>void
    changeItemsQuantity :(item:Item)=>void

    itemList : Item[];
}

export default function OrderPage({createItem ,deleteItem,upItemsUnit,downItemsUnit,changeItemsQuantity,itemList} : OrderPageProps) {
    return (
        <div>
            <ItemsInput OrderCreateItem={createItem} />
            {itemList.map((item:Item)=><Items item ={item} deleteItem={deleteItem} upItemsUnit={upItemsUnit} downItemsUnit={downItemsUnit} changeItemsQuantity={changeItemsQuantity}/> )}
            <div className="order">
            <Link to="/Order">
                <Button>주문하기</Button>
            </Link>
      </div>
        </div>
    )
    
}