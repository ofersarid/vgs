import { fromJS } from 'immutable';

const reducer = (state = fromJS({
  bizCard: 'enabled',
  orientation: 'portrait',
}), action) => {
  switch (action.type) {
    case 'DISABLE_BIZ_CARD':
      return state.set('bizCard', 'disabled');
    case 'ENABLE_BIZ_CARD':
      return state.set('bizCard', 'enabled');
    case 'SET_ORIENTATION':
      return state.set('orientation', action.orientation);
    default:
      return state;
  }
};

const actions = {
  disableBizCard: () => ({
    type: 'DISABLE_BIZ_CARD',
  }),
  enableBizCard: () => ({
    type: 'ENABLE_BIZ_CARD',
  }),
  setOrientation: orientation => ({
    type: 'SET_ORIENTATION',
    orientation,
  }),
};

const selectors = {
  bizCard: state => state.getIn(['vgs', 'bizCard']) === 'enabled',
  orientation: state => state.getIn(['vgs', 'orientation']),
};

export default {
  reducer,
  selectors,
  actions,
};
