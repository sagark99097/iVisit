import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootSaga from '../sagas';
import rootReducer from '../ducks';

let sagaMiddleware;
const middlewares: any[] = [];

sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);
middlewares.push(logger);
const store: any = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;
