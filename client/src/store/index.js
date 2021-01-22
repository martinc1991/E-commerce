import store from 'redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducer from './reducer/reducer';
import thunk from 'redux-thunk';

export const st = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));

// console.log(st.getState());
