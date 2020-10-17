import { ADD_CATEGORY, GET_CATEGORIES, DELETE_CATEGORY, MODIFY_CATEGORY, ERROR_MESSAGE, ADD_PRODUCT, DELETE_PRODUCTS, ADD_CATEGORY_PRODUCT, REMOVE_CATEGORY_PRODUC, GET_PRODUCTS, GET_PRODUCTS_BY_CATEGORY } from '../constants/constans';

const inicialState = {
	categories: [],
	products: [],
};

const ReducerProduct = (state = inicialState, action) => {
	// console.log(action)
	switch (action.type) {
		/****************************** PRODUCTS *********************************** */
		case GET_PRODUCTS:
			return { ...state, products: action.products };
		case ADD_PRODUCT:
		//return {...state, products: state.products.concat(action.products)}

		default:
			return inicialState;
			break;
	}
};

export default ReducerProduct;
