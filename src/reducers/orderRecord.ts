import {Item} from "./main";
// 주문 기록 해당 날짜를 선택 했을 시 변하게 되는 곳
interface OrderRecordStates {
    pastorder : Array<Item>;
    date : string;
}

export const PastOrder = "ORDERRECORD/PAST";

interface PastOrderAction{
    type : typeof PastOrder;
    pastorder : Array<Item>;
    date : string;
}

export type OrderRecordActionTypes = 
    PastOrderAction

export function pastOrder(date:string,itemList:Array<Item>){
    return{
        type : PastOrder,
        pastorder : itemList,
        date : date
    }
}

export const actionOrderRecordCreators = {
    pastOrder,
}

const initialState : OrderRecordStates = {
    pastorder : [],
    date : ""
}

export function OrderRecordReducer(
    state = initialState,
    action : OrderRecordActionTypes
):OrderRecordStates{
    switch(action.type){
        case PastOrder:
            return{
                pastorder: action.pastorder,
                date : action.date
            }
        default:
            return state
    }
}