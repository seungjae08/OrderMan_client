import { combineReducers } from 'redux';
import {MainReducer} from './main';

const rootReducer = combineReducers({
  MainReducer
});

// 루트 리듀서를 내보내주세요.
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;