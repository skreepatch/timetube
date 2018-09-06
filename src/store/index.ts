import { applyMiddleware, createStore, Store } from 'redux';
import thunk from '../../node_modules/redux-thunk';
import { rootReducer } from './rootReducer';

export const store: Store = createStore(rootReducer, applyMiddleware(thunk));
