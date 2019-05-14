const frame = state => state.getIn(['snapScroll', 'frame']);
const firstLook = state => state.getIn(['snapScroll', 'firstLook']);

export default {
  frame,
  firstLook,
};
