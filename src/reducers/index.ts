import { combineReducers } from 'redux';
import {MainReducer} from './main';
import {orderReducer} from './order';

const rootReducer = combineReducers({
  MainReducer,
  orderReducer
});

// 루트 리듀서를 내보내주세요.
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;