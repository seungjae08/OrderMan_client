const INCREASE_BY = 'counter/INCREASE_BY' as const;

export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  payload: diff
});

type CounterAction =
  | ReturnType<typeof increaseBy>;
  
type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0
};


function counter(
  state: CounterState = initialState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    // case INCREASE: 
    //   return { count: state.count + 1 };
    default:
      return state;
  }
}

export default counter;