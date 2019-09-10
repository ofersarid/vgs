import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

const reducer = (state = fromJS({
  bizCard: 'enabled',
  orientation: 'portrait',
  color: '#005728',
  productsActiveTab: 'vascular',
}), action) => {
  switch (action.type) {
    case 'DISABLE_BIZ_CARD':
      return state.set('bizCard', 'disabled');
    case 'ENABLE_BIZ_CARD':
      return state.set('bizCard', 'enabled');
    case 'SET_ORIENTATION':
      return state.set('orientation', action.orientation);
    case 'SET_COLOR':
      return state.set('color', action.color);
    case 'SET_PRODUCTS_ACTIVE_TAB':
      return state.set('productsActiveTab', action.tab);
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
  setColor: color => ({
    type: 'SET_COLOR',
    color,
  }),
  setProductsActiveTab: tab => ({
    type: 'SET_PRODUCTS_ACTIVE_TAB',
    tab,
  }),
};

const selectors = {
  bizCard: state => state.getIn(['vgs', 'bizCard']) === 'enabled',
  orientation: state => state.getIn(['vgs', 'orientation']),
  color: state => state.getIn(['vgs', 'color']),
  productsActiveTab: state => state.getIn(['vgs', 'productsActiveTab']),
};

selectors.colorName = createSelector(selectors.color, color => {
  switch (color.toUpperCase()) {
    case '#0272BA':
      return 'blue';
    case '#662D91':
      return 'purple';
    case '#ED1C24':
      return 'red';
    case '#22B0AF':
      return 'lagoon';
    default:
      return 'gray';
  }
});

export default {
  reducer,
  selectors,
  actions,
};
