const services = {
  products: require('./products').default,
  reactor: require('./reactor').default,
  vgs: require('./vgs').default,
  reader: require('./reader').default,
};

export default services;

window.services = services;
