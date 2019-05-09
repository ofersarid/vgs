import C from './consts';

const updateFrameIndex = index => ({
  type: C.ACTIONS.UPDATE_FRAME_INDEX,
  index,
});

export default {
  updateFrameIndex,
};
