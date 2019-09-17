import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import camelCase from 'lodash/camelCase';

const reducer = (state = fromJS({
  bizCard: 'enabled',
  orientation: 'portrait',
  color: '#005728',
  productsActiveTab: 'vascular',
  lastFrame: {
    home: 0,
  }
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
    case 'UPDATE_LAST_FRAME':
      return state.setIn(['lastFrame', camelCase(action.context)], action.frame);
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
  updateLastFrame: (frame, context) => ({
    type: 'UPDATE_LAST_FRAME',
    frame,
    context,
  })
};

const selectors = {
  bizCard: state => state.getIn(['vgs', 'bizCard']) === 'enabled',
  orientation: state => state.getIn(['vgs', 'orientation']),
  color: state => state.getIn(['vgs', 'color']),
  productsActiveTab: state => state.getIn(['vgs', 'productsActiveTab']),
  lastFrame: (state, context) => state.getIn(['vgs', 'lastFrame', camelCase(context)]) || 0,
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
    case '#005728':
      return 'green';
    default:
      return 'gray';
  }
});

export default {
  reducer,
  selectors,
  actions,
};
