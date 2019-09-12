import { fromJS } from 'immutable';
import C from './consts';

const initialState = fromJS({
  frame: 0,
  count: 0,
  firstLook: true,
  isLastFrame: false,
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

    case C.ACTIONS.IS_LAST_FRAME:
      return state.set('isLastFrame', action.bool);

    default:
      return state;
  }
};

export default reducer;
