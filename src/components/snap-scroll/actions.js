import C from './consts';

const updateFrameIndex = index => ({
  type: C.ACTIONS.UPDATE_FRAME_INDEX,
  index,
});

const disable = (disableNext, disablePrev) => ({
  type: C.ACTIONS.DISABLE,
  disable: {
    next: disableNext,
    prev: disablePrev,
  },
});

const count = count => ({
  type: C.ACTIONS.COUNT,
  count,
});

const reset = count => ({
  type: C.ACTIONS.RESET,
  count,
});

export default {
  updateFrameIndex,
  disable,
  count,
  reset,
};
