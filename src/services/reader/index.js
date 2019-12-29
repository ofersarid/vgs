import { fromJS } from 'immutable';

const reducer = (state = fromJS({
  isOpen: false,
  content: '',
}), action) => {
  switch (action.type) {
    case 'READER:OPEN':
      return state.set('isOpen', true);
    case 'READER:CLOSE':
      return state.set('isOpen', false);
    case 'READER:SET_CONTENT':
      return state.set('content', action.content);
    case 'READER:CLEAR_CONTENT':
      return state.set('content', '');
    // case 'ROUTER/LOCATION_CHANGE':
    //   return state.set('isOpen', false);
    default:
      return state;
  }
};

const actions = {
  open: () => ({
    type: 'READER:OPEN',
  }),
  close: () => ({
    type: 'READER:CLOSE',
  }),
  set: content => ({
    type: 'READER:SET_CONTENT',
    content,
  }),
  clear: () => ({
    type: 'READER:CLEAR_CONTENT',
  }),
};

const selectors = {
  isOpen: state => state.getIn(['reader', 'isOpen']),
  content: state => state.getIn(['reader', 'content']),
};

export default {
  reducer,
  selectors,
  actions,
};
