import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Main from '/src/containers/main/main';
import Pages from '/src/containers';

export default (
  <Route path="/" component={Main} >
    <IndexRedirect to="home" />
    <Route path="home" component={Pages.Home} />
    <Route path="our-products" component={Pages.OurProducts} />
    <Route path="frame" component={Pages.Product} />
    <Route path="viola" component={Pages.Product} />
    <Route path="frameFr" component={Pages.Product} />
    <Route path="vest" component={Pages.Product} />
    <Route path="about" component={Pages.About} />
    <Redirect from="*" to="home" />
  </Route >
);
