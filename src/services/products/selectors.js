import { createSelector } from 'reselect';
import Routes from '/src/routes';
import logoFrame from './logo_frame.svg';
import logoViola from './logo_viola.svg';

const list = () => [{
  category: 'Cardiac',
  name: 'Viola',
}, {
  category: 'Cardiac',
  name: 'Vest',
}, {
  category: 'Vascular',
  name: 'Frame',
}, {
  category: 'Vascular',
  name: 'Frame FR',
}];

const categories = createSelector(list, products => {
  return products.reduce((categories, product) => {
    return categories.includes(product.category)
      ? categories
      : categories.concat([product.category]);
  }, []);
});

const name = createSelector(Routes.selectors.pathname, pathname => {
  switch (pathname.split('/').pop()) {
    case 'frame':
      return 'FRAME';
    case 'viola':
      return 'VIOLA';
    default:
      return null;
  }
});

const logo = createSelector(Routes.selectors.pathname, pathname => {
  switch (pathname.split('/').pop()) {
    case 'frame':
      return logoFrame;
    case 'viola':
      return logoViola;
    default:
      return undefined;
  }
});

export default {
  list,
  categories,
  name,
  logo,
};
