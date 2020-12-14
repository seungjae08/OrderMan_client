//type
export interface Item{
  item: string;
  quantity :number;
  unit : string;
}

export interface OrderListInterface{
  [key:string] : Item[];
  
} 

export interface OrderStates{
  orderList : OrderListInterface;
  isLoading : boolean;
  hasError : boolean;
}

// Actions 
export const LoginUser = 'ITMES/LOGIN';
export const NonLoginUser = 'ITMES/NONLOGIN';
export const StartUser = "ITEMS/START";
export const ErrorGet = "ITEMS/ERROR";
export const EndLoading = 'ITEMS/ENDLOADING';

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

interface EndLoadingAction{
  type :typeof EndLoading;
}

export type MainActionTypes = 
  | LoginUserAction
  | NonLoginUserAction
  | StartUserAction
  | ErrorGetAction
  | EndLoadingAction

export function loginUser(orderList: OrderListInterface){
  return{
    type:LoginUser,
    payload : orderList
  }
}

export function nonLoginUser(){
  return{
    type:NonLoginUser,
  }
}

export function startUser(){
  return{
    type: StartUser
  }
}

export function errorGet(){
  return{
    type:ErrorGet
  }
}

export function endLoading(){
  return{
    type:EndLoading
  }
}
export const actionMainCreators = {
  startUser,
  loginUser,
  nonLoginUser,
  errorGet,
  endLoading
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
        isLoading:true
      }
    case NonLoginUser:
      return {
        ...state,
        orderList : {},
        isLoading : true
      }
    case ErrorGet:
      return {
        ...state,
        isLoading:false,
        hasError :true
      }
    case EndLoading:
      return{
        ...state,
        isLoading:false
      }
    default:
      return state;
  }
}