import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Main from '/src/containers/main/main';
import Pages from '/src/containers';

export default (
  <Route path="/" component={Main} >
    <IndexRedirect to="home/0" />
    <Route path="home/:frame" component={Pages.Home} />
    <Route path="frame/:frame" component={Pages.Product} />
    <Route path="viola/:frame" component={Pages.Product} />
    <Route path="frameFr/:frame" component={Pages.Product} />
    <Route path="vest/:frame" component={Pages.Product} />
    <Route path="about/:frame" component={Pages.About} />
    <Route path="contact/:frame" component={Pages.Contact} />
    <Redirect from="*" to="home/0" />
  </Route >
);
