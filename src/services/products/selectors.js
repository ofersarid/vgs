import { createSelector } from 'reselect';
import Routes from '/src/routes';
import donut from './donut.png';
import violaCoverPic from './viola_cover.png';
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

const art = createSelector(Routes.selectors.pathname, pathname => {
  switch (pathname.split('/').pop()) {
    case 'frame':
      return donut;
    case 'viola':
      return violaCoverPic;
    default:
      return null;
  }
});

const color = createSelector(Routes.selectors.pathname, pathname => {
  switch (pathname.split('/').pop()) {
    case 'frame':
      return '#0272BA';
    case 'viola':
      return '#662D91';
    default:
      return undefined;
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
  art,
  color,
  logo,
};
