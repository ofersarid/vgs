import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Main from '/src/main/main';
import Pages from '/src/pages';

export default (
  <Route path="/" component={Main} >
    <IndexRedirect to="home" />
    <Route path="home" component={Pages.Home} />
    <Route path="frame" component={Pages.Product} />
    <Route path="viola" component={Pages.Product} />
    <Redirect from="*" to="home" />
  </Route >
);
