const frame = state => state.getIn(['snapScroll', 'frame']);
const firstLook = state => state.getIn(['snapScroll', 'firstLook']);
const disableNext = state => state.getIn(['snapScroll', 'disable', 'next']);
const disablePrev = state => state.getIn(['snapScroll', 'disable', 'prev']);

export default {
  frame,
  firstLook,
  disableNext,
  disablePrev,
};
