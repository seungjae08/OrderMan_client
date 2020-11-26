import { combineReducers } from 'redux';
import main from './main';

const rootReducer = combineReducers({
  main
});

// 루트 리듀서를 내보내주세요.
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;