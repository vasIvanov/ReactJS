import {createStore, applyMiddleware,  compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { postsReducer } from './reducers/postReducers';
import { userReducer } from './reducers/userReducers';

const initialState = {};
const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose 
const store = createStore(
  combineReducers({
    posts: postsReducer,
    user: userReducer
  }),
  initialState,
  composeEnchancer(applyMiddleware(thunk))
);

export default store;