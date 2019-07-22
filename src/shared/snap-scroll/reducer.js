import { fromJS } from 'immutable';
import C from './consts';

const initialState = fromJS({
  frame: 7,
  count: 0,
  firstLook: true,
  disable: {
    next: false,
    prev: false,
  },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case C.ACTIONS.UPDATE_FRAME_INDEX:
      return state.set('frame', action.index);

    case C.ACTIONS.DISABLE:
      return state.set('disable', action.disable);

    case C.ACTIONS.COUNT:
      return state.set('count', action.count);

    case C.ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
