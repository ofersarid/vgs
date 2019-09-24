import C from './consts';

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

const setIsLastFrame = bool => ({
  type: C.ACTIONS.IS_LAST_FRAME,
  bool,
});

export default {
  disable,
  count,
  reset,
  setIsLastFrame,
};
