import { combineReducers } from 'redux-immutable';
import device from '/src/components/device/reducer';
import snapScroll from '/src/components/snap-scroll/reducer';
import services from '/src/services';
// import { firebaseReducer as fireBase } from 'react-redux-firebase';
import routs from '/src/routes/reducer';

const rootReducer = combineReducers({
  router: routs,
  device,
  reactor: services.reactor.reducer,
  // fireBase,
  snapScroll,
});

export default rootReducer;
