import { combineReducers } from 'redux-immutable';
import device from '/src/device/reducers';
import { firestoreReducer as fireStore } from 'redux-firestore';
import { firebaseReducer as fireBase } from 'react-redux-firebase';
import routs from '/src/routes/reducers';

const rootReducer = combineReducers({
  router: routs,
  device,
  fireStore,
  fireBase,
});

export default rootReducer;
