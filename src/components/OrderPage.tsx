import ItemsInput from 'components/ItemsInput';
import { Item } from 'reducers/main';
import { Items } from 'components/Items'
import { ChangeEvent, useState } from 'react';

type OrderPageProps = {
    createItem: (item: Item) => void
    deleteItem: (item: Item) => void
    upItemsUnit: (item: Item) => void
    downItemsUnit: (item: Item) => void
    changeItemsQuantity: (item: Item) => void
    clickOrderButton: (input: boolean) => void;
    setHopePrice: (str: string) => void;
    setisLogin: (bool: boolean) => void;
    isLogin: boolean;
    itemList: Item[];
}

export default function OrderPage({
    createItem,
    deleteItem,
    upItemsUnit,
    downItemsUnit,
    changeItemsQuantity,
    clickOrderButton,
    setHopePrice,
    isLogin,
    itemList, }: OrderPageProps) {
    const [inputValue, setInputValue] = useState("")
    const changeHopePrice = (e: ChangeEvent<HTMLInputElement>) => {
        if (typeof Number(e.target.value) === "number") {
            const comma = (str: string) => {
                return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
            }

            // 콤마 풀기
            const uncomma = (str: string) => {
                return str.replace(/[^\d]+/g, '');
            }
            setInputValue(comma(uncomma(e.target.value)))
            setHopePrice(uncomma(e.target.value))
        } else {
            alert("숫자를 입력해주세요!")
        }
    }
    const orderBtnAtLogState = () => {
        if (itemList && itemList.length === 0) {
            return <button className="order-btn" onClick={() => { alert("품목을 추가해주세요") }}>주문하기</button>
        } else {
            return <button className="order-btn" onClick={() => { clickOrderButton(isLogin) }}>주문하기</button>
        }

    }
    return (
        <div className="input-area">
            <ItemsInput OrderCreateItem={createItem} />
            {(itemList && itemList.length > 0) ?
                itemList.map((item: Item,index) =>
                    <Items item={item}
                        key={index}
                        deleteItem={deleteItem}
                        upItemsUnit={upItemsUnit}
                        downItemsUnit={downItemsUnit}
                        changeItemsQuantity={changeItemsQuantity} />) :
                <div className="shoppingBasket"><p>장바구니가 비었습니다!</p></div>}
            <div className="order">
                <p>희망가격 </p>
                <div className="order-input-btn">
                    <input type="tel" value={inputValue} onChange={changeHopePrice} />
                    <p>원</p>
                    {orderBtnAtLogState()}
                </div>

            </div>
        </div>
    )

}