import { combineReducers } from 'redux';
import ReducerCategory from './reducerCategorys'
import ReducerProduct from './reducerProducts'


const inialState= {}

const rootReducer = combineReducers({
    reducerCategory: ReducerCategory,
    reducerProduct: ReducerProduct
})


export default rootReducer
