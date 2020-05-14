import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
////ENABLE REDUX DEVTOOLS
/*         */declare global {
/*         */    interface Window {
/*         */      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
/*         */    }
/*         */};
/*         */const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/////////////////////////

const rootReducer:any = combineReducers ({
    currentUser : userReducer
});

export const Store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);