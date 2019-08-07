import { ACTIONS } from './constants';

const storeOrientation = (orientation) => ({
  type: ACTIONS.STORE_ORIENTATION,
  orientation,
});

export default {
  storeOrientation,
};
