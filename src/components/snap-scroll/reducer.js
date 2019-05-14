import { fromJS } from 'immutable';
import C from './consts';

const initialState = fromJS({
  frame: 0,
  firstLook: true,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case C.ACTIONS.UPDATE_FRAME_INDEX:
      return state.set('frame', action.index);

    case C.ACTIONS.FIRST_LOOK:
      return state.set('firstLook', action.isFirstLook);

    default:
      return state;
  }
};

export default reducer;
