import { createSelector } from 'reselect';

export const list = () => [{
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

export const categories = createSelector(list, products => {
  return products.reduce((categories, product) => {
    return categories.includes(product.category)
      ? categories
      : categories.concat([product.category]);
  }, []);
});

export default {
  list,
  categories,
};
