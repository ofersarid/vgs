import firebase from 'firebase/app';
import { compose } from 'redux';
import { reduxFirestore, firestoreReducer as reducer } from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let _userId;

const initialize = (userId) => {
  firebase.initializeApp({
    apiKey: 'AIzaSyCVoJ1fNik-brXSirPwXfzEzpK4HDJyIdE',
    authDomain: 'reactor-dam.firebaseapp.com',
    databaseURL: 'https://reactor-dam.firebaseio.com',
    projectId: 'reactor-dam',
    storageBucket: 'reactor-dam.appspot.com',
    messagingSenderId: '198256799515',
  });
  firebase.firestore();
  _userId = userId;
};

const middleware = composeEnhancers(reduxFirestore(firebase));

const connect = firestoreConnect(props => {
  let aggregated = [{
    collection: 'users',
    doc: _userId,
  }];
  if (props.resourceList) {
    aggregated = aggregated.concat(props.resourceList.collections.reduce((list, id) => {
      list.push({
        collection: 'collections',
        doc: id,
      });
      list.push({
        collection: 'collections',
        doc: id,
        subcollections: [{
          collection: 'data',
          // where: [['active', '==', true]],
          // orderBy: ['displayOrder', 'desc'],
        }],
      });
      return list;
    }, []));

    aggregated = aggregated.concat(props.resourceList.pages.reduce((accumulator, id) => {
      accumulator.push({
        collection: 'pages',
        doc: id,
      });
      return accumulator;
    }, []));
  }
  return aggregated;
});

const preLoaded = [];

const preloadImages = data => {
  Object.keys(data).forEach(key => {
    if (!preLoaded.includes(data[key]) && data[key].match && data[key].match(/^https?:\/\//)) {
      const img = new Image();
      img.src = data[key];
      preLoaded.push(data[key]);
    }
  });
};

const selectors = {
  resourceList: state => {
    const isLoaded = state.get('reactor').data.users;
    return isLoaded && isLoaded[_userId] ? ({
      collections: isLoaded[_userId].collections || [],
      pages: isLoaded[_userId].pages || [],
    }) : null;
  },
  collections: state => state.get('reactor').data.collections,
  pages: state => state.get('reactor').data.pages,
  collectionData: (state, name) => {
    const collections = state.get('reactor').data.collections;
    if (collections) {
      const collectionId = Object.keys(collections).find(id => collections[id].name.toLowerCase() === name.toLowerCase());
      if (collectionId) {
        const order = collections[collectionId].order.split(' | ');
        const data = collections[collectionId].data;
        if (!data) return [];
        return order.reduce((dataArray, key) => {
          if (data[key] && !data[key].published) return dataArray;
          dataArray.push(Object.assign({}, data[key], { id: key }));
          return dataArray;
        }, []);
      }
      console.warn(`collection ${name} not found`);
    }
  },
  pageData: (state, name) => {
    const pages = state.get('reactor').data.pages;
    if (pages) {
      const pageId = Object.keys(pages).find(id => pages[id].name.toLowerCase() === name.toLowerCase());
      if (pageId) {
        const data = pages[pageId].data;
        preloadImages(data);
        return data;
      }
      console.warn(`page ${name} is loading or not found`);
    }
  },
};

export default {
  initialize,
  middleware,
  reducer,
  selectors,
  connect,
};
