import { fromJS } from 'immutable';
import currentDevice from 'current-device';
import isTouchDevice from 'is-touch-device';
import { ACTIONS } from './constants';

const initialState = fromJS({
  type: currentDevice.type,
  orientation: currentDevice.orientation,
  isTouchDevice: isTouchDevice(),
});

const device = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.STORE_ORIENTATION:
      return state.set('orientation', action.orientation);
    default:
      return state;
  }
};

export default device;
