import React from 'react';
import ReactDOM from 'react-dom';
import services from '/src/services';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, hashHistory } from 'react-router';
import rootReducer from './root-reducer';
import routesMap from '/src/routes/routes-map/';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import './fonts/fonts.scss';
import styles from './styles.scss';

services.reactor.initialize('JRe2F6XCHTaBTIFAy0uL7EpkuzG2');

const $root = document.getElementById('root');

$root.className = styles.root;

// export const history = createBrowserHistory();

export const store = createStore(
  rootReducer, /* preloadedState, */
  services.reactor.middleware,
);

ReactDOM.render(
  <Provider store={store} >
    <Router history={hashHistory} routes={routesMap} />
  </Provider >,
  $root
);
