import {Item} from "../reducers/main"

//type
export interface Market{
    name:string;
    mobile : string;
}
export interface NowOrder{
    itemList : Array<Item>;
    market : Market
}

export const OrderLoginUser = "ORDER/LOGIN";
export const OrderNonLoginUser = "ORDER/NONLOGIN";
export const OrderCreateItem = "ORDER/CREATEITEM";
export const OrderDeleteItem = "ORDER/DELETEITEM";
export const OrderUnitUp = "ORDER/UNITUP";
export const OrderUnitDown = "ORDER/UNITDOWN";

// Actions 생성자
interface OrderLoginUserAction {
    type : typeof OrderLoginUser;
    payload : NowOrder
}

interface OrderNonLoginUserAction{
    type : typeof OrderNonLoginUser;
}

interface OrderCreateItemAction{
    type : typeof OrderCreateItem;
    payload : Item
}

interface OrderDeleteItemAction{
    type : typeof OrderDeleteItem;
    payload :  Item
}

interface OrderUnitUpAction{
    type : typeof OrderUnitUp;
    payload :  Item,
}

interface OrderUnitDownAction{
    type : typeof OrderUnitDown;
    payload :  Item,
}

export type OrderActionTypes = 
    | OrderLoginUserAction
    | OrderNonLoginUserAction
    | OrderCreateItemAction
    | OrderDeleteItemAction
    | OrderUnitUpAction
    | OrderUnitDownAction

export function orderLoginUser(itemList : Array<Item>,market:Market){
    return{
        type : OrderLoginUser,
        payload : {
            itemList,
            market
        }
    }
}

export function orderNonLoginUser(){
    return{
        type : OrderNonLoginUser,
    }
}

export function orderCreateNowOrder(item : Item){
    return{
        type : OrderCreateItem,
        payload : item
    }
}

export function orderDeleteNowOrder(item : Item){
    return{
        type : OrderDeleteItem,
        payload : item
    }
}

export function orderUnitUP(item:Item){
    return{
        type: OrderUnitUp,
        payload:item
    }
}
export function orderUnitDown(item:Item){
    return{
        type: OrderUnitDown,
        payload : item
    }
}
export const actionOrderCreators = {
    orderLoginUser,
    orderNonLoginUser,
    orderCreateNowOrder,
    orderDeleteNowOrder,
    orderUnitUP,
    orderUnitDown,
}

const initialState : NowOrder = {
    itemList : [],
    market : {
        name:"",
        mobile:""
    }
}

export function OrderReducer(
    state= initialState,
    action : OrderActionTypes
) : NowOrder{
    switch(action.type){
        case OrderLoginUser:
            return {
                itemList : action.payload.itemList,
                market : {
                    name : action.payload.market.name,
                    mobile : action.payload.market.mobile
                }
            }
        case OrderNonLoginUser:
            return{
                itemList : [],
                market : {
                    name:"",
                    mobile:""
                }
            }
        case OrderCreateItem:
            return {
                ...state,
                itemList : [...state.itemList,action.payload]
            }
        case OrderDeleteItem:
            return {
                ...state,
                itemList : state.itemList.filter(ele => ele.item !== action.payload.item 
                    || ele.unit!==action.payload.unit) 
            }
        case OrderUnitUp:
            return{
                ...state,
                itemList : state.itemList.map(ele=>{
                    if(action.payload.item === ele.item){
                        return{
                            item: ele.item,
                            unit : ele.unit,
                            quantity : ele.quantity+1,
                        }
                    }
                    return ele
                })
            }
        case OrderUnitDown:
            return{
                ...state,
                itemList : state.itemList.map(ele=>{
                    if(action.payload.item === ele.item){
                        return{
                            item: ele.item,
                            unit : ele.unit,
                            quantity : (ele.quantity<=0) ? 0: ele.quantity-1
                        }
                    }
                    return ele
                })
            }
        default:
            return state;
    }
}