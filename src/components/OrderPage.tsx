import ItemsInput from 'components/ItemsInput';
import { Item } from 'reducers/main';
import { Items } from 'components/Items'
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import {ChangeEvent, useState} from 'react';
import { History } from 'history';

type OrderPageProps ={
    createItem : (item:Item) => void
    deleteItem : (item:Item) => void
    upItemsUnit : (item:Item) => void
    downItemsUnit : (item:Item)=>void
    changeItemsQuantity :(item:Item)=>void
    clickOrderButton : (input:boolean)=>void;
    setHopePrice : (str :string)=>void;
    setisLogin : (bool : boolean)=>void;
    isLogin : boolean;
    hopePrice: string
    itemList : Item[];
}

export default function OrderPage({
    createItem ,
    deleteItem,
    upItemsUnit,
    downItemsUnit,
    changeItemsQuantity,
    clickOrderButton,
    setHopePrice,
    setisLogin,
    isLogin,
    hopePrice,
    itemList,} : OrderPageProps) {
    const [inputValue , setInputValue] = useState("")
    const changeHopePrice = (e:ChangeEvent<HTMLInputElement>)=>{
        if(typeof Number(e.target.value)==="number"){
            const comma=(str:string)=>{
                return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
              }
              
              // 콤마 풀기
            const uncomma=(str:string)=> {
                return str.replace(/[^\d]+/g, '');
              }
            setInputValue(comma(uncomma(e.target.value)))
            setHopePrice(uncomma(e.target.value))
        }else{
            alert("숫자를 입력해주세요!")
        }
      }
    const orderBtnAtLogState = ()=>{
        if(itemList.length ===0){
            return  <button className="order-btn"onClick={()=>{alert("품목을 추가해주세요")}}>주문하기</button>
        }else{
            return  <button className="order-btn" onClick={()=>{clickOrderButton(isLogin)}}>주문하기</button>
        }
        
    }
    return (
        <div className="input-area">
            <ItemsInput OrderCreateItem={createItem} />
            {(itemList.length>0)?
            itemList.map((item:Item)=>
            <Items item ={item} 
            deleteItem={deleteItem} 
            upItemsUnit={upItemsUnit} 
            downItemsUnit={downItemsUnit} 
            changeItemsQuantity={changeItemsQuantity}/> ):
            <div className="shoppingBasket"><img src="assets/shoppingBasket.jpg" /><p>장바구니가 비었습니다!</p></div>}
            <div className="order">
                <p>희망가격 </p> 
                <div className="order-input-btn">
                    {orderBtnAtLogState()}
                    <p>원</p>
                    <input type="tel" value={inputValue} onChange={changeHopePrice} />
                    
                </div>
                
            </div>
        </div>
    )
    
}