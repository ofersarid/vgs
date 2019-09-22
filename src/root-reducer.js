import { combineReducers } from 'redux-immutable';
import device from '/src/shared/device/reducer';
import snapScroll from '/src/shared/snap-scroll/reducer';
import services from '/src/services';
import routs from '/src/routes/reducer';

const rootReducer = combineReducers({
  router: routs,
  device,
  reactor: services.reactor.reducer,
  vgs: services.vgs.reducer,
  reader: services.reader.reducer,
  snapScroll,
});

export default rootReducer;
