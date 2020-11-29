import { combineReducers } from 'redux';
import {MainReducer} from './main';
import {OrderReducer} from './order'

const rootReducer = combineReducers({
  MainReducer,
  OrderReducer,
});

// 루트 리듀서를 내보내주세요.
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;