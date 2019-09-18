import { createSelector } from 'reselect';
import Routes from '/src/routes';
import logoFrame from './logo_frame.svg';
import logoViola from './logo_viola.svg';
import logoVest from './logo_vest.svg';
import logoFrameFr from './logo_frame_fr.svg';

const list = () => [{
  category: 'Cardiac',
  name: 'Viola',
  color: '#0272BA',
}, {
  category: 'Cardiac',
  name: 'Vest',
  color: '#662D91',
}, {
  category: 'Vascular',
  name: 'Frame',
  color: '#ED1C24',
}, {
  category: 'Vascular',
  name: 'Frame FR',
  color: '#22B0AF',
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
    case 'vest':
      return 'VEST';
    case 'frameFr':
      return 'FRAME FR';
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
    case 'vest':
      return logoVest;
    case 'frameFr':
      return logoFrameFr;
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
