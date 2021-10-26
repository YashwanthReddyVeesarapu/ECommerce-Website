import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddle from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const PRODUCTION = window.location.hostname === 'localhost';

const sagaMiddleware = createSagaMiddle();

var middlewares = [thunk, sagaMiddleware];
if (PRODUCTION)
  middlewares = [thunk, sagaMiddleware, logger];

export var middlewares;

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);


export const persistor = persistStore(store);

export default {
  store,
  persistor
};