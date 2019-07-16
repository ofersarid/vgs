const frame = state => state.getIn(['snapScroll', 'frame']);
const count = state => state.getIn(['snapScroll', 'count']);
const disableNext = state => state.getIn(['snapScroll', 'disable', 'next']);
const disablePrev = state => state.getIn(['snapScroll', 'disable', 'prev']);

export default {
  frame,
  disableNext,
  disablePrev,
  count,
};
