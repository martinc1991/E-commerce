import store from 'redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducer from './reducer/reducerCategorys';
import thunk from 'redux-thunk';
import rootReducer from './reducer/index';



export const st = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));

console.log(st.getState())



