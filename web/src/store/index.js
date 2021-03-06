import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './../reducer/index';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunk];
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware),
  );

const store = createStore(
    reducer,
    enhancer
);

sagaMiddleware.run(sagas);

export default store;
