import C from './consts';

const updateFrameIndex = index => ({
  type: C.ACTIONS.UPDATE_FRAME_INDEX,
  index,
});

const firstLook = isFirstLook => ({
  type: C.ACTIONS.FIRST_LOOK,
  isFirstLook,
});

export default {
  updateFrameIndex,
  firstLook
};
