import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/index';
import thunk from '../../node_modules/redux-thunk';

export const store = createStore(rootReducer, applyMiddleware(thunk));
