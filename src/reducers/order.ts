// import { Dispatch, Action } from 'redux';
// import { ThunkAction } from 'redux-thunk'
// import { RootState } from './index'
import { Item } from '../reducers/main';

//type
export type Market =  {
  mobile: string | null;
}

export type unSigninInfo =  {
  mobile: string;
  brand: string;
  address: string;
}
export type Option = {
  payment: string;
  deliveryTime: string;
}

export type NowOrder = {
  itemList: Array<Item>;
  market: Market;
  unSignInfo:unSigninInfo;
  option: Option;
}


export const OrderLoginUser = 'order/LOGIN' as const;
export const OrderNonLoginUser = 'order/NON_LOGIN' as const;
export const OrderCreateItem = 'order/CREATE_ITEM' as const;
export const OrderDeleteItem = 'order/DELETE_ITEM' as const;
export const OrderUnitUp = 'order/UNIT_UP' as const;
export const OrderUnitDown = 'order/UNIT_DOWN' as const;
export const OrderQuantityChange = 'order/Quantity_CHANGE' as const;
export const OrderChangeDates = 'order/CHANGE_DATES' as const;

export const UnSignInfo = 'order/UNSIGN_INFO' as const;
export const MarketActionType = 'order/MARKET_CHANGE' as const;
export const PaymentChangeActionType = 'order/PAYMENT_CHANGE' as const;
export const DeliveryTimeChangeActionType = 'order/DELIVERY_TIME_CHANGE' as const;

// Actions 생성자
type OrderLoginUserAction = {
  type: typeof OrderLoginUser;
  payload: NowOrder;
}

type  OrderNonLoginUserAction = {
  type: typeof OrderNonLoginUser;
}

type OrderCreateItemAction = {
  type: typeof OrderCreateItem;
  payload: Item;
}

type OrderDeleteItemAction =  {
  type: typeof OrderDeleteItem;
  payload: Item;
}

type OrderUnitUpAction = {
  type: typeof OrderUnitUp;
  payload: Item;
}

type OrderUnitDownAction =  {
  type: typeof OrderUnitDown;
  payload: Item;
}

type OrderQuantityChangeAction={
  type:typeof OrderQuantityChange;
  payload : Item
}

type OrderChangeDatesAction = {
  type: typeof OrderChangeDates;
  payload: Array<Item>;
}

type OrderChangeUnSignInfo = {
  type: typeof UnSignInfo;
  payload: unSigninInfo;
}

type MarketChangeType = {
  type : typeof MarketActionType,
  payload: string | null
}

type PaymentChangeType = {
  type : typeof PaymentChangeActionType,
  payload: string
}

type DeliveryTimeChangeType = {
  type : typeof DeliveryTimeChangeActionType,
  payload: string
}

export type OrderActionTypes =
  | OrderLoginUserAction
  | OrderNonLoginUserAction
  | OrderCreateItemAction
  | OrderDeleteItemAction
  | OrderUnitUpAction
  | OrderUnitDownAction
  | OrderQuantityChangeAction
  | OrderChangeDatesAction
  | OrderChangeUnSignInfo
  | MarketChangeType
  | PaymentChangeType
  | DeliveryTimeChangeType;

export function orderLoginUser(itemList: Array<Item>, market: Market) {
  return {
    type: OrderLoginUser,
    payload: {
      itemList,
      market,
    },
  };
}

export function orderNonLoginUser() {
  return {
    type: OrderNonLoginUser,
  };
}

export function orderCreateNowOrder(item: Item) {
  return {
    type: OrderCreateItem,
    payload: item,
  };
}

export function orderDeleteNowOrder(item: Item) {
  return {
    type: OrderDeleteItem,
    payload: item,
  };
}

export function orderUnitUP(item: Item) {
  return {
    type: OrderUnitUp,
    payload: item,
  };
}
export function orderUnitDown(item: Item) {
  return {
    type: OrderUnitDown,
    payload: item,
  };
}

