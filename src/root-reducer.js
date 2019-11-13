import { combineReducers } from 'redux-immutable';
import snapScroll from '/src/shared/snap-scroll/reducer';
import services from '/src/services';
import routs from '/src/routes/reducer';

const rootReducer = combineReducers({
  router: routs,
  device: services.device.reducer,
  reactor: services.reactor.reducer,
  vgs: services.vgs.reducer,
  reader: services.reader.reducer,
  snapScroll,
});

export default rootReducer;
