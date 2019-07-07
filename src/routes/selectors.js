// import { createSelector } from 'reselect';

const pathname = state => state.getIn(['router', 'pathname']);

// const isCMS = createSelector(pathname, _pathName => {
//   const isIt = Boolean(_pathName.match(/cms/));
//   return isIt;
// });

// const isAdd = createSelector(pathname, _pathName => Boolean(_pathName.match(/\/add$/)));

// const collectionId = state => state.getIn(['router', 'params', 'collectionId']);

// const entityId = state => state.getIn(['router', 'params', 'entityId']);

export default {
  pathname,
};
