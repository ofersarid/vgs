import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Main from '/src/main/main';
import { Product } from '/src/pages';

export default (
  <Route path="/" component={Main} >
    <IndexRedirect to="home" />
    <Route path="home" component={Product} />
    <Redirect from="*" to="home" />
  </Route >
);