export function orderQuantityChange(item:Item){
  return{
    type: OrderQuantityChange,
    payload: item
  }
}
export function orderChangeDates(order: Array<Item>) {
  return {
    type: OrderChangeDates,
    payload: order,
  };
}


// export const dispatchSignInfo = (userInfo:unSigninInfo) : ThunkAction<void, RootState, unknown, Action<string>> => async dispatch =>{
//   dispatch(changeUnSignInfo(userInfo));
//   return Promise.resolve();
// }


export function changeUnSignInfo(userInfo:unSigninInfo) {
  return {
    type: UnSignInfo,
    payload: userInfo,
  };
}

export function changeMarketMobile(mobile:string|null){
  return {
    type: MarketActionType,
    payload: mobile
  }
}

export function changePayment(payment:string){
  return {
    type: PaymentChangeActionType,
    payload: payment
  }
}

export function changeDeliveryTime(deliveryTime:string){
  return {
    type: DeliveryTimeChangeActionType,
    payload: deliveryTime
  }
}


export const actionOrderCreators = {
  orderLoginUser,
  orderNonLoginUser,
  orderCreateNowOrder,
  orderDeleteNowOrder,
  orderUnitUP,
  orderUnitDown,
  orderQuantityChange,
  orderChangeDates,
};



const initialState: NowOrder = {
  itemList: [],
  market: {
    mobile: '',
  },
  unSignInfo:{
    mobile:'',
    address:'',
    brand:''
  },
  option:{
    payment:'card',
    deliveryTime:''
  }
};

export function OrderReducer(
  state = initialState,
  action: OrderActionTypes
): NowOrder {
  switch (action.type) {
    case OrderLoginUser:
      return {
        ...state,
        itemList: action.payload.itemList,
        market: {
          mobile: action.payload.market.mobile,
        },
      };
    case OrderNonLoginUser:
      return {
        ...state,
        itemList: [],
        market: {
          mobile: '',
        },
      };
    case OrderCreateItem:
      return {
        ...state,
        itemList: [...state.itemList, action.payload],
      };
    case OrderDeleteItem:
      return {
        ...state,
        itemList: state.itemList.filter(
          (ele) =>
            ele.item !== action.payload.item || ele.unit !== action.payload.unit
        ),
      };

    case OrderUnitUp:
      return {
        ...state,
        itemList: state.itemList.map((ele) => {
          if (action.payload.item === ele.item && action.payload.unit===ele.unit) {
            return {
              item: ele.item,
              unit: ele.unit,
              quantity: ele.quantity + 1,
            };
          }
          return ele;
        }),
      };
    case OrderUnitDown:
      return {
        ...state,
        itemList: state.itemList.map((ele) => {
          if (action.payload.item === ele.item && action.payload.unit===ele.unit) {
            return {
              item: ele.item,
              unit: ele.unit,
              quantity: ele.quantity <= 0 ? 0 : ele.quantity - 1,
            };
          }
          return ele;
        }),
      };
    case OrderQuantityChange:
      return{
        ...state,
        itemList: state.itemList.map((ele) => {
          if (action.payload.item === ele.item) {
            return {
              item: ele.item,
              unit: ele.unit,
              quantity:action.payload.quantity,
            };
          }
          return ele;
        }),
      }
    case OrderChangeDates:
      return {
        ...state,
        itemList: action.payload,
      };
    case UnSignInfo:
      return {
        ...state,
        unSignInfo: action.payload
      };
    case MarketActionType:
      return {
        ...state,
        market: {
          ...state.market,
          mobile: action.payload
        }
      };
    case PaymentChangeActionType:
      return {
        ...state,
        option:{
          ...state.option,
          payment: action.payload
        }
      }
    case DeliveryTimeChangeActionType:
      return {
        ...state,
        option:{
          ...state.option,
          deliveryTime: action.payload
        }
      }
    default:
      return state;
  }
}
