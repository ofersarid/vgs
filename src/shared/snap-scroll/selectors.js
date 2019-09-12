const frame = state => state.getIn(['snapScroll', 'frame']);
const count = state => state.getIn(['snapScroll', 'count']);
const disableNext = state => state.getIn(['snapScroll', 'disable', 'next']);
const disablePrev = state => state.getIn(['snapScroll', 'disable', 'prev']);
const isLastFrame = state => state.getIn(['snapScroll', 'isLastFrame']);

export default {
  frame,
  disableNext,
  disablePrev,
  count,
  isLastFrame,
};
