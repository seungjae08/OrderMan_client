//type
export interface Item{
  item: string;
  quantity :Number;
  unit : string;
}

export interface OderListInterface{
  [key:string] : Item[]
} 

export interface OrderStates{
  orderList : OderListInterface;
  isLoading : boolean;
  hasError : boolean;
}

// Actions 
export const LoginUser = 'ITMES/LOGIN';
export const NonLoginUser = 'ITMES/NONLOGIN';
export const StartUser = "ITEMS/START";
export const ChangeNowOrderList = "ITEMS/CHANGENOWORDERLIST"
export const ErrorGet = "ITEMS/ERROR"

// Actions 생성자
interface LoginUserAction {
  type:typeof LoginUser;
  payload : OrderStates;
}

interface NonLoginUserAction {
  type:typeof NonLoginUser;
}

interface StartUserAction {
  type: typeof StartUser;
}

interface ErrorGetAction{
  type: typeof ErrorGet;
}

export type MainActionTypes = 
  | LoginUserAction
  | NonLoginUserAction
  | StartUserAction
  | ErrorGetAction

export function startUser(){
  return{
    type: StartUser
  }
}

export function loginUser(orderList: OderListInterface){
  return{
    type:LoginUser,
    payload : {orderList}
  }
}

export function nonLoginUser(){
  return{
    type:NonLoginUser,
  }
}

export function errorGet(){
  return{
    type:ErrorGet
  }
}

export const actionMainCreators = {
  startUser,
  loginUser,
  nonLoginUser,
  errorGet
}

// initialState
const initialState : OrderStates={
  orderList : {},
  isLoading:false,
  hasError : false
};

//Reducer
export function MainReducer(
  state = initialState,
  action : MainActionTypes
) : OrderStates {
  switch(action.type){
    case StartUser:
      return {
        ...state,
        isLoading:true
      }
    case LoginUser:
      return {
        ...state,
        orderList:action.payload.orderList,
        isLoading:false
      }
    case NonLoginUser:
      return {
        ...state,
        orderList : {},
        isLoading : false
      }
    case ErrorGet:
      return {
        ...state,
        hasError :true
      }
    default:
      return state;
  }
}