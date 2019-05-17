import C from './consts';

const updateFrameIndex = index => ({
  type: C.ACTIONS.UPDATE_FRAME_INDEX,
  index,
});

const firstLook = isFirstLook => ({
  type: C.ACTIONS.FIRST_LOOK,
  isFirstLook,
});

const disable = (disableNext, disablePrev) => ({
  type: C.ACTIONS.DISABLE,
  disable: {
    next: disableNext,
    prev: disablePrev,
  },
});

export default {
  updateFrameIndex,
  firstLook,
  disable,
};
