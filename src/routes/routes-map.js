import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Main from '/src/main/main';
import { Home } from '/src/pages';

export default (
  <Route path="/" component={Main} >
    <IndexRedirect to="home" />
    <Route path="home" component={Home} />
    <Redirect from="*" to="home" />
  </Route >
);
