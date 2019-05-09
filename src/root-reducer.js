import { combineReducers } from 'redux-immutable';
import device from '/src/device/reducer';
import snapScroll from '/src/elements/snap-scroll/reducer';
import { firestoreReducer as fireStore } from 'redux-firestore';
import { firebaseReducer as fireBase } from 'react-redux-firebase';
import routs from '/src/routes/reducer';

const rootReducer = combineReducers({
  router: routs,
  device,
  fireStore,
  fireBase,
  snapScroll,
});

export default rootReducer;
