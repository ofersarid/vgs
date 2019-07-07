import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Main from '/src/main/main';
import { Product } from '/src/pages';

export default (
  <Route path="/" component={Main} >
    <IndexRedirect to="frame" />
    <Route path="frame" component={Product} />
    <Route path="viola" component={Product} />
    <Redirect from="*" to="frame" />
  </Route >
);
