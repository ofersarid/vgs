import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Main from '/src/main/main';
import { Product } from '/src/pages';

export default (
  <Route path="/" component={Main} >
    <IndexRedirect to="product" />
    <Route path="product" component={Product} />
    <Redirect from="*" to="product" />
  </Route >
);
