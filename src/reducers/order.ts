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
    payload :  Item,
        
}

export type OrderActionTypes = 
    | OrderLoginUserAction
    | OrderNonLoginUserAction
    | OrderCreateItemAction
    | OrderDeleteItemAction

export function orderLoginUser(itemList : NowOrder,market:Market){
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

export const actionOrderCreators = {
    orderLoginUser,
    orderNonLoginUser,
    orderCreateNowOrder,
    orderDeleteNowOrder
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
                itemList : state.itemList.filter(ele => ele.item !== action.payload.item) 
            }
        default:
            return state;
    }
}